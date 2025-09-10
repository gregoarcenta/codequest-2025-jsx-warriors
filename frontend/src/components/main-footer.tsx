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
} from "lucide-react";

export default function Footer() {
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
                  className="object-contain"
                />
              </div>
              <div className="relative h-8 w-24">
                <Image
                  src="/DEVTALLES-LOGO-TEXT.png"
                  alt="DevTalles Text"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Impulsa tu carrera hasta las estrellas. Aprende a tu ritmo y
              potencia tu desarrollo profesional con nuestro blog de tecnología.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.youtube.com/@DevTalles"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/DevTalles"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/school/devtalles/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/DevTallesCorp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://discord.gg/pBjEVYTC7t"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/articles"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Todos los Artículos
                </Link>
              </li>
              <li>
                <Link
                  href="/tutoriales"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Tutoriales
                </Link>
              </li>
              <li>
                <Link
                  href="/recursos"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Recursos Gratuitos
                </Link>
              </li>
              <li>
                <Link
                  href="/comunidad"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Comunidad
                </Link>
              </li>
              <li>
                <Link
                  href="/newsletter"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/articles/frontend"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Frontend
                </Link>
              </li>
              <li>
                <Link
                  href="/articles/backend"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Backend
                </Link>
              </li>
              <li>
                <Link
                  href="/articles/mobile"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Desarrollo Móvil
                </Link>
              </li>
              <li>
                <Link
                  href="/articles/devops"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  DevOps
                </Link>
              </li>
              <li>
                <Link
                  href="/articles/ai"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Inteligencia Artificial
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contacto"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Contáctanos
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <a
                  href="https://cursos.devtalles.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors text-sm flex items-center"
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
            <span>Hecho con ❤️ para la comunidad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
