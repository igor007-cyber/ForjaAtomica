import Link from "next/link";

export default function NotFound() {
  return (
    <div className="hex-pattern flex flex-1 flex-col items-center justify-center gap-6 bg-forge-950 px-4 py-24 text-center text-white">
      <p className="font-display text-8xl font-bold text-gold-gradient">404</p>
      <h1 className="font-display text-2xl font-bold uppercase tracking-wide">
        Página não encontrada
      </h1>
      <p className="max-w-md text-white/70">
        A peça que você procura ainda não foi forjada — ou o link está
        quebrado.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-3.5 font-bold text-forge-950 shadow-xl shadow-gold-600/30 transition-all hover:from-gold-300 hover:to-gold-500"
      >
        ⚛ Voltar ao início
      </Link>
    </div>
  );
}
