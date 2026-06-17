import { supabase } from '../lib/supabase'

export async function getProfile(userId) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
  return { data, error }
}

export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single()
  return { data, error }
}

export async function getAllProfiles() {
  const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
  return { data, error }
}

export async function updateUserRole(userId, role) {
  const { data, error } = await supabase.from('profiles').update({ role }).eq('id', userId).select().single()
  return { data, error }
}
