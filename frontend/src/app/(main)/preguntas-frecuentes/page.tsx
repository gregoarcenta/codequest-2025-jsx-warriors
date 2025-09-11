export default function PreguntaFrecuentePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-xl text-slate-600 mb-12">
            Aquí encontrarás respuestas a las preguntas más comunes sobre
            nuestros servicios.
          </p>

          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">
              Preguntas en construcción
            </h2>
            <p className="text-slate-500">
              Pronto tendrás acceso a nuestras preguntas frecuentes completas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
