const styles = {
  default: 'bg-surface-2 text-ink-muted',
  success: 'bg-success/20 text-success',
  pending: 'bg-surface-3 text-ink-subtle',
  notice: 'bg-primary/20 text-primary',
}

export default function Badge({ children, variant = 'default' }) {
  return (
    <span className={`badge ${styles[variant]}`}>{children}</span>
  )
}
