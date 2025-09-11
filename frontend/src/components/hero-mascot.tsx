"use client";

import Image from "next/image";

interface HeroMascotProps {
  className?: string;
}

export default function HeroMascot({ className = "" }: HeroMascotProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Background glow effect with subtle pulse */}
      <div
        className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl absolute inset-0 animate-pulse opacity-60"
        style={{ animationDuration: "3s" }}
      ></div>

      {/* Main character container with floating animation */}
      <div
        className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center animate-bounce"
        style={{ animationDuration: "2.5s" }}
      >
        {/* Mascot image with gentle hover animation */}
        <div
          className="relative w-90 h-90 md:w-100 md:h-100 transform hover:scale-105 transition-transform duration-500 animate-pulse"
          style={{ animationDuration: "4s" }}
        >
          <Image
            src="/DEVI-HELLO-BORDER.png"
            alt="DevTalles Mascota"
            fill
            className="object-contain drop-shadow-2xl"
          />

          {/* Shadow effect that moves with the bounce */}
          <div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-black/20 dark:bg-white/10 rounded-full blur-md animate-pulse opacity-60"
            style={{ animationDuration: "2.5s" }}
          ></div>
        </div>

        {/* Floating decorative elements with enhanced animations */}
        <div
          className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-lg animate-bounce shadow-xl hover:animate-spin transition-all duration-500"
          style={{ animationDuration: "3s" }}
        >
          ✨
        </div>
        <div
          className="absolute -bottom-8 -left-8 w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-sm animate-bounce shadow-xl hover:scale-110 transition-all duration-500"
          style={{ animationDuration: "3.2s", animationDelay: "0.5s" }}
        >
          💻
        </div>

        {/* Floating particles with staggered animations */}
        <div
          className="absolute top-1/4 -left-12 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full animate-bounce shadow-lg"
          style={{ animationDuration: "2.8s", animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 -right-12 w-3 h-3 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full animate-bounce shadow-lg"
          style={{ animationDuration: "3.5s", animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/3 right-4 w-2 h-2 bg-white/80 rounded-full animate-ping shadow-md"
          style={{ animationDuration: "3s", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-4 w-1.5 h-1.5 bg-purple-300/90 rounded-full animate-ping shadow-md"
          style={{ animationDuration: "3.5s", animationDelay: "3s" }}
        ></div>

        {/* Additional floating elements for more dynamic feel */}
        <div
          className="absolute top-12 left-6 w-2 h-2 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full animate-bounce shadow-lg"
          style={{ animationDuration: "2.7s", animationDelay: "0.7s" }}
        ></div>
        <div
          className="absolute bottom-12 right-6 w-2 h-2 bg-gradient-to-br from-purple-300 to-indigo-300 rounded-full animate-bounce shadow-lg"
          style={{ animationDuration: "3.3s", animationDelay: "1.2s" }}
        ></div>
      </div>

      {/* Orbiting particles with custom animation */}
      <div
        className="absolute top-10 left-10 w-1.5 h-1.5 bg-gradient-to-br from-white to-purple-200 rounded-full animate-ping opacity-70 shadow-sm"
        style={{ animationDuration: "4s" }}
      ></div>
      <div
        className="absolute bottom-16 right-20 w-2 h-2 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full animate-pulse shadow-sm"
        style={{ animationDuration: "3.5s", animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-20 right-8 w-1.5 h-1.5 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full animate-ping shadow-sm"
        style={{ animationDuration: "3.8s", animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-32 left-16 w-1 h-1 bg-gradient-to-br from-yellow-300 to-amber-300 rounded-full animate-pulse shadow-sm"
        style={{ animationDuration: "3.2s", animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute top-32 left-32 w-1 h-1 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full animate-ping shadow-sm"
        style={{ animationDuration: "4.2s", animationDelay: "2.5s" }}
      ></div>
    </div>
  );
}
