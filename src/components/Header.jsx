import React, { useState } from 'react';
import { Menu, Bell, Search, Download, Settings } from 'lucide-react';
import DatabaseStatus from './DatabaseStatus';
import SetupGuide from './SetupGuide';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [showSetup, setShowSetup] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left side */}
          <div className="flex items-center gap-x-4">
            <button
              type="button"
              className="btn-icon lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <span className="text-lg">⚾</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">
                  Liga Risaraldense de Softbol
                </h1>
                <p className="text-sm text-gray-500">Sistema de Estadísticas</p>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-x-4">
            <DatabaseStatus onShowSetup={() => setShowSetup(true)} />
            
            <button className="btn-primary flex items-center gap-x-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Importar Excel</span>
            </button>
            
            <button className="btn-icon">
              <Bell className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-700">AD</span>
              </div>
              <span className="hidden lg:block text-sm font-medium text-gray-700">
                Administrador
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Guide Modal */}
      {showSetup && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" 
              onClick={() => setShowSetup(false)}
            ></div>
            <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setShowSetup(false)}
                  className="btn-icon"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <SetupGuide />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;