import { supabase } from '../lib/supabase'

export async function getPosts({ search, page = 1, limit = 10 } = {}) {
  let query = supabase
    .from('posts')
    .select('*, profiles(name)', { count: 'exact' })
  if (search) query = query.ilike('title', `%${search}%`)
  const from = (page - 1) * limit
  query = query.range(from, from + limit - 1).order('is_notice', { ascending: false }).order('created_at', { ascending: false })
  const { data, error, count } = await query
  return { data, error, count }
}

export async function getPost(id) {
  const { data, error } = await supabase
    .from('posts')
    .select('*, profiles(name, email)')
    .eq('id', id)
    .single()
  return { data, error }
}

export async function incrementViewCount(id) {
  await supabase.rpc('increment_post_view', { post_id: id })
}

export async function createPost(post) {
  const { data, error } = await supabase.from('posts').insert(post).select().single()
  return { data, error }
}

export async function updatePost(id, updates) {
  const { data, error } = await supabase
    .from('posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export async function deletePost(id) {
  const { error } = await supabase.from('posts').delete().eq('id', id)
  return { error }
}
