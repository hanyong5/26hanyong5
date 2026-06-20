import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, useParams } from 'react-router-dom'
import { getProduct, createProduct, updateProduct } from '../../services/productService'
import { supabase } from '../../lib/supabase'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'

const schema = z.object({
  name: z.string().min(1, '제품명을 입력해주세요'),
  category: z.string().optional(),
  summary: z.string().optional(),
  content: z.string().optional(),
  price: z.coerce.number().min(0, '금액은 0 이상이어야 합니다').optional().nullable(),
  is_featured: z.boolean().optional(),
  sort_order: z.coerce.number().optional(),
})

export default function AdminProductForm() {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  const [loading, setLoading] = useState(isEdit)
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { is_featured: false, sort_order: 0, price: null },
  })

  useEffect(() => {
    if (!isEdit) return
    getProduct(id).then(r => {
      if (!r.data) { navigate('/admin/products'); return }
      reset(r.data)
      setImageUrl(r.data.image_url ?? '')
      setLoading(false)
    })
  }, [id])

  async function handleImageUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('products').upload(path, file, { upsert: true })
    if (!error) {
      const { data } = supabase.storage.from('products').getPublicUrl(path)
      setImageUrl(data.publicUrl)
    }
    setUploading(false)
  }

  async function onSubmit(values) {
    const payload = { ...values, image_url: imageUrl || null }
    const { error } = isEdit ? await updateProduct(id, payload) : await createProduct(payload)
    if (error) { alert('저장 실패: ' + error.message); return }
    navigate('/admin/products')
  }

  if (loading) return <Spinner />

  return (
    <div>
      <h2 className="headline mb-6">{isEdit ? '제품 수정' : '제품 등록'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="card flex flex-col gap-5 max-w-2xl">
        <Input label="제품명 *" error={errors.name?.message} {...register('name')} />
        <Input label="카테고리" placeholder="예: 전자제품" {...register('category')} />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink-muted">제품 이미지</label>
          <input type="file" accept="image/*" onChange={handleImageUpload}
            className="text-sm text-ink-subtle file:mr-3 file:btn-secondary file:border-0 file:text-xs" />
          {uploading && <p className="text-xs text-ink-subtle">업로드 중...</p>}
          {imageUrl && <img src={imageUrl} alt="미리보기" className="w-32 h-32 object-cover rounded-xl border border-hairline mt-2" />}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink-muted">요약 설명</label>
          <textarea className="input-field min-h-20 resize-y" {...register('summary')} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink-muted">상세 설명</label>
          <textarea className="input-field min-h-40 resize-y" {...register('content')} />
        </div>

        <Input
          label="금액 (원)"
          type="number"
          placeholder="0 입력 시 '가격 문의'로 표시"
          error={errors.price?.message}
          {...register('price')}
        />

        <div className="flex items-center gap-3">
          <Input label="정렬순서" type="number" className="w-24" {...register('sort_order')} />
          <label className="flex items-center gap-2 text-sm text-ink-muted cursor-pointer mt-5">
            <input type="checkbox" className="accent-primary" {...register('is_featured')} />
            메인 노출
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={() => navigate('/admin/products')} type="button">취소</Button>
          <Button type="submit" disabled={isSubmitting || uploading}>
            {isSubmitting ? '저장 중...' : '저장'}
          </Button>
        </div>
      </form>
    </div>
  )
}
