import ListArticles from "@/components/articulos/list-articles";
import { BookOpen } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articulos",
};

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section / Portada */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 dark:from-indigo-950 dark:via-purple-950 dark:to-slate-950 text-white py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-slate-900/80"></div>

        {/* Decorative elements */}
        <div className="absolute top-5 right-10 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-5 left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-indigo-300/50 rounded-full animate-pulse delay-1000"></div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
                Artículos dev/talles
              </span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Artículos, tutoriales y recursos sobre desarrollo web, móvil,
              DevOps e Inteligencia Artificial
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <ListArticles />
    </div>
  );
}
