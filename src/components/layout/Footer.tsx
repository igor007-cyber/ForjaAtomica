import Image from "next/image";
import Link from "next/link";
import { categories } from "@/src/data/categories";
import { WHATSAPP_BASE_URL } from "@/src/utils/whatsapp";

const socialLinks = [
  { label: "Instagram", icon: "📸", href: "https://instagram.com/forjaatomica3d" },
  { label: "Facebook", icon: "👍", href: "https://facebook.com/forjaatomica3d" },
  { label: "TikTok", icon: "🎵", href: "https://tiktok.com/@forjaatomica3d" },
  { label: "YouTube", icon: "▶️", href: "https://youtube.com/@forjaatomica3d" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gold-500/20 bg-forge-950 text-white">
      <div className="hex-pattern mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div>
            <Image
              src="/logo-lettering.jpg"
              alt="Forja Atômica — Impressão 3D"
              width={200}
              height={112}
              className="rounded-xl"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Impressão 3D personalizada: decoração, utilidades, brindes,
              protótipos e muito mais. Sua ideia forjada átomo por átomo.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="font-display mb-4 text-sm font-bold uppercase tracking-widest text-gold-400">
              Navegação
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/" className="transition-colors hover:text-gold-400">
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos"
                  className="transition-colors hover:text-gold-400"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  href="/carrinho"
                  className="transition-colors hover:text-gold-400"
                >
                  Carrinho
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="transition-colors hover:text-gold-400"
                >
                  Minha conta
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="font-display mb-4 text-sm font-bold uppercase tracking-widest text-gold-400">
              Categorias
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              {categories.slice(0, 6).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/produtos?categoria=${category.slug}`}
                    className="transition-colors hover:text-gold-400"
                  >
                    {category.icon} {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-display mb-4 text-sm font-bold uppercase tracking-widest text-gold-400">
              Contato
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <a
                  href={WHATSAPP_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold-400"
                >
                  💬 WhatsApp
                </a>
              </li>
              <li>✉️ contato@forjaatomica.com.br</li>
              <li>📍 São Paulo — SP, Brasil</li>
              <li>🕘 Seg. a Sáb. — 9h às 18h</li>
            </ul>
            <div className="mt-5 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="flex size-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-lg transition-all hover:border-gold-400 hover:bg-gold-500/15"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Forja Atômica Impressão 3D. Todos os
            direitos reservados.
          </p>
          <p>
            Feito com <span className="text-gold-400">⚛</span> e filamento PLA.
          </p>
        </div>
      </div>
    </footer>
  );
}
