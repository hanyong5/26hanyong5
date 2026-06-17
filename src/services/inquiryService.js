import { supabase } from '../lib/supabase'

export async function getMyInquiries(userId) {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function getAllInquiries({ page = 1, limit = 10 } = {}) {
  const from = (page - 1) * limit
  const { data, error, count } = await supabase
    .from('inquiries')
    .select('*, profiles(name, email)', { count: 'exact' })
    .range(from, from + limit - 1)
    .order('created_at', { ascending: false })
  return { data, error, count }
}

export async function getInquiry(id) {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*, profiles(name, email)')
    .eq('id', id)
    .single()
  return { data, error }
}

export async function createInquiry(inquiry) {
  const { data, error } = await supabase.from('inquiries').insert(inquiry).select().single()
  return { data, error }
}

export async function answerInquiry(id, answer) {
  const { data, error } = await supabase
    .from('inquiries')
    .update({ answer, status: 'answered', answered_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}
