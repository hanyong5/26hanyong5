export default function Spinner({ size = 'md' }) {
  const s = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-10 h-10' : 'w-7 h-7'
  return (
    <div className="flex items-center justify-center w-full py-12">
      <div className={`${s} border-2 border-hairline border-t-primary rounded-full animate-spin`} />
    </div>
  )
}
