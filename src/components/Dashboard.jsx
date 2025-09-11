import React from 'react';
import { Trophy, Users, Calendar, TrendingUp, Award, Target, Download, BarChart3, Zap, Home as HomeIcon } from 'lucide-react';
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
      gradient: 'from-blue-500 to-blue-600',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      change: '+12%',
      changeType: 'positive',
      description: 'Jugadores activos'
    },
    {
      name: 'Equipos Activos',
      value: teams.length,
      icon: Trophy,
      gradient: 'from-green-500 to-green-600',
      iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
      change: '+2',
      changeType: 'positive',
      description: 'Equipos registrados'
    },
    {
      name: 'Partidos Jugados',
      value: '24',
      icon: Calendar,
      gradient: 'from-purple-500 to-purple-600',
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      change: '+8',
      changeType: 'positive',
      description: 'Esta temporada'
    },
    {
      name: 'Promedio Liga',
      value: '0.285',
      icon: Target,
      gradient: 'from-orange-500 to-orange-600',
      iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600',
      change: '+0.015',
      changeType: 'positive',
      description: 'Promedio general'
    }
  ];

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="slide-in-left">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
            Dashboard - Liga Risaraldense
          </h1>
          <p className="mt-3 text-lg text-gray-600 font-medium">
            Resumen general de estadísticas y rendimiento de la temporada actual
          </p>
        </div>
        <div className="mt-6 lg:mt-0 slide-in-right">
          <button className="btn-primary flex items-center gap-x-3 text-lg">
            <Download className="h-5 w-5" />
            Importar Excel
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.name} 
              className="stat-card bounce-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      {stat.name}
                    </p>
                    <p className="text-4xl font-bold text-gray-900 mb-3">
                      {stat.value}
                    </p>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-green-600 font-semibold">{stat.change}</span>
                      <span className="text-gray-500 ml-2">{stat.description}</span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-2xl ${stat.iconBg} shadow-xl shadow-blue-500/25`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Top Bateadores */}
        <div className="card slide-in-left">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-x-4">
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl shadow-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Top 5 Bateadores</h3>
                <p className="text-gray-500 font-medium">Mejores promedios de bateo</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {topBatters.length > 0 ? (
              topBatters.map((player, index) => (
                <div key={player.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-6">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-lg ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 
                      index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' : 
                      index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{player.name}</p>
                      <p className="text-sm text-gray-500 font-medium">{player.team}</p>
                      <p className="text-xs text-gray-400">{player.position}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {(player.stats?.atBats > 0 ? player.stats.hits / player.stats.atBats : 0).toFixed(3)}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                      {player.stats?.hits || 0}/{player.stats?.atBats || 0} AB
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <BarChart3 className="mx-auto h-16 w-16 text-gray-300" />
                <p className="mt-4 text-gray-500 font-medium">No hay datos de bateadores disponibles</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Pitchers */}
        <div className="card slide-in-right">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Top 3 Pitchers</h3>
                <p className="text-gray-500 font-medium">Mejores lanzadores</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {topPitchers.length > 0 ? (
              topPitchers.map((player, index) => (
                <div key={player.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-6">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-lg ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 
                      index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' : 'bg-gradient-to-br from-orange-400 to-orange-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{player.name}</p>
                      <p className="text-sm text-gray-500 font-medium">{player.team}</p>
                      <p className="text-xs text-gray-400">{player.position}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {player.stats?.wins || 0}-{player.stats?.losses || 0}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                      {player.stats?.strikeoutsPitching || 0} K
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Zap className="mx-auto h-16 w-16 text-gray-300" />
                <p className="mt-4 text-gray-500 font-medium">No hay datos de pitchers disponibles</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clasificación de Equipos */}
      <div className="card slide-in-up">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-x-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Clasificación de Equipos</h3>
              <p className="text-gray-500 font-medium">Tabla de posiciones actual</p>
            </div>
          </div>
        </div>
        <div className="table-modern">
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
                    <td className="table-cell">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-xl text-sm font-bold text-white ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                        index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                        index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                        'bg-gradient-to-br from-blue-500 to-blue-600'
                      }`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-md">
                          <span className="text-sm font-bold text-blue-700">
                            {team.name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-semibold text-gray-900">{team.name}</span>
                      </div>
                    </td>
                    <td className="table-cell font-semibold">{team.gamesPlayed}</td>
                    <td className="table-cell">
                      <span className="badge badge-success">{team.wins}</span>
                    </td>
                    <td className="table-cell">
                      <span className="badge badge-danger">{team.losses}</span>
                    </td>
                    <td className="table-cell">
                      <span className="text-lg font-bold text-gray-900">{team.winPercentage.toFixed(3)}</span>
                    </td>
                    <td className="table-cell font-semibold text-green-600">{team.runsScored}</td>
                    <td className="table-cell font-semibold text-red-600">{team.runsAllowed}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="table-cell text-center py-12">
                    <Trophy className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium">No hay datos de equipos disponibles</p>
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