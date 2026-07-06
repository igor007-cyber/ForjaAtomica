"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ToastMessage, ToastType } from "@/src/types";

const typeStyles: Record<ToastType, { bar: string; icon: string }> = {
  success: { bar: "bg-emerald-500", icon: "✅" },
  error: { bar: "bg-red-500", icon: "⚠️" },
  info: { bar: "bg-gold-500", icon: "💡" },
};

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: number) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const style = typeStyles[toast.type];
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="pointer-events-auto flex items-center gap-3 overflow-hidden rounded-xl border border-border bg-surface shadow-xl shadow-black/10"
              role="status"
            >
              <span className={`h-full w-1.5 self-stretch ${style.bar}`} />
              <span className="text-lg" aria-hidden>
                {style.icon}
              </span>
              <p className="flex-1 py-3 pr-2 text-sm text-foreground">
                {toast.message}
              </p>
              <button
                onClick={() => onDismiss(toast.id)}
                className="cursor-pointer px-3 py-3 text-muted transition-colors hover:text-foreground"
                aria-label="Fechar notificação"
              >
                ✕
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
