import React from 'react';
import { Database, Wifi, WifiOff, RefreshCw, AlertCircle, Settings, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const DatabaseStatus = ({ onShowSetup }) => {
  const { loading, error, refreshData, clearError } = useData();

  // Check if Supabase is configured
  const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL && 
                               import.meta.env.VITE_SUPABASE_ANON_KEY &&
                               import.meta.env.VITE_SUPABASE_URL !== 'your_supabase_project_url';

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="status-pending">
          <RefreshCw className="h-3 w-3 animate-spin mr-1" />
          <span>Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-2">
        <div className="status-offline">
          <WifiOff className="h-3 w-3 mr-1" />
          <span>{!isSupabaseConfigured ? 'No configurado' : 'Sin conexión'}</span>
        </div>
        {!isSupabaseConfigured && (
          <button
            onClick={onShowSetup}
            className="text-xs bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-colors duration-200"
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
      <div className="flex items-center space-x-2">
        <div className="status-pending">
          <AlertCircle className="h-3 w-3 mr-1" />
          <span>Configuración pendiente</span>
        </div>
        <button
          onClick={onShowSetup}
          className="text-xs bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Configurar Supabase
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="status-online">
        <CheckCircle className="h-3 w-3 mr-1" />
        <Database className="h-3 w-3 mr-1" />
        <span>Base de datos conectada</span>
      </div>
      <button
        onClick={onShowSetup}
        className="btn-icon p-1"
      >
        <Settings className="h-3 w-3 text-gray-400" />
      </button>
    </div>
  );
};

export default DatabaseStatus;