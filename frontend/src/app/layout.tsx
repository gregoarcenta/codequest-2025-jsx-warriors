import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Inicio | DevTalles - Blog",
    template: "%s | DevTalles - Blog",
  },
  description:
    "Descubre artículos sobre desarrollo web, tecnologías modernas y las mejores prácticas para crear aplicaciones increíbles.",
  icons: {
    icon: "/DEVTALLES-LOGO-CIRCULO.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className="scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={` ${raleway.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
