"use client";

import Image from "next/image";

interface HeroMascotProps {
  className?: string;
}

export default function HeroMascot({ className = "" }: HeroMascotProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Background glow effect */}
      {/*       <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl absolute inset-0 animate-pulse"></div>
       */}
      {/* Main character container */}
      <div className="relative w-80 h-80 md:w-96 md:h-96  flex items-center justify-center animate-float">
        {/* Replace this section with the actual DevTalles mascot image when available */}
        <div className="relative w-90 h-90 md:w-100 md:h-100">
          {/* You can replace this with the actual image */}
          <iframe
            src="https://nleivas.github.io/Backgrounds/"
            width="400px"
            height="400px"
            style={{ border: "none" }}
          ></iframe>
          {/* Uncomment this when you have the actual DevTalles mascot image */}
          {/* 
          <Image
            src="/path-to-devtalles-mascot.png"
            alt="DevTalles Mascot"
            fill
            className="object-contain"
          />
          */}
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-lg animate-bounce shadow-lg">
          ✨
        </div>
        <div className="absolute -bottom-8 -left-8 w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-sm animate-bounce delay-500 shadow-lg">
          💻
        </div>
        <div className="absolute top-1/4 -left-12 w-4 h-4 bg-green-400 rounded-full animate-pulse delay-1000 shadow-lg"></div>
        <div className="absolute bottom-1/4 -right-12 w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-1500 shadow-lg"></div>
        <div className="absolute top-1/3 right-4 w-2 h-2 bg-white/60 rounded-full animate-ping delay-2000"></div>
        <div className="absolute bottom-1/3 left-4 w-1.5 h-1.5 bg-purple-300/80 rounded-full animate-ping delay-3000"></div>
      </div>

      {/* Additional floating particles */}
      <div className="absolute top-10 left-10 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
      <div className="absolute bottom-16 right-20 w-2 h-2 bg-purple-300/50 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-20 right-8 w-1.5 h-1.5 bg-pink-300/60 rounded-full animate-pulse delay-2000"></div>
    </div>
  );
}
