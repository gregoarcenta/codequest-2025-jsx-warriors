import Link from "next/link";
import { ArrowRight, BookOpen, Users } from "lucide-react";
import HeroMascot from "@/components/hero-mascot";
import { Metadata } from "next";
import HomeContent from "@/components/home/home-content";

export const metadata: Metadata = {
  title: "Inicio",
};

export default function MainHomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 dark:from-purple-950 dark:via-indigo-950 dark:to-slate-950 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-900/60 to-slate-900/80"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300/50 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-pulse delay-2000"></div>

        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="space-y-8 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-100 to-blue-200 bg-clip-text text-transparent">
                  Enterate de lo último
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-300 via-pink-200 to-white bg-clip-text text-transparent">
                  en dev/talles blog
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Descubre las mejores prácticas, tutoriales detallados y las
                últimas tendencias en desarrollo frontend y backend. Contenido
                creado por expertos para acelerar tu crecimiento profesional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link
                  href="/articulos"
                  className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-4 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 font-medium"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Leer Artículos
                </Link>
                <Link
                  href="/comunidad"
                  className="inline-flex items-center justify-center rounded-md border border-white/80 text-white bg-white/10 hover:bg-white/20 hover:border-white hover:text-white dark:hover:bg-white/15 dark:hover:text-white text-lg px-8 py-4 backdrop-blur-sm shadow-lg hover:shadow-white/25 transition-all duration-300 font-medium"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Comunidad
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Right side - Hero image */}
            <div className="flex justify-center lg:justify-end">
              <HeroMascot />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative container mx-auto px-4 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                +1000
              </div>
              <div className="text-slate-300 mt-3 text-sm md:text-base">
                Lectores mensuales del blog
              </div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                +100
              </div>
              <div className="text-slate-300 mt-3 text-sm md:text-base">
                Artículos y tutoriales publicados
              </div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
                +10k
              </div>
              <div className="text-slate-300 mt-3 text-sm md:text-base">
                Developers en nuestra comunidad
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeContent />
    </div>
  );
}
