/*
  # Crear esquema completo para el sistema de estadísticas de softball

  1. Nuevas Tablas
    - `teams` - Información de equipos
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `city` (text)
      - `description` (text)
      - `logo` (text)
      - `founded_year` (integer)
      - `colors` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `players` - Información de jugadores
      - `id` (uuid, primary key)
      - `name` (text)
      - `number` (integer)
      - `team_id` (uuid, foreign key)
      - `team_name` (text)
      - `position` (text)
      - `photo` (text)
      - `stats` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Seguridad
    - Habilitar RLS en todas las tablas
    - Políticas para permitir operaciones CRUD públicas (para desarrollo)
    - En producción se pueden ajustar las políticas según necesidades
*/

-- Crear tabla de equipos
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  city text NOT NULL,
  description text DEFAULT '',
  logo text DEFAULT '',
  founded_year integer,
  colors jsonb DEFAULT '{"primary": "#0ea5e9", "secondary": "#64748b"}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear tabla de jugadores
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  number integer NOT NULL,
  team_id uuid REFERENCES teams(id) ON DELETE SET NULL,
  team_name text NOT NULL,
  position text NOT NULL,
  photo text DEFAULT '',
  stats jsonb DEFAULT '{
    "atBats": 0,
    "hits": 0,
    "doubles": 0,
    "triples": 0,
    "homeRuns": 0,
    "walks": 0,
    "strikeouts": 0,
    "runsScored": 0,
    "rbi": 0,
    "sacrifices": 0,
    "avg": 0,
    "wins": 0,
    "losses": 0,
    "strikeoutsPitching": 0,
    "walksPitching": 0,
    "runsAllowed": 0,
    "hitsAllowed": 0,
    "earnedRuns": 0
  }',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_players_team_name ON players(team_name);
CREATE INDEX IF NOT EXISTS idx_players_position ON players(position);
CREATE INDEX IF NOT EXISTS idx_teams_name ON teams(name);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
DROP TRIGGER IF EXISTS update_teams_updated_at ON teams;
CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON teams
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_players_updated_at ON players;
CREATE TRIGGER update_players_updated_at
  BEFORE UPDATE ON players
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad (permisivas para desarrollo)
-- En producción se pueden ajustar según necesidades específicas

-- Políticas para teams
DROP POLICY IF EXISTS "Allow public read access to teams" ON teams;
CREATE POLICY "Allow public read access to teams"
  ON teams
  FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Allow public insert access to teams" ON teams;
CREATE POLICY "Allow public insert access to teams"
  ON teams
  FOR INSERT
  TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access to teams" ON teams;
CREATE POLICY "Allow public update access to teams"
  ON teams
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete access to teams" ON teams;
CREATE POLICY "Allow public delete access to teams"
  ON teams
  FOR DELETE
  TO public
  USING (true);

-- Políticas para players
DROP POLICY IF EXISTS "Allow public read access to players" ON players;
CREATE POLICY "Allow public read access to players"
  ON players
  FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Allow public insert access to players" ON players;
CREATE POLICY "Allow public insert access to players"
  ON players
  FOR INSERT
  TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access to players" ON players;
CREATE POLICY "Allow public update access to players"
  ON players
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete access to players" ON players;
CREATE POLICY "Allow public delete access to players"
  ON players
  FOR DELETE
  TO public
  USING (true);

-- Insertar datos de ejemplo
INSERT INTO teams (name, city, description, founded_year, colors) VALUES
  ('Águilas de Pereira', 'Pereira', 'Equipo fundado en 2010, conocido por su excelente defensa y jugadores veteranos.', 2010, '{"primary": "#1e40af", "secondary": "#fbbf24"}'),
  ('Tigres de Dosquebradas', 'Dosquebradas', 'Equipo joven con gran potencial ofensivo y pitcheo sólido.', 2015, '{"primary": "#f97316", "secondary": "#1f2937"}'),
  ('Leones de La Virginia', 'La Virginia', 'Equipo tradicional de la liga con múltiples campeonatos.', 2008, '{"primary": "#dc2626", "secondary": "#fbbf24"}')
ON CONFLICT (name) DO NOTHING;

-- Insertar jugadores de ejemplo
INSERT INTO players (name, number, team_name, position, stats) VALUES
  ('Carlos Rodríguez', 10, 'Águilas de Pereira', 'Shortstop', '{
    "atBats": 45, "hits": 18, "doubles": 4, "triples": 1, "homeRuns": 2,
    "walks": 8, "strikeouts": 12, "runsScored": 15, "rbi": 12, "sacrifices": 2,
    "avg": 0.400, "wins": 0, "losses": 0, "strikeoutsPitching": 0,
    "walksPitching": 0, "runsAllowed": 0, "hitsAllowed": 0, "earnedRuns": 0
  }'),
  ('Miguel Ángel Torres', 22, 'Tigres de Dosquebradas', 'Pitcher', '{
    "atBats": 35, "hits": 12, "doubles": 2, "triples": 0, "homeRuns": 1,
    "walks": 5, "strikeouts": 8, "runsScored": 8, "rbi": 7, "sacrifices": 1,
    "avg": 0.343, "wins": 4, "losses": 1, "strikeoutsPitching": 32,
    "walksPitching": 8, "runsAllowed": 12, "hitsAllowed": 28, "earnedRuns": 8
  }'),
  ('Andrés Felipe Gómez', 7, 'Leones de La Virginia', 'Primera Base', '{
    "atBats": 42, "hits": 15, "doubles": 3, "triples": 0, "homeRuns": 4,
    "walks": 6, "strikeouts": 10, "runsScored": 12, "rbi": 18, "sacrifices": 1,
    "avg": 0.357, "wins": 0, "losses": 0, "strikeoutsPitching": 0,
    "walksPitching": 0, "runsAllowed": 0, "hitsAllowed": 0, "earnedRuns": 0
  }')
ON CONFLICT DO NOTHING;