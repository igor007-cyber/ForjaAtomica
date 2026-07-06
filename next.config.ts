import type { NextConfig } from "next";

/**
 * O site é publicado no GitHub Pages em https://igor007-cyber.github.io/ForjaAtomica/,
 * ou seja, sob o sub-caminho `/ForjaAtomica`. O basePath só é aplicado no build de
 * produção — em `next dev` o site continua rodando na raiz (`/`).
 */
const basePath = process.env.NODE_ENV === "production" ? "/ForjaAtomica" : "";

const nextConfig: NextConfig = {
  output: "export", // gera site estático em `out/` (compatível com GitHub Pages)
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath }, // exposto ao helper `asset()`
  trailingSlash: true, // gera `/rota/index.html` — servido corretamente pelo Pages
  images: { unoptimized: true }, // export estático não tem otimizador de imagem em runtime
};

export default nextConfig;
