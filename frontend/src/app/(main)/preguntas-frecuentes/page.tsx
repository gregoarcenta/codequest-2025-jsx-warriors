import ListQuestions from "@/components/preguntas-frecuentes/list-questions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
};

export default function PreguntaFrecuentePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 dark:from-purple-950 dark:via-indigo-950 dark:to-slate-950 text-white py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-900/60 to-slate-900/80"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300/50 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-pulse delay-2000"></div>

        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-white via-purple-100 to-blue-200 bg-clip-text text-transparent">
              Preguntas Frecuentes
            </span>
          </h1>
          <p className="text-purple-100 dark:text-purple-200 text-lg max-w-2xl mx-auto">
            Encuentra respuestas rápidas a las preguntas más comunes sobre
            nuestro blog
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <ListQuestions />
    </div>
  );
}
