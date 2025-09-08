import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, dbHelpers } from '../lib/supabase';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from Supabase on mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [playersData, teamsData] = await Promise.all([
        dbHelpers.getPlayers(),
        dbHelpers.getTeams()
      ]);
      
      setPlayers(playersData);
      setTeams(teamsData);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Error al cargar los datos. Verifica tu conexión a Supabase.');
      
      // Fallback to localStorage if Supabase fails
      const savedPlayers = localStorage.getItem('softball-players');
      const savedTeams = localStorage.getItem('softball-teams');
      
      if (savedPlayers) setPlayers(JSON.parse(savedPlayers));
      if (savedTeams) setTeams(JSON.parse(savedTeams));
    } finally {
      setLoading(false);
    }
  };

  // Player management functions
  const addPlayer = async (playerData) => {
    try {
      const newPlayer = await dbHelpers.addPlayer(playerData);
      setPlayers(prev => [...prev, newPlayer]);
      
      // Backup to localStorage
      localStorage.setItem('softball-players', JSON.stringify([...players, newPlayer]));
    } catch (err) {
      console.error('Error adding player:', err);
      setError('Error al agregar jugador');
      throw err;
    }
  };

  const updatePlayer = async (playerId, playerData) => {
    try {
      const updatedPlayer = await dbHelpers.updatePlayer(playerId, playerData);
      setPlayers(prev => prev.map(player => 
        player.id === playerId ? updatedPlayer : player
      ));
      
      // Backup to localStorage
      const updatedPlayers = players.map(player => 
        player.id === playerId ? updatedPlayer : player
      );
      localStorage.setItem('softball-players', JSON.stringify(updatedPlayers));
    } catch (err) {
      console.error('Error updating player:', err);
      setError('Error al actualizar jugador');
      throw err;
    }
  };

  const deletePlayer = async (playerId) => {
    try {
      await dbHelpers.deletePlayer(playerId);
      setPlayers(prev => prev.filter(player => player.id !== playerId));
      
      // Backup to localStorage
      const filteredPlayers = players.filter(player => player.id !== playerId);
      localStorage.setItem('softball-players', JSON.stringify(filteredPlayers));
    } catch (err) {
      console.error('Error deleting player:', err);
      setError('Error al eliminar jugador');
      throw err;
    }
  };

  // Team management functions
  const addTeam = async (teamData) => {
    try {
      const newTeam = await dbHelpers.addTeam(teamData);
      setTeams(prev => [...prev, newTeam]);
      
      // Backup to localStorage
      localStorage.setItem('softball-teams', JSON.stringify([...teams, newTeam]));
    } catch (err) {
      console.error('Error adding team:', err);
      setError('Error al agregar equipo');
      throw err;
    }
  };

  const updateTeam = async (teamId, teamData) => {
    try {
      const updatedTeam = await dbHelpers.updateTeam(teamId, teamData);
      setTeams(prev => prev.map(team => 
        team.id === teamId ? updatedTeam : team
      ));
      
      // Backup to localStorage
      const updatedTeams = teams.map(team => 
        team.id === teamId ? updatedTeam : team
      );
      localStorage.setItem('softball-teams', JSON.stringify(updatedTeams));
    } catch (err) {
      console.error('Error updating team:', err);
      setError('Error al actualizar equipo');
      throw err;
    }
  };

  const deleteTeam = async (teamId) => {
    try {
      await dbHelpers.deleteTeam(teamId);
      setTeams(prev => prev.filter(team => team.id !== teamId));
      
      // Backup to localStorage
      const filteredTeams = teams.filter(team => team.id !== teamId);
      localStorage.setItem('softball-teams', JSON.stringify(filteredTeams));
    } catch (err) {
      console.error('Error deleting team:', err);
      setError('Error al eliminar equipo');
      throw err;
    }
  };

  // Statistics and rankings functions
  const getTopPlayers = (category, limit = 10) => {
    let filteredPlayers = [...players];

    switch (category) {
      case 'batting':
        // Minimum 12 at-bats for batting average
        filteredPlayers = players.filter(player => 
          player.stats && player.stats.atBats >= 12
        ).sort((a, b) => {
          const avgA = a.stats.hits / a.stats.atBats;
          const avgB = b.stats.hits / b.stats.atBats;
          return avgB - avgA;
        });
        break;
      
      case 'pitching':
        filteredPlayers = players.filter(player => 
          player.stats && (player.stats.wins > 0 || player.stats.losses > 0)
        ).sort((a, b) => {
          // Sort by wins first, then by losses (fewer is better)
          if (b.stats.wins !== a.stats.wins) {
            return b.stats.wins - a.stats.wins;
          }
          return a.stats.losses - b.stats.losses;
        });
        break;
      
      case 'rbi':
        filteredPlayers = players.filter(player => 
          player.stats && player.stats.rbi > 0
        ).sort((a, b) => b.stats.rbi - a.stats.rbi);
        break;
      
      case 'doubles':
        filteredPlayers = players.filter(player => 
          player.stats && player.stats.doubles > 0
        ).sort((a, b) => b.stats.doubles - a.stats.doubles);
        break;
      
      case 'homeRuns':
        filteredPlayers = players.filter(player => 
          player.stats && player.stats.homeRuns > 0
        ).sort((a, b) => b.stats.homeRuns - a.stats.homeRuns);
        break;
      
      case 'strikeouts':
        filteredPlayers = players.filter(player => 
          player.stats && player.stats.strikeoutsPitching > 0
        ).sort((a, b) => b.stats.strikeoutsPitching - a.stats.strikeoutsPitching);
        break;
      
      default:
        return [];
    }

    return filteredPlayers.slice(0, limit);
  };

  const getTeamStats = () => {
    return teams.map(team => {
      const teamPlayers = players.filter(player => player.team === team.name);
      
      // Calculate team statistics
      const gamesPlayed = 10; // This would come from actual game data
      const wins = Math.floor(Math.random() * 8) + 2; // Sample data
      const losses = gamesPlayed - wins;
      const winPercentage = wins / gamesPlayed;
      const runsScored = teamPlayers.reduce((sum, player) => sum + (player.stats?.runsScored || 0), 0);
      const runsAllowed = Math.floor(Math.random() * 50) + 20; // Sample data

      return {
        id: team.id,
        name: team.name,
        gamesPlayed,
        wins,
        losses,
        winPercentage,
        runsScored,
        runsAllowed
      };
    }).sort((a, b) => b.winPercentage - a.winPercentage);
  };

  // Backup and restore functions
  const exportData = () => {
    const data = {
      players,
      teams,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    return JSON.stringify(data, null, 2);
  };

  const importData = (jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      if (data.players && data.teams) {
        setPlayers(data.players);
        setTeams(data.teams);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  };

  const value = {
    // Data
    players,
    teams,
    loading,
    error,
    
    // Player functions
    addPlayer,
    updatePlayer,
    deletePlayer,
    
    // Team functions
    addTeam,
    updateTeam,
    deleteTeam,
    
    // Statistics functions
    getTopPlayers,
    getTeamStats,
    
    // Backup functions
    exportData,
    importData,
    
    // Utility functions
    refreshData: loadInitialData,
    clearError: () => setError(null)
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};