"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Product, ProductFormData, CategorySlug } from "@/src/types";
import { categories } from "@/src/data/categories";
import { useProducts } from "@/src/contexts/ProductsContext";
import { useToast } from "@/src/contexts/ToastContext";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { ImagePicker } from "./ImagePicker";

interface ProductFormProps {
  /** Produto existente para edição; omita para cadastro. */
  product?: Product;
}

type FormErrors = Partial<Record<keyof ProductFormData, string>>;

function toFormData(product?: Product): ProductFormData {
  return {
    name: product?.name ?? "",
    category: product?.category ?? "outros",
    description: product?.description ?? "",
    price: product ? String(product.price).replace(".", ",") : "",
    stock: product ? String(product.stock) : "",
    image: product?.image ?? "",
    status: product?.status ?? "disponivel",
    featured: product?.featured ?? false,
  };
}

function parsePrice(value: string): number {
  return Number(value.replace(/\./g, "").replace(",", "."));
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const { createProduct, updateProduct } = useProducts();
  const { showToast } = useToast();

  const [form, setForm] = useState<ProductFormData>(() => toFormData(product));
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = Boolean(product);

  function setField<K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (form.name.trim().length < 3) {
      next.name = "Informe o nome do produto (mínimo 3 caracteres).";
    }
    if (form.description.trim().length < 10) {
      next.description = "Descreva o produto (mínimo 10 caracteres).";
    }
    const price = parsePrice(form.price);
    if (!form.price || Number.isNaN(price) || price <= 0) {
      next.price = "Informe um valor válido maior que zero.";
    }
    const stock = Number(form.stock);
    if (
      form.stock === "" ||
      Number.isNaN(stock) ||
      stock < 0 ||
      !Number.isInteger(stock)
    ) {
      next.stock = "Informe a quantidade em estoque (número inteiro ≥ 0).";
    }
    if (!form.image.trim()) {
      next.image = "Adicione uma imagem por upload ou URL.";
    }
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      showToast("Revise os campos destacados.", "error");
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      try {
        const data = {
          name: form.name.trim(),
          category: form.category,
          description: form.description.trim(),
          price: parsePrice(form.price),
          stock: Number(form.stock),
          image: form.image.trim(),
          status: form.status,
          featured: form.featured,
        };

        if (isEditing && product) {
          updateProduct(product.id, data);
          showToast("Produto atualizado com sucesso ✅");
        } else {
          createProduct(data);
          showToast("Produto cadastrado com sucesso 🎉");
        }
        router.push("/admin/produtos");
      } catch {
        showToast("Erro ao salvar o produto.", "error");
        setIsSubmitting(false);
      }
    }, 400);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]"
    >
      {/* Coluna principal */}
      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <Input
          label="Nome do produto"
          placeholder="Ex.: Vaso Geométrico Low Poly"
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
          error={errors.name}
        />

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="product-category"
            className="text-sm font-medium text-foreground"
          >
            Categoria
          </label>
          <select
            id="product-category"
            value={form.category}
            onChange={(e) =>
              setField("category", e.target.value as CategorySlug)
            }
            className="cursor-pointer rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-gold-500 focus:ring-2 focus:ring-gold-500/25"
          >
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="product-description"
            className="text-sm font-medium text-foreground"
          >
            Descrição
          </label>
          <textarea
            id="product-description"
            rows={5}
            placeholder="Descreva materiais, dimensões, acabamento..."
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            className={`resize-y rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted/70 focus:ring-2 ${
              errors.description
                ? "border-red-500 focus:ring-red-500/30"
                : "border-border focus:border-gold-500 focus:ring-gold-500/25"
            }`}
          />
          {errors.description && (
            <p className="text-xs text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="Valor (R$)"
            placeholder="49,90"
            inputMode="decimal"
            value={form.price}
            onChange={(e) => setField("price", e.target.value)}
            error={errors.price}
            icon="💰"
          />
          <Input
            label="Quantidade em estoque"
            placeholder="10"
            type="number"
            min={0}
            step={1}
            value={form.stock}
            onChange={(e) => setField("stock", e.target.value)}
            error={errors.stock}
            icon="📦"
          />
        </div>
      </div>

      {/* Coluna lateral */}
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <ImagePicker
            value={form.image}
            onChange={(value) => setField("image", value)}
          />
          {errors.image && (
            <p className="mt-2 text-xs text-red-500">{errors.image}</p>
          )}
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="product-status"
              className="text-sm font-medium text-foreground"
            >
              Status
            </label>
            <select
              id="product-status"
              value={form.status}
              onChange={(e) =>
                setField(
                  "status",
                  e.target.value as ProductFormData["status"]
                )
              }
              className="cursor-pointer rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-gold-500 focus:ring-2 focus:ring-gold-500/25"
            >
              <option value="disponivel">✅ Disponível</option>
              <option value="indisponivel">⛔ Indisponível</option>
            </select>
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 transition-colors hover:border-gold-500">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setField("featured", e.target.checked)}
              className="size-4 accent-gold-500"
            />
            <span className="text-sm text-foreground">
              ⭐ Exibir como destaque na loja
            </span>
          </label>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="ghost"
            className="flex-1"
            onClick={() => router.push("/admin/produtos")}
          >
            Cancelar
          </Button>
          <Button type="submit" className="flex-1" isLoading={isSubmitting}>
            {isEditing ? "Salvar alterações" : "Cadastrar produto"}
          </Button>
        </div>
      </div>
    </form>
  );
}
