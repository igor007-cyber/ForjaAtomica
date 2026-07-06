/**
 * Prefixa caminhos de assets locais (raiz-absolutos) com o basePath do deploy.
 *
 * Necessário porque, ao servir o site em um sub-caminho (ex.: GitHub Pages em
 * `/ForjaAtomica/`), `next/link` já aplica o basePath sozinho, mas `next/image`
 * e `<img>` nativos NÃO prefixam o `src`. Este helper resolve isso de forma
 * central. URLs externas (http), `data:` e `blob:` passam intactas.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(src: string): string {
  if (/^(https?:|data:|blob:)/i.test(src)) return src;
  if (!src.startsWith("/")) return src;
  return `${BASE_PATH}${src}`;
}
