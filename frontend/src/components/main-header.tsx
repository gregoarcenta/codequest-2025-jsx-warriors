"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  ArrowLeftCircleIcon,
  HomeIcon,
  Menu,
  Search,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ToggleTheme } from "@/components/toggle-theme";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  interface NavigationItem {
    title: string;
    href: string;
    icon: React.ReactNode;
    children?: { title: string; href: string; description: string }[];
  }

  const navigationItems: NavigationItem[] = [
    {
      title: "Inicio",
      href: "/",
      icon: <HomeIcon />,
    },
    {
      title: "Artículos",
      href: "/articulos",
      icon: <ArrowLeftCircleIcon />,
    },
    {
      title: "Categorías",
      href: "#",
      icon: <HomeIcon />,
      children: [
        {
          title: "Frontend",
          href: "/articulos/frontend",
          description: "React, Vue, Angular y más tecnologías frontend",
        },
        {
          title: "Backend",
          href: "/articulos/backend",
          description: "Node.js, Python, .NET y tecnologías de servidor",
        },
        {
          title: "Mobile",
          href: "/articulos/mobile",
          description: "React Native, Flutter y desarrollo móvil",
        },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-600/30 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 dark:from-purple-950 dark:via-indigo-950 dark:to-slate-950 backdrop-blur supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-purple-900/95 supports-[backdrop-filter]:via-indigo-900/95 supports-[backdrop-filter]:to-slate-900/95 dark:supports-[backdrop-filter]:from-purple-950/95 dark:supports-[backdrop-filter]:via-indigo-950/95 dark:supports-[backdrop-filter]:to-slate-950/95 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/DEVTALLES-LOGO-CIRCULO.png"
                  alt="DevTalles Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative h-8 w-24 hidden sm:block">
                <Image
                  src="/DEVTALLES-LOGO-TEXT.png"
                  alt="DevTalles Text"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex" viewport={false}>
            <NavigationMenuList>
              {/* {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-600/30 hover:text-purple-300 focus:bg-purple-600/30 focus:text-purple-300 focus:outline-none"
                    >
                      {item.icon}
                      <span className="ml-2">{item.title}</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
 */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-600/30 hover:text-purple-300 focus:bg-purple-600/30 focus:text-purple-300 focus:outline-none"
                  >
                    Inicio
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/articulos"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-600/30 hover:text-purple-300 focus:bg-purple-600/30 focus:text-purple-300 focus:outline-none"
                  >
                    Artículos
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white hover:text-purple-300 data-[state=open]:text-purple-300 bg-transparent hover:bg-purple-600/30 data-[state=open]:!bg-purple-600/30 data-[state=open]:border-transparent">
                  Categorias
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur border border-purple-100 dark:border-purple-800 shadow-xl rounded-lg">
                    <div className="grid gap-2">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/articulos/frontend"
                          className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 hover:text-purple-800 dark:hover:text-purple-200 focus:bg-gradient-to-r focus:from-purple-50 focus:to-pink-50 dark:focus:from-purple-900/50 dark:focus:to-pink-900/50 focus:text-purple-800 dark:focus:text-purple-200"
                        >
                          <div className="text-sm font-medium leading-none text-slate-900 dark:text-white">
                            Frontend
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-slate-600 dark:text-slate-300">
                            React, Vue, Angular y más tecnologías frontend
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/articulos/backend"
                          className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 hover:text-purple-800 dark:hover:text-purple-200 focus:bg-gradient-to-r focus:from-purple-50 focus:to-pink-50 dark:focus:from-purple-900/50 dark:focus:to-pink-900/50 focus:text-purple-800 dark:focus:text-purple-200"
                        >
                          <div className="text-sm font-medium leading-none text-slate-900 dark:text-white">
                            Backend
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-slate-600 dark:text-slate-300">
                            Node.js, Python, .NET y tecnologías de servidor
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/articulos/mobile"
                          className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 hover:text-purple-800 dark:hover:text-purple-200 focus:bg-gradient-to-r focus:from-purple-50 focus:to-pink-50 dark:focus:from-purple-900/50 dark:focus:to-pink-900/50 focus:text-purple-800 dark:focus:text-purple-200"
                        >
                          <div className="text-sm font-medium leading-none text-slate-900 dark:text-white">
                            Mobile
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-slate-600 dark:text-slate-300">
                            React Native, Flutter y desarrollo móvil
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/comunidad"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-600/30 hover:text-purple-300 focus:bg-purple-600/30 focus:text-purple-300 focus:outline-none"
                  >
                    Comunidad
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search and Auth */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="hidden md:flex">
              {isSearchOpen ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="search"
                    placeholder="Buscar artículos..."
                    className="w-64 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-purple-300"
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="text-white hover:text-purple-300 hover:bg-purple-600/30"
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/dashboard/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-purple-300 hover:bg-purple-600/30"
                >
                  <User className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Button>
              </Link>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                Únete
              </Button>
              <ToggleTheme />
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-white hover:text-purple-300 hover:bg-purple-600/30"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 dark:from-purple-950 dark:via-indigo-950 dark:to-slate-950 border-l border-purple-500 dark:border-purple-700 p-0"
              >
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Logo in mobile menu */}
                    <div className="flex items-center space-x-3 pb-4 border-b border-purple-300/30">
                      <div className="relative h-8 w-8 flex-shrink-0">
                        <Image
                          src="/DEVTALLES-LOGO-CIRCULO.png"
                          alt="DevTalles Logo"
                          sizes="32px"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="font-semibold text-white">
                        DevTalles
                      </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col space-y-3">
                        <h3 className="font-semibold text-white text-lg flex items-center">
                          <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 flex-shrink-0"></span>
                          Artículos
                        </h3>
                        <div className="pl-5 space-y-2">
                          <Link
                            href="/articles/frontend"
                            className="block text-sm text-slate-300 hover:text-white py-2 px-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-600/50 hover:to-pink-600/50 transition-all duration-200"
                          >
                            🎨 Frontend
                          </Link>
                          <Link
                            href="/articles/backend"
                            className="block text-sm text-slate-300 hover:text-white py-2 px-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-600/50 hover:to-pink-600/50 transition-all duration-200"
                          >
                            ⚙️ Backend
                          </Link>
                          <Link
                            href="/articles/mobile"
                            className="block text-sm text-slate-300 hover:text-white py-2 px-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-600/50 hover:to-pink-600/50 transition-all duration-200"
                          >
                            📱 Mobile
                          </Link>
                        </div>
                      </div>

                      <Link
                        href="/tutoriales"
                        className="font-medium text-white py-3 px-3 hover:text-purple-200 transition-colors rounded-lg hover:bg-gradient-to-r hover:from-purple-600/50 hover:to-pink-600/50 flex items-center"
                      >
                        <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 flex-shrink-0"></span>
                        📚 Tutoriales
                      </Link>
                      <Link
                        href="/recursos"
                        className="font-medium text-white py-3 px-3 hover:text-purple-200 transition-colors rounded-lg hover:bg-gradient-to-r hover:from-purple-600/50 hover:to-pink-600/50 flex items-center"
                      >
                        <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 flex-shrink-0"></span>
                        🛠️ Recursos
                      </Link>
                      <Link
                        href="/comunidad"
                        className="font-medium text-white py-3 px-3 hover:text-purple-200 transition-colors rounded-lg hover:bg-gradient-to-r hover:from-purple-600/50 hover:to-pink-600/50 flex items-center"
                      >
                        <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 flex-shrink-0"></span>
                        👥 Comunidad
                      </Link>
                    </div>

                    {/* Search */}
                    <div className="pt-2">
                      <Input
                        type="search"
                        placeholder="Buscar artículos..."
                        className="w-full border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 bg-slate-800/50 text-white placeholder:text-slate-300"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-purple-300/30 dark:border-purple-700/30">
                      <div className="flex flex-col space-y-3">
                        <Link href="/dashboard/login">
                          <Button
                            variant="outline"
                            className="w-full justify-start border-purple-400/30 dark:border-purple-600/30 text-white hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-600/30 hover:text-purple-200 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-200"
                          >
                            <User className="h-4 w-4 mr-3" />
                            Iniciar Sesión
                          </Button>
                        </Link>
                        <Button className="justify-start bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                          ✨ Únete Ahora
                        </Button>
                        <div className="pt-2">
                          <ToggleTheme />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
