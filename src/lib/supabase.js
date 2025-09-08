import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Only create client if properly configured
export const supabase = (supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key') 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database helper functions
export const dbHelpers = {
  // Players
  async getPlayers() {
    if (!supabase) throw new Error('Supabase no está configurado');
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data || []
  },

  async addPlayer(player) {
    if (!supabase) throw new Error('Supabase no está configurado');
    const { data, error } = await supabase
      .from('players')
      .insert([player])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async updatePlayer(id, updates) {
    if (!supabase) throw new Error('Supabase no está configurado');
    const { data, error } = await supabase
      .from('players')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async deletePlayer(id) {
    if (!supabase) throw new Error('Supabase no está configurado');
    const { error } = await supabase
      .from('players')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Teams
  async getTeams() {
    if (!supabase) throw new Error('Supabase no está configurado');
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data || []
  },

  async addTeam(team) {
    if (!supabase) throw new Error('Supabase no está configurado');
    const { data, error } = await supabase
      .from('teams')
      .insert([team])
      .select()
    
    if (error) throw error
    return data[0]
  },

  async updateTeam(id, updates) {
    if (!supabase) throw new Error('Supabase no está configurado');
    const { data, error } = await supabase
      .from('teams')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  async deleteTeam(id) {
    if (!supabase) throw new Error('Supabase no está configurado');
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}