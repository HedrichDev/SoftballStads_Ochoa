import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, User, Camera } from 'lucide-react';
import { useData } from '../context/DataContext';
import PlayerForm from './PlayerForm';

const PlayersManager = () => {
  const { players, teams, deletePlayer } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.number.toString().includes(searchTerm);
    const matchesTeam = selectedTeam === '' || player.team === selectedTeam;
    return matchesSearch && matchesTeam;
  });

  const handleEdit = (player) => {
    setEditingPlayer(player);
    setShowForm(true);
  };

  const handleDelete = (playerId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este jugador?')) {
      deletePlayer(playerId);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPlayer(null);
  };

  const getPlayerAverage = (player) => {
    if (!player.stats || player.stats.atBats === 0) return '0.000';
    return (player.stats.hits / player.stats.atBats).toFixed(3);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Jugadores</h1>
          <p className="mt-2 text-sm text-gray-600">
            Administra los peloteros de la Liga Risaraldense
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0 btn-primary flex items-center gap-x-2"
        >
          <Plus className="h-4 w-4" />
          Agregar Jugador
        </button>
      </div>

      {/* Filters */}
      <div className="card-compact">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="form-label">
              Buscar jugador
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="search"
                placeholder="Nombre o número..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-12"
              />
            </div>
          </div>
          <div>
            <label htmlFor="team-filter" className="form-label">
              Filtrar por equipo
            </label>
            <select
              id="team-filter"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="form-select"
            >
              <option value="">Todos los equipos</option>
              {teams.map(team => (
                <option key={team.id} value={team.name}>{team.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredPlayers.map(player => (
          <div key={player.id} className="card-compact hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 scale-in">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {player.photo ? (
                    <img
                      src={player.photo}
                      alt={player.name}
                      className="h-16 w-16 rounded-2xl object-cover shadow-lg"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
                      <User className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg">
                    <span className="text-xs font-bold text-white">#{player.number}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{player.name}</h3>
                  <p className="text-sm font-semibold text-gray-500">{player.team}</p>
                  <p className="text-xs text-gray-400">{player.position}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(player)}
                  className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(player.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Stats Preview */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                    {getPlayerAverage(player)}
                  </p>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">AVG</p>
                </div>
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                    {player.stats?.hits || 0}
                  </p>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">HITS</p>
                </div>
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                    {player.stats?.homeRuns || 0}
                  </p>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">HR</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <div className="text-center py-16">
          <User className="mx-auto h-20 w-20 text-gray-300" />
          <h3 className="mt-6 text-lg font-semibold text-gray-900">No hay jugadores</h3>
          <p className="mt-2 text-gray-500 font-medium">
            {searchTerm || selectedTeam 
              ? 'No se encontraron jugadores con los filtros aplicados'
              : 'Comienza agregando tu primer jugador'
            }
          </p>
        </div>
      )}

      {/* Player Form Modal */}
      {showForm && (
        <PlayerForm
          player={editingPlayer}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default PlayersManager;