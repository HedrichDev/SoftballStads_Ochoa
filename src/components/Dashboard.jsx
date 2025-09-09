import React from 'react';
import { Trophy, Users, Calendar, TrendingUp, Award, Target, Download } from 'lucide-react';
import { useData } from '../context/DataContext';

const Dashboard = () => {
  const { players, teams, getTopPlayers, getTeamStats } = useData();

  const topBatters = getTopPlayers('batting', 5);
  const topPitchers = getTopPlayers('pitching', 3);
  const teamStats = getTeamStats();

  const stats = [
    {
      name: 'Total Jugadores',
      value: players.length,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'Equipos Activos',
      value: teams.length,
      icon: Trophy,
      color: 'from-green-500 to-green-600',
      iconBg: 'bg-green-500',
      change: '+2',
      changeType: 'positive'
    },
    {
      name: 'Partidos Jugados',
      value: '24',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-500',
      change: '+8',
      changeType: 'positive'
    },
    {
      name: 'Promedio Liga',
      value: '0.285',
      icon: Target,
      color: 'from-orange-500 to-orange-600',
      iconBg: 'bg-orange-500',
      change: '+0.015',
      changeType: 'positive'
    }
  ];

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard - Liga Risaraldense
          </h1>
          <p className="mt-2 text-gray-600">
            Resumen general de estadísticas y rendimiento de la temporada actual
          </p>
        </div>
        <button className="mt-4 sm:mt-0 btn-primary flex items-center gap-x-2">
          <Download className="h-4 w-4" />
          Importar Excel
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.name} 
              className="stat-card bounce-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </p>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.iconBg} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Bateadores */}
        <div className="card slide-in-left">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Top 5 Bateadores</h3>
            <Award className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="space-y-4">
            {topBatters.length > 0 ? (
              topBatters.map((player, index) => (
                <div key={player.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{player.name}</p>
                      <p className="text-sm text-gray-500">{player.team}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {(player.stats?.atBats > 0 ? player.stats.hits / player.stats.atBats : 0).toFixed(3)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {player.stats?.hits || 0}/{player.stats?.atBats || 0} AB
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No hay datos de bateadores disponibles</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Pitchers */}
        <div className="card slide-in-right">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Top 3 Pitchers</h3>
            <Trophy className="h-6 w-6 text-blue-500" />
          </div>
          <div className="space-y-4">
            {topPitchers.length > 0 ? (
              topPitchers.map((player, index) => (
                <div key={player.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{player.name}</p>
                      <p className="text-sm text-gray-500">{player.team}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {player.stats?.wins || 0}-{player.stats?.losses || 0}
                    </p>
                    <p className="text-sm text-gray-500">
                      {player.stats?.strikeoutsPitching || 0} K
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No hay datos de pitchers disponibles</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clasificación de Equipos */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Clasificación de Equipos</h3>
          <Trophy className="h-6 w-6 text-green-500" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="table-header">POS</th>
                <th className="table-header">EQUIPO</th>
                <th className="table-header">JJ</th>
                <th className="table-header">JG</th>
                <th className="table-header">JP</th>
                <th className="table-header">AVG</th>
                <th className="table-header">CA</th>
                <th className="table-header">CC</th>
              </tr>
            </thead>
            <tbody>
              {teamStats.length > 0 ? (
                teamStats.map((team, index) => (
                  <tr key={team.id} className="table-row">
                    <td className="table-cell font-bold">{index + 1}</td>
                    <td className="table-cell">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-700">
                            {team.name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium">{team.name}</span>
                      </div>
                    </td>
                    <td className="table-cell">{team.gamesPlayed}</td>
                    <td className="table-cell">
                      <span className="font-semibold text-green-600">{team.wins}</span>
                    </td>
                    <td className="table-cell">
                      <span className="font-semibold text-red-600">{team.losses}</span>
                    </td>
                    <td className="table-cell">
                      <span className="font-bold">{team.winPercentage.toFixed(3)}</span>
                    </td>
                    <td className="table-cell">{team.runsScored}</td>
                    <td className="table-cell">{team.runsAllowed}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="table-cell text-center text-gray-500 py-8">
                    No hay datos de equipos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;