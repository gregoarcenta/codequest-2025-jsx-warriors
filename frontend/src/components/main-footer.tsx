"use client";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  Youtube,
  Twitter,
  Linkedin,
  Facebook,
  MessageCircle,
  Globe,
  HomeIcon,
  Rss,
  Grid2x2,
  Users,
} from "lucide-react";

export default function MainFooter() {
  interface Category {
    title: string;
    href: string;
    description: string;
  }

  const categories: Category[] = [
    {
      title: "Frontend",
      href: "/articulos/categoria/frontend",
      description: "React, Vue, Angular y más tecnologías frontend",
    },
    {
      title: "Backend",
      href: "/articulos/categoria/backend",
      description: "Node.js, Python, .NET y tecnologías de servidor",
    },
    {
      title: "Mobile",
      href: "/articulos/categoria/mobile",
      description: "React Native, Flutter y desarrollo móvil",
    },
    {
      title: "DevOps",
      href: "/articulos/categoria/devops",
      description: "CI/CD, Docker, Kubernetes y más",
    },
    {
      title: "Inteligencia Artificial",
      href: "/articulos/categoria/inteligencia-artificial",
      description: "Inteligencia Artificial y Machine Learning usando python",
    },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/DEVTALLES-LOGO-CIRCULO.png"
                  alt="DevTalles Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div className="relative h-8 w-24">
                <Image
                  src="/DEVTALLES-LOGO-TEXT.png"
                  alt="DevTalles Text"
                  fill
                  sizes="96px"
                  className="object-contain brightness-0 invert"
                />
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Enterate de las últimas novedades en desarrollo web, móvil y más.
              Tutoriales, recursos y una comunidad apasionada te esperan en
              DevTalles.
            </p>
            <p className="text-slate-300 text-sm">Síguenos en redes sociales</p>
            <div className="flex space-x-4">
              <a
                href="https://www.youtube.com/@DevTalles"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-purple-400 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/DevTalles"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-purple-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/school/devtalles/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-purple-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/DevTallesCorp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-purple-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://discord.gg/pBjEVYTC7t"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-purple-400 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 hidden lg:block">
            <h3 className="font-semibold text-lg">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/articles"
                  className="text-slate-300 hover:text-purple-400 transition-colors text-sm"
                >
                  Todos los Artículos
                </Link>
              </li>
              <li>
                <Link
                  href="/tutoriales"
                  className="text-slate-300 hover:text-purple-400 transition-colors text-sm"
                >
                  Tutoriales
                </Link>
              </li>
              <li>
                <Link
                  href="/recursos"
                  className="text-slate-300 hover:text-purple-400 transition-colors text-sm"
                >
                  Recursos Gratuitos
                </Link>
              </li>
              <li>
                <Link
                  href="/comunidad"
                  className="text-slate-300 hover:text-purple-400 transition-colors text-sm"
                >
                  Comunidad
                </Link>
              </li>
              <li>
                <Link
                  href="/newsletter"
                  className="text-slate-300 hover:text-purple-400 transition-colors text-sm"
                >
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4 hidden lg:block">
            <h3 className="font-semibold text-lg">Categorías</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.title}>
                  <Link
                    href={category.href}
                    className="text-slate-300 hover:text-purple-400 transition-colors text-sm"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4 hidden lg:block">
            <h3 className="font-semibold text-lg">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contacto"
                  className="text-slate-300 hover:text-purple-400 transition-colors text-sm"
                >
                  Contáctanos
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-slate-300 hover:text-purple-400 transition-colors text-sm"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-300 hover:text-purple-400 transition-colors text-sm"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-300 hover:text-purple-400 transition-colors text-sm"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <a
                  href="https://cursos.devtalles.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-purple-400 transition-colors text-sm flex items-center"
                >
                  <Globe className="h-3 w-3 mr-1" />
                  Cursos DevTalles
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-slate-800" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-slate-400 text-sm">
            © {new Date().getFullYear()} DevTalles Blog. Todos los derechos
            reservados.
          </div>
          <div className="flex items-center space-x-4 text-sm text-slate-400">
            <span>Hecho con ❤️ para la comunidad dev/talles</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
