import React, { useState } from 'react';
import { Database, CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

const SetupGuide = () => {
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [testResults, setTestResults] = useState({});

  const testConnection = async () => {
    setConnectionStatus('testing');
    const results = {};

    try {
      // Test 1: Basic connection
      const { data, error } = await supabase.from('teams').select('count');
      results.connection = !error;
      results.connectionError = error?.message;

      // Test 2: Read permissions
      try {
        const { data: teamsData } = await supabase.from('teams').select('*').limit(1);
        results.readPermission = true;
      } catch (err) {
        results.readPermission = false;
        results.readError = err.message;
      }

      // Test 3: Write permissions
      try {
        const testTeam = {
          name: `Test Team ${Date.now()}`,
          city: 'Test City'
        };
        const { data, error } = await supabase.from('teams').insert([testTeam]).select();
        if (!error && data) {
          results.writePermission = true;
          // Clean up test data
          await supabase.from('teams').delete().eq('id', data[0].id);
        } else {
          results.writePermission = false;
          results.writeError = error?.message;
        }
      } catch (err) {
        results.writePermission = false;
        results.writeError = err.message;
      }

      setTestResults(results);
      setConnectionStatus(results.connection && results.readPermission && results.writePermission ? 'success' : 'error');
    } catch (error) {
      setConnectionStatus('error');
      setTestResults({ connection: false, connectionError: error.message });
    }
  };

  const StatusIcon = ({ status }) => {
    switch (status) {
      case true:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case false:
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <Database className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Configuración de Base de Datos
          </h1>
          <p className="text-gray-600">
            Verifica que la conexión a Supabase esté funcionando correctamente
          </p>
        </div>

        {/* Configuration Steps */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Pasos de Configuración
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">Crear proyecto en Supabase</p>
                <p className="text-sm text-gray-600">
                  Ve a{' '}
                  <a 
                    href="https://supabase.com/dashboard" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                  >
                    supabase.com/dashboard
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                  {' '}y crea un nuevo proyecto
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">Obtener credenciales</p>
                <p className="text-sm text-gray-600">
                  En tu proyecto, ve a Settings → API y copia la URL y la clave anon/public
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">Configurar variables de entorno</p>
                <p className="text-sm text-gray-600">
                  Haz clic en "Connect to Supabase" en la esquina superior derecha
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Test Connection */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Prueba de Conexión
            </h2>
            <button
              onClick={testConnection}
              disabled={connectionStatus === 'testing'}
              className="btn-primary disabled:opacity-50"
            >
              {connectionStatus === 'testing' ? 'Probando...' : 'Probar Conexión'}
            </button>
          </div>

          {Object.keys(testResults).length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Conexión básica</span>
                <div className="flex items-center space-x-2">
                  <StatusIcon status={testResults.connection} />
                  {testResults.connectionError && (
                    <span className="text-sm text-red-600">{testResults.connectionError}</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Permisos de lectura</span>
                <div className="flex items-center space-x-2">
                  <StatusIcon status={testResults.readPermission} />
                  {testResults.readError && (
                    <span className="text-sm text-red-600">{testResults.readError}</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Permisos de escritura</span>
                <div className="flex items-center space-x-2">
                  <StatusIcon status={testResults.writePermission} />
                  {testResults.writeError && (
                    <span className="text-sm text-red-600">{testResults.writeError}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Status Summary */}
        {connectionStatus !== 'checking' && (
          <div className={`p-4 rounded-lg ${
            connectionStatus === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center">
              {connectionStatus === 'success' ? (
                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600 mr-3" />
              )}
              <div>
                <h3 className={`font-medium ${
                  connectionStatus === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {connectionStatus === 'success' 
                    ? '¡Base de datos configurada correctamente!' 
                    : 'Problemas de configuración detectados'
                  }
                </h3>
                <p className={`text-sm ${
                  connectionStatus === 'success' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {connectionStatus === 'success' 
                    ? 'Tu aplicación está lista para usar la base de datos persistente.'
                    : 'Revisa la configuración de Supabase y las variables de entorno.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Environment Variables Example */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Ejemplo de variables de entorno (.env)</h3>
          <pre className="text-sm text-gray-700 bg-white p-3 rounded border overflow-x-auto">
{`VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SetupGuide;