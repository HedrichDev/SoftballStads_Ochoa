import React from 'react';
import { Database, Wifi, WifiOff, RefreshCw, AlertCircle, Settings } from 'lucide-react';
import { useData } from '../context/DataContext';

const DatabaseStatus = ({ onShowSetup }) => {
  const { loading, error, refreshData, clearError } = useData();

  // Check if Supabase is configured
  const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL && 
                               import.meta.env.VITE_SUPABASE_ANON_KEY &&
                               import.meta.env.VITE_SUPABASE_URL !== 'your_supabase_project_url';

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-blue-600">
        <RefreshCw className="h-4 w-4 animate-spin" />
        <span className="text-sm">Cargando datos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1 text-red-600">
          <WifiOff className="h-4 w-4" />
          <span className="text-sm">
            {!isSupabaseConfigured ? 'No configurado' : 'Sin conexión'}
          </span>
        </div>
        {!isSupabaseConfigured && (
          <button
            onClick={onShowSetup}
            className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
          >
            Configurar
          </button>
        )}
        <button
          onClick={() => {
            clearError();
            refreshData();
          }}
          className="text-xs text-blue-600 hover:text-blue-800 underline"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1 text-yellow-600">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">Configuración pendiente</span>
        </div>
        <button
          onClick={onShowSetup}
          className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
        >
          Configurar Supabase
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3 text-green-600">
      <Wifi className="h-4 w-4" />
      <Database className="h-4 w-4" />
      <span className="text-sm">Base de datos conectada</span>
      <button
        onClick={onShowSetup}
        className="text-xs text-gray-500 hover:text-gray-700"
      >
        <Settings className="h-3 w-3" />
      </button>
    </div>
  );
};

export default DatabaseStatus;