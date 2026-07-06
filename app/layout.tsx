import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import { Providers } from "@/src/contexts/Providers";
import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Forja Atômica — Impressão 3D Personalizada",
    template: "%s | Forja Atômica",
  },
  description:
    "Impressão 3D personalizada: decoração, utilidades, brindes, protótipos, miniaturas e itens sob medida. Sua ideia forjada átomo por átomo.",
  icons: { icon: "/favicon.ico" },
};

/** Aplica o tema salvo antes do primeiro paint para evitar flash. */
const themeInitScript = `
try {
  var t = localStorage.getItem("forja:theme");
  var dark = t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (dark) document.documentElement.classList.add("dark");
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Providers>
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
