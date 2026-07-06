"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./Button";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-forge-950/70 p-4 backdrop-blur-sm"
          onClick={onCancel}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start gap-3">
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-full text-lg ${
                  danger
                    ? "bg-red-500/10 text-red-500"
                    : "bg-gold-500/10 text-gold-600"
                }`}
                aria-hidden
              >
                {danger ? "🗑️" : "❔"}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-muted">{message}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={onCancel}>
                {cancelLabel}
              </Button>
              <Button
                variant={danger ? "danger" : "primary"}
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
