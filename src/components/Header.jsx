import React, { useState } from 'react';
import { Menu, Bell, Search, Download, Settings, User, ChevronDown } from 'lucide-react';
import DatabaseStatus from './DatabaseStatus';
import SetupGuide from './SetupGuide';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [showSetup, setShowSetup] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-40 glass border-b border-white/20 backdrop-blur-xl">
        <div className="flex h-20 items-center justify-between px-6 lg:px-8">
          {/* Left side */}
          <div className="flex items-center gap-x-6">
            <button
              type="button"
              className="btn-icon lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center gap-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary shadow-lg shadow-blue-500/25">
                <span className="text-2xl">⚾</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Liga Risaraldense de Softbol
                </h1>
                <p className="text-sm text-gray-500 font-medium">Sistema de Estadísticas Profesional</p>
              </div>
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar jugadores, equipos..."
                className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-x-4">
            <DatabaseStatus onShowSetup={() => setShowSetup(true)} />
            
            <button className="btn-primary flex items-center gap-x-2 scale-in">
              <Download className="h-5 w-5" />
              <span className="hidden sm:inline">Importar Excel</span>
            </button>
            
            <button className="btn-icon relative">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">3</span>
              </span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-x-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-white">AD</span>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-gray-900">Administrador</p>
                  <p className="text-xs text-gray-500">admin@softbol.com</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 scale-in">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Administrador</p>
                    <p className="text-xs text-gray-500">admin@softbol.com</p>
                  </div>
                  <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <User className="h-4 w-4 mr-3" />
                    Mi Perfil
                  </a>
                  <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Settings className="h-4 w-4 mr-3" />
                    Configuración
                  </a>
                  <hr className="my-2" />
                  <a href="#" className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    Cerrar Sesión
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Setup Guide Modal */}
      {showSetup && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" 
              onClick={() => setShowSetup(false)}
            ></div>
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scale-in">
              <div className="absolute top-6 right-6">
                <button
                  onClick={() => setShowSetup(false)}
                  className="btn-icon"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <SetupGuide />
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowUserMenu(false)}
        ></div>
      )}
    </>
  );
};

export default Header;