export default function FrontendArticlesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Artículos de Frontend
          </h1>
          <p className="text-xl text-slate-600 mb-12">
            Descubre las últimas tendencias y mejores prácticas en desarrollo
            frontend.
          </p>

          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">
              Contenido en desarrollo
            </h2>
            <p className="text-slate-500">
              Pronto encontrarás artículos sobre React, Vue, Angular, JavaScript
              y más.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
