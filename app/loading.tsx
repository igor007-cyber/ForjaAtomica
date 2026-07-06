export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center py-32">
      <div className="flex flex-col items-center gap-4">
        <span className="size-12 animate-spin rounded-full border-4 border-gold-500 border-t-transparent" />
        <p className="text-sm text-muted">Forjando a página...</p>
      </div>
    </div>
  );
}
