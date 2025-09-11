import React from 'react';
import { X, Home, Users, Trophy, BarChart3, Calendar, Settings, UserPlus, Target } from 'lucide-react';

const Sidebar = ({ navigation, activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const navigationItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, color: 'text-blue-600' },
    { id: 'players', name: 'Jugadores', icon: Users, color: 'text-green-600' },
    { id: 'teams', name: 'Equipos', icon: UserPlus, color: 'text-purple-600' },
    { id: 'stats', name: 'Estadísticas', icon: BarChart3, color: 'text-orange-600' },
    { id: 'rankings', name: 'Rankings', icon: Trophy, color: 'text-yellow-600' },
    { id: 'calendar', name: 'Calendario', icon: Calendar, color: 'text-indigo-600' },
    { id: 'settings', name: 'Configuración', icon: Settings, color: 'text-gray-600' },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-xl">
      {/* Logo */}
      <div className="flex h-20 items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary shadow-lg shadow-blue-500/25">
            <span className="text-xl font-bold text-white">⚾</span>
          </div>
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Softbol Stats
            </span>
            <p className="text-xs text-gray-500 font-medium">Pro Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-8 space-y-3">
        <div className="mb-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
            Menú Principal
          </h3>
        </div>
        
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`nav-item w-full group ${isActive ? 'active' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-blue-100'} transition-all duration-300`}>
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : item.color + ' group-hover:text-blue-600'} transition-colors duration-300`} />
              </div>
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full shadow-lg"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-6 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center gap-x-3">
            <div className="h-10 w-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Liga 2024</p>
              <p className="text-xs text-gray-500">Temporada Activa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="fixed inset-y-0 left-0 flex w-80 flex-col slide-in-left">
            <div className="absolute right-6 top-6 z-10">
              <button
                onClick={() => setSidebarOpen(false)}
                className="btn-icon text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-80 lg:flex-col">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;