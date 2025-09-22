import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Globe,
  Linkedin,
  MessageCircle,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MainFooter() {
  interface Category {
    title: string;
    href: string;
    description: string;
  }

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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

          {/* Download App Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Descarga la App</h3>
            <p className="text-slate-300 text-sm">
              Lleva Dev/talles blog a donde vayas con nuestra app móvil.
            </p>
            <div className="flex flex-col space-y-3">
              {/* Google Play Store */}
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors duration-300 border border-gray-700"
              >
                <svg
                  className="w-6 h-6 mr-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs">Disponible en</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>

              {/* Apple App Store */}
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors duration-300 border border-gray-700"
              >
                <svg
                  className="w-6 h-6 mr-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs">Descargar en</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 hidden lg:block">
            <h3 className="font-semibold text-lg">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-slate-300 hover:text-purple-400 transition-colors text-sm"
                >
                  Inicio
                </Link>
              </li>

              <li>
                <Link
                  href="/articulos"
                  className="text-slate-300 hover:text-purple-400 transition-colors text-sm"
                >
                  Todos los Artículos
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
            </ul>
          </div>

          {/* Categories */}
          {/* <div className="space-y-4 hidden lg:block">
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
          </div> */}

          {/* Support */}
          <div className="space-y-4 ">
            <h3 className="font-semibold text-lg">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contactanos"
                  className="text-slate-300 hover:text-purple-400 transition-colors text-sm"
                >
                  Contáctanos
                </Link>
              </li>
              <li>
                <Link
                  href="/preguntas-frecuentes"
                  className="text-slate-300 hover:text-purple-400 transition-colors text-sm"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos-y-condiciones"
                  className="text-slate-300 hover:text-purple-400 transition-colors text-sm"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/politicas-de-privacidad"
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
