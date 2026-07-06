"use client";

interface QuantitySelectorProps {
  quantity: number;
  max: number;
  onChange: (quantity: number) => void;
  size?: "sm" | "md";
}

export function QuantitySelector({
  quantity,
  max,
  onChange,
  size = "md",
}: QuantitySelectorProps) {
  const btn =
    size === "sm" ? "size-7 text-sm" : "size-9 text-base";

  return (
    <div className="inline-flex items-center rounded-xl border border-border bg-background">
      <button
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
        className={`${btn} cursor-pointer rounded-l-xl font-bold text-foreground transition-colors hover:bg-gold-500/15 disabled:cursor-not-allowed disabled:opacity-40`}
        aria-label="Diminuir quantidade"
      >
        −
      </button>
      <span
        className={`${
          size === "sm" ? "w-8 text-sm" : "w-10 text-base"
        } text-center font-semibold text-foreground tabular-nums`}
        aria-live="polite"
      >
        {quantity}
      </span>
      <button
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= max}
        className={`${btn} cursor-pointer rounded-r-xl font-bold text-foreground transition-colors hover:bg-gold-500/15 disabled:cursor-not-allowed disabled:opacity-40`}
        aria-label="Aumentar quantidade"
      >
        +
      </button>
    </div>
  );
}
