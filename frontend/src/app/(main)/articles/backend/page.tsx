export default function BackendArticlesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Artículos de Backend
          </h1>
          <p className="text-xl text-slate-600 mb-12">
            Aprende sobre arquitecturas de servidor, bases de datos, APIs y más.
          </p>

          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">
              Contenido en desarrollo
            </h2>
            <p className="text-slate-500">
              Pronto encontrarás artículos sobre Node.js, Python, .NET, bases de
              datos y arquitectura de software.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
