export default function Input({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-ink-muted">{label}</label>}
      <input className="input-field" {...props} />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
