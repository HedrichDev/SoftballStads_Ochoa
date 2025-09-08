import React, { useState } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import DatabaseStatus from './DatabaseStatus';
import SetupGuide from './SetupGuide';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [showSetup, setShowSetup] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
      <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Abrir sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="relative flex flex-1 items-center">
            <div className="flex items-center gap-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                <span className="text-lg font-bold text-white">⚾</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Liga Risaraldense de Softbol
                </h1>
                <p className="text-sm text-gray-500">Sistema de Estadísticas</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <DatabaseStatus onShowSetup={() => setShowSetup(true)} />
            
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Ver notificaciones</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

            {/* Profile dropdown */}
            <div className="relative">
              <div className="flex items-center gap-x-2">
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-700">AD</span>
                </div>
                <span className="hidden lg:flex lg:items-center">
                  <span className="ml-2 text-sm font-semibold leading-6 text-gray-900">
                    Administrador
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Setup Guide Modal */}
      {showSetup && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowSetup(false)}></div>
            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setShowSetup(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Cerrar</span>
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
    </>
  );
};

export default Header;