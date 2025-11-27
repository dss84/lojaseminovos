import { createClient } from '@supabase/supabase-js';

// Variáveis de ambiente do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Verificar se as variáveis de ambiente estão configuradas
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey && 
         supabaseUrl !== '' && supabaseAnonKey !== '';
};
