import { supabase } from '../lib/supabase'

export async function getProducts({ category, search, page = 1, limit = 12 } = {}) {
  let query = supabase.from('products').select('*', { count: 'exact' })
  if (category) query = query.eq('category', category)
  if (search) query = query.ilike('name', `%${search}%`)
  const from = (page - 1) * limit
  query = query.range(from, from + limit - 1).order('sort_order').order('created_at', { ascending: false })
  const { data, error, count } = await query
  return { data, error, count }
}

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .order('sort_order')
    .limit(6)
  return { data, error }
}

export async function getProduct(id) {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
  return { data, error }
}

export async function createProduct(product) {
  const { data, error } = await supabase.from('products').insert(product).select().single()
  return { data, error }
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase.from('products').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single()
  return { data, error }
}

export async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id)
  return { error }
}

export async function getCategories() {
  const { data, error } = await supabase.from('products').select('category').not('category', 'is', null)
  const categories = [...new Set(data?.map(d => d.category) ?? [])]
  return { data: categories, error }
}
