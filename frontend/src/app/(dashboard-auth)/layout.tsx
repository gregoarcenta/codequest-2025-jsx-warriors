"use client";
import Image from "next/image";

export default function DashboardAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
      <div className="flex min-h-screen">
        {/* Left Side - Branding and Content */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
          {/* Background grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M40 40V20H20V0H0v40z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>

          {/* Top Section - Profile and Info */}
          <div className="relative z-10">
            {/* Profile Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-white/20">
                  <Image
                    src="/DEVTALLES-LOGO-CIRCULO.png"
                    alt="DevTalles Logo"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">DevTalles</h2>
                  <p className="text-purple-200 text-sm">
                    Panel de administración
                  </p>
                </div>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                Gestiona el contenido del blog
              </h1>
              <p className="text-purple-200 text-base leading-relaxed max-w-md">
                Administra tu contenido y comunidad desde un solo lugar
              </p>
            </div>
          </div>

          {/* Middle Section - Features */}
          <div className="relative z-10 space-y-6">
            {/* Feature 1 */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">
                  Gestión de artículos
                </h3>
                <p className="text-purple-200 text-sm">
                  Crea y edita contenido para tu blog
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">
                  Estadísticas del blog
                </h3>
                <p className="text-purple-200 text-sm">
                  Visualiza el rendimiento de tus publicaciones
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">
                  Gestión de usuarios
                </h3>
                <p className="text-purple-200 text-sm">
                  Administra tu comunidad y suscriptores
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright */}
          <div className="relative z-10">
            <p className="text-purple-300 text-xs">
              © 2025 DevTalles - Plataforma de gestión. Todos los derechos
              reservados.
            </p>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
