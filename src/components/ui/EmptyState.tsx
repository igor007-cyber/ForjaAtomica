import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon = "📦",
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface/50 px-6 py-16 text-center">
      <span className="text-5xl" aria-hidden>
        {icon}
      </span>
      <h3 className="font-display text-lg font-semibold text-foreground">
        {title}
      </h3>
      {description && (
        <p className="max-w-sm text-sm text-muted">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
