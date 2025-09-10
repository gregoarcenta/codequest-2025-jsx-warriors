export default function MobileArticlesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Desarrollo Móvil
          </h1>
          <p className="text-xl text-slate-600 mb-12">
            Todo lo que necesitas saber sobre desarrollo de aplicaciones
            móviles.
          </p>

          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">
              Contenido en desarrollo
            </h2>
            <p className="text-slate-500">
              Pronto encontrarás artículos sobre React Native, Flutter, Swift,
              Kotlin y más.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
