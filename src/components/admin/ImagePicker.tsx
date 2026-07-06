"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { useToast } from "@/src/contexts/ToastContext";
import { Input } from "@/src/components/ui/Input";

const MAX_FILE_SIZE_MB = 2;

interface ImagePickerProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Seletor de imagem do produto: upload de arquivo (convertido para data-URL
 * e persistido no localStorage) ou URL externa.
 */
export function ImagePicker({ value, onChange }: ImagePickerProps) {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"upload" | "url">(
    value.startsWith("data:") ? "upload" : "url"
  );

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Selecione um arquivo de imagem válido.", "error");
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      showToast(`A imagem deve ter no máximo ${MAX_FILE_SIZE_MB}MB.`, "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.onerror = () => showToast("Erro ao ler o arquivo.", "error");
    reader.readAsDataURL(file);
  }

  const tabClass = (active: boolean) =>
    `cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-all ${
      active
        ? "bg-gradient-to-r from-gold-400 to-gold-600 text-forge-950"
        : "border border-border bg-surface text-foreground hover:border-gold-500"
    }`;

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-foreground">
        Imagem do produto
      </span>

      <div className="flex gap-2" role="group" aria-label="Origem da imagem">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={tabClass(mode === "upload")}
        >
          📤 Upload
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={tabClass(mode === "url")}
        >
          🔗 URL da imagem
        </button>
      </div>

      {mode === "upload" ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-background px-6 py-8 text-center transition-colors hover:border-gold-500"
        >
          <span className="text-3xl" aria-hidden>
            🖼️
          </span>
          <span className="text-sm font-medium text-foreground">
            Clique para escolher a imagem
          </span>
          <span className="text-xs text-muted">
            PNG, JPG, WebP ou SVG — máx. {MAX_FILE_SIZE_MB}MB
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Enviar arquivo de imagem"
          />
        </button>
      ) : (
        <Input
          placeholder="https://exemplo.com/imagem.jpg"
          value={value.startsWith("data:") ? "" : value}
          onChange={(e) => onChange(e.target.value)}
          icon="🔗"
        />
      )}

      {/* Pré-visualização */}
      {value && (
        <div className="relative h-44 w-44 overflow-hidden rounded-2xl border border-border bg-forge-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Pré-visualização da imagem do produto"
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 flex size-7 cursor-pointer items-center justify-center rounded-full bg-forge-950/70 text-xs text-white backdrop-blur transition-colors hover:bg-red-600"
            aria-label="Remover imagem"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
