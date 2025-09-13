"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
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
  SheetDescription,
} from "@/components/ui/sheet";

import {
  ArrowLeftCircleIcon,
  Grid2x2,
  HomeIcon,
  Menu,
  Rss,
  Search,
  User,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ToggleTheme } from "@/components/toggle-theme";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MainHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  // Abrir sidebar automáticamente en móvil
  useEffect(() => {
    if (isMobile) {
      // Abrir automáticamente después de un pequeño delay
      //const timer = setTimeout(() => setIsSidebarOpen(true), 300);
      // return () => clearTimeout(timer);
    } else {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  interface NavigationItem {
    title: string;
    href: string;
    icon: React.ReactNode;
    children?: { title: string; href: string | object; description: string }[];
  }

  const navigationItems: NavigationItem[] = [
    {
      title: "Inicio",
      href: "/",
      icon: <HomeIcon className="h-4 w-4 text-white" />,
    },
    {
      title: "Artículos",
      href: "/articulos",
      icon: <Rss className="h-4 w-4 text-white" />,
    },
    {
      title: "Categorías",
      href: "#",
      icon: <Grid2x2 className="h-4 w-4 text-white" />,
      children: [
        {
          title: "Frontend",
          href: { pathname: "/articulos", query: { categoria: "frontend" } },
          description: "React, Vue, Angular y más tecnologías frontend",
        },
        {
          title: "Backend",
          href: { pathname: "/articulos", query: { categoria: "backend" } },
          description: "Node.js, Python, .NET y tecnologías de servidor",
        },
        {
          title: "Mobile",
          href: { pathname: "/articulos", query: { categoria: "mobile" } },
          description: "React Native, Flutter y desarrollo móvil",
        },
        {
          title: "DevOps",
          href: { pathname: "/articulos", query: { categoria: "devops" } },
          description: "CI/CD, Docker, Kubernetes y más",
        },
        {
          title: "Inteligencia Artificial",
          href: {
            pathname: "/articulos",
            query: { categoria: "inteligencia-artificial" },
          },
          description:
            "Inteligencia Artificial y Machine Learning usando python",
        },
      ],
    },
    {
      title: "Comunidad",
      href: "/comunidad",
      icon: <Users className="h-4 w-4 text-white" />,
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
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div className="relative h-8 w-24 hidden sm:block">
                <Image
                  src="/DEVTALLES-LOGO-TEXT.png"
                  alt="DevTalles Text"
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex" viewport={false}>
            <NavigationMenuList>
              {navigationItems.map((item: NavigationItem, index: number) =>
                (item.children || []).length <= 0 ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className="flex flex-row h-10 flex-nowrap w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-600/30 hover:text-purple-300 focus:bg-purple-600/30 focus:text-purple-300 focus:outline-none"
                      >
                        {item.icon}
                        <span className="ml-2">{item.title}</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="text-white hover:text-purple-300 data-[state=open]:text-purple-300 bg-transparent hover:bg-purple-600/30 data-[state=open]:!bg-purple-600/30 data-[state=open]:border-transparent">
                      {item.icon}
                      <span className="ml-2">{item.title}</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.children?.map((child) => (
                          <NavigationMenuLink asChild key={child.title}>
                            <Link
                              href={child.href}
                              className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 hover:text-purple-800 dark:hover:text-purple-200 focus:bg-gradient-to-r focus:from-purple-50 focus:to-pink-50 dark:focus:from-purple-900/50 dark:focus:to-pink-900/50 focus:text-purple-800 dark:focus:text-purple-200"
                            >
                              <div className="text-sm font-medium leading-none text-slate-900 dark:text-white">
                                {child.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 dark:text-slate-300">
                                {child.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search and Auth */}
          <div className="flex items-center space-x-2">
            {/* Search - Solo en desktop */}
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

            {/* Auth Buttons - Solo en desktop */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-purple-300 hover:bg-purple-600/30"
                >
                  <User className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/registro">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Únete
                </Button>
              </Link>
              <ToggleTheme />
            </div>

            {/* Mobile Menu Button - Visible en mobile/tablet */}
            <div className="lg:hidden">
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-purple-300 hover:bg-purple-600/30 transition-all duration-200 border-2 border-white/40 bg-white/10 backdrop-blur-sm p-2 h-10 w-10"
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menú</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="p-0 w-80 bg-white dark:bg-slate-900"
                >
                  <SheetDescription className="sr-only" />
                  <SheetTitle className="sr-only">
                    Menú de navegación móvil
                  </SheetTitle>

                  {/* Header del Sidebar */}
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-purple-950/50 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center space-x-3">
                      <div className="relative h-10 w-10 flex-shrink-0">
                        <Image
                          src="/DEVTALLES-LOGO-CIRCULO.png"
                          alt="DevTalles Logo"
                          sizes="40px"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h2 className="font-bold text-lg text-slate-900 dark:text-white">
                          DevTalles
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Blog de desarrollo
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content del Sidebar */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    {/* Navegación Principal */}
                    <div className="mb-6">
                      <h3 className="text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs font-semibold mb-3">
                        Navegación
                      </h3>
                      <div className="space-y-2">
                        {navigationItems.map((item) => {
                          return (item.children || []).length <= 0 ? (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                              onClick={() => setIsSidebarOpen(false)}
                            >
                              <p className="!text-black">{item.icon}</p>
                              <span>{item.title}</span>
                            </Link>
                          ) : (
                            <div className="mb-6" key={item.title}>
                              <h3 className="text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs font-semibold mb-3 flex items-center">
                                <Grid2x2 className="h-4 w-4 mr-2" />
                                Categorías
                              </h3>
                              <div className="space-y-3">
                                {(item.children || []).map((category) => (
                                  <Link
                                    key={category.title}
                                    href={category.href}
                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                                    onClick={() => setIsSidebarOpen(false)}
                                  >
                                    <span>{category.title}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Footer del Sidebar */}
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 mt-auto">
                    <div className="space-y-4">
                      {/* Toggle Theme */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Tema
                        </span>
                        <ToggleTheme />
                      </div>

                      {/* Auth Buttons */}
                      <div className="space-y-2">
                        <Link
                          href="/login"
                          className="block"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          <Button
                            variant="outline"
                            className="w-full justify-start border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400"
                          >
                            <User className="h-4 w-4 mr-2" />
                            Iniciar Sesión
                          </Button>
                        </Link>
                        <Link
                          href="/registro"
                          className="block"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
                            Únete
                          </Button>
                        </Link>
                      </div>

                      {/* Footer info */}
                      <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-600">
                        © 2025 DevTalles Blog
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
