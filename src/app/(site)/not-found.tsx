import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[75vh] flex items-center justify-center bg-white px-6 py-24">
      <div className="text-center max-w-xl">
        <p className="text-[110px] md:text-[150px] leading-none font-bold text-gold-gradient select-none">
          404
        </p>
        <h1 className="text-headline font-bold text-stone-900 mt-4">
          Pagina nu a fost găsită
        </h1>
        <p className="text-body-lg text-stone-500 mt-4">
          Ne pare rău, pagina pe care o cauți nu există sau a fost mutată.
          <span className="block text-sm text-stone-400 mt-2">
            Sorry, the page you’re looking for could not be found.
          </span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            <Home className="w-4 h-4" /> Înapoi acasă
          </Link>
          <Link
            href="/proiecte"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-300 text-stone-800 text-sm font-medium hover:border-gold hover:text-gold transition-colors"
          >
            Vezi proiectele <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
