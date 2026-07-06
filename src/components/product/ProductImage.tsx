/**
 * Imagem de produto renderizada com <img> nativo.
 * Produtos podem ter imagem local (/products/*.svg), URL externa ou
 * data-URL vinda do upload no admin — casos que o next/image restringe
 * (SVG, domínios não configurados e data:). O <img> nativo cobre todos.
 */
interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}
