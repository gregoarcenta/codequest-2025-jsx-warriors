import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarDays,
  User,
  Heart,
  Eye,
  MessageSquare,
  Share2,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Send,
} from "lucide-react";

// Mock data para el artículo individual
const mockArticle = {
  id: "1",
  title:
    "Guía Completa de React 19: Las Nuevas Características que Debes Conocer",
  description:
    "Descubre todas las nuevas características de React 19, incluyendo Server Components, mejoras en el manejo del estado y optimizaciones de rendimiento que revolucionarán tu forma de desarrollar.",
  category: "Frontend",
  author: "Fernando Herrera",
  publishDate: "2025-01-08",
  image: "https://picsum.photos/1200/600?random=50",
  likes: 245,
  views: 3420,
  comments: 38,
  content: `
    <p>React 19 marca un hito importante en la evolución de esta popular biblioteca de JavaScript. En esta guía completa, exploraremos todas las nuevas características y mejoras que hacen de React 19 una actualización revolucionaria para el desarrollo frontend moderno.</p>

    <h2>Server Components: El Futuro del Renderizado</h2>
    
    <p>Los Server Components representan una de las características más innovadoras de React 19. Esta tecnología permite renderizar componentes en el servidor, reduciendo significativamente el tamaño del bundle del cliente y mejorando los tiempos de carga.</p>
    
    <h3>Ventajas de los Server Components</h3>
    <ul>
      <li><strong>Reducción del bundle size:</strong> Los componentes se procesan en el servidor, eliminando código JavaScript del cliente</li>
      <li><strong>Mejor SEO:</strong> El contenido se renderiza completamente en el servidor</li>
      <li><strong>Acceso directo a datos:</strong> Pueden acceder directamente a bases de datos y APIs sin exposición al cliente</li>
      <li><strong>Mejor rendimiento:</strong> Menos JavaScript que ejecutar en el navegador</li>
    </ul>

    <pre><code>// Ejemplo de Server Component
import { db } from './db';

async function UserProfile({ userId }) {
  // Esto se ejecuta en el servidor
  const user = await db.user.findUnique({ where: { id: userId } });
  
  return (
    &lt;div className="user-profile"&gt;
      &lt;h1&gt;{user.name}&lt;/h1&gt;
      &lt;p&gt;{user.email}&lt;/p&gt;
    &lt;/div&gt;
  );
}</code></pre>

    <h2>Mejoras en el Manejo del Estado</h2>
    
    <p>React 19 introduce nuevas APIs que simplifican significativamente el manejo del estado, especialmente en aplicaciones complejas con múltiples componentes que necesitan compartir datos.</p>

    <h3>Hook useTransition Mejorado</h3>
    <p>El hook <code>useTransition</code> ha sido optimizado para proporcionar mejor control sobre las actualizaciones de estado que pueden causar interrupciones en la interfaz de usuario:</p>

    <pre><code>import { useTransition, useState } from 'react';

function SearchResults() {
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    startTransition(() => {
      // Esta actualización no bloqueará la UI
      setResults(performExpensiveSearch(term));
    });
  };

  return (
    &lt;div&gt;
      &lt;input onChange={(e) => handleSearch(e.target.value)} /&gt;
      {isPending && &lt;div&gt;Buscando...&lt;/div&gt;}
      &lt;ResultsList results={results} /&gt;
    &lt;/div&gt;
  );
}</code></pre>

    <h2>Optimizaciones de Rendimiento</h2>
    
    <p>Las optimizaciones de rendimiento en React 19 son impresionantes y abarcan múltiples áreas del framework:</p>

    <h3>Compilador React</h3>
    <p>React 19 introduce un nuevo compilador que analiza automáticamente tu código y aplica optimizaciones sin intervención manual:</p>

    <blockquote>
      <p>"El compilador de React elimina la necesidad de memorización manual en la mayoría de los casos, haciendo que el código sea más limpio y eficiente por defecto." - Equipo de React</p>
    </blockquote>

    <h3>Concurrent Features</h3>
    <p>Las características concurrentes permiten que React interrumpa el renderizado para manejar actualizaciones más urgentes:</p>

    <ul>
      <li><strong>Time Slicing:</strong> Divide el trabajo de renderizado en pequeños fragmentos</li>
      <li><strong>Selective Hydration:</strong> Hidrata componentes según la prioridad del usuario</li>
      <li><strong>Suspense for Data Fetching:</strong> Manejo elegante de estados de carga</li>
    </ul>

    <h2>Nuevas APIs y Hooks</h2>

    <h3>useFormStatus</h3>
    <p>Un nuevo hook para manejar el estado de formularios de manera más eficiente:</p>

    <pre><code>import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    &lt;button type="submit" disabled={pending}&gt;
      {pending ? 'Enviando...' : 'Enviar'}
    &lt;/button&gt;
  );
}</code></pre>

    <h3>use() Hook</h3>
    <p>El nuevo hook <code>use()</code> simplifica el consumo de promesas y contextos:</p>

    <pre><code>import { use } from 'react';

function UserComponent({ userPromise }) {
  const user = use(userPromise);
  
  return &lt;div&gt;Bienvenido, {user.name}!&lt;/div&gt;;
}</code></pre>

    <h2>Migración y Compatibilidad</h2>
    
    <p>React 19 mantiene un alto nivel de compatibilidad con versiones anteriores, pero hay algunos cambios importantes a considerar:</p>

    <h3>Cambios Breaking</h3>
    <ol>
      <li><strong>Eliminación de propTypes:</strong> Se recomienda migrar a TypeScript</li>
      <li><strong>Nuevos warnings:</strong> Algunos patrones obsoletos ahora generan advertencias</li>
      <li><strong>StrictMode más estricto:</strong> Detecta más problemas potenciales</li>
    </ol>

    <h3>Herramientas de Migración</h3>
    <p>React proporciona herramientas automáticas para facilitar la migración:</p>

    <pre><code>npx react-codemod@latest strict-mode ./src</code></pre>

    <h2>Conclusión</h2>
    
    <p>React 19 representa un salto significativo en la evolución del framework, con mejoras sustanciales en rendimiento, developer experience y capacidades del servidor. Las nuevas características como Server Components y el compilador automático prometen revolucionar la forma en que desarrollamos aplicaciones React.</p>

    <p>Te recomendamos comenzar a experimentar con estas nuevas características en proyectos pequeños antes de adoptarlas en aplicaciones de producción. La comunidad de React está desarrollando activamente recursos y herramientas para facilitar la transición.</p>

    <p><em>¿Tienes alguna pregunta sobre React 19? ¡Déjala en los comentarios y la responderemos!</em></p>
  `,
};

// Mock data para comentarios
const mockComments = [
  {
    id: "1",
    user: "Carlos Mendoza",
    avatar: "https://picsum.photos/40/40?random=1",
    content:
      "Excelente artículo! React 19 realmente está revolucionando el desarrollo frontend. Me gustó especialmente la parte de Server Components.",
    timestamp: "2025-01-09T10:30:00Z",
    likes: 12,
    dislikes: 1,
    replies: [
      {
        id: "1-1",
        user: "Ana García",
        avatar: "https://picsum.photos/40/40?random=2",
        content:
          "Totalmente de acuerdo! Los Server Components van a cambiar todo.",
        timestamp: "2025-01-09T11:15:00Z",
        likes: 5,
        dislikes: 0,
      },
      {
        id: "1-2",
        user: "Miguel Torres",
        avatar: "https://picsum.photos/40/40?random=3",
        content:
          "¿Alguien ya ha probado implementar Server Components en producción?",
        timestamp: "2025-01-09T12:00:00Z",
        likes: 3,
        dislikes: 0,
      },
    ],
  },
  {
    id: "2",
    user: "Laura Jiménez",
    avatar: "https://picsum.photos/40/40?random=4",
    content:
      "Me encanta cómo explicas los conceptos complejos de manera sencilla. ¿Podrías hacer un tutorial práctico sobre las optimizaciones de rendimiento?",
    timestamp: "2025-01-09T14:20:00Z",
    likes: 8,
    dislikes: 0,
    replies: [],
  },
  {
    id: "3",
    user: "Roberto Silva",
    avatar: "https://picsum.photos/40/40?random=5",
    content:
      "Muy buen contenido. Una pregunta: ¿estas nuevas características son retrocompatibles con versiones anteriores de React?",
    timestamp: "2025-01-09T16:45:00Z",
    likes: 6,
    dislikes: 0,
    replies: [
      {
        id: "3-1",
        user: "Fernando Herrera",
        avatar: "https://picsum.photos/40/40?random=6",
        content:
          "¡Excelente pregunta! React 19 mantiene gran parte de la retrocompatibilidad, aunque hay algunos cambios menores que requieren migración.",
        timestamp: "2025-01-09T17:30:00Z",
        likes: 15,
        dislikes: 0,
      },
    ],
  },
];

// Mock data para artículos similares
const mockSimilarArticles = [
  {
    id: "2",
    title: "Next.js 14: Guía Completa de App Router y Server Actions",
    category: "Frontend",
    image: "https://picsum.photos/300/200?random=10",
    author: "Carlos Azaustre",
    publishDate: "2025-01-05",
    likes: 189,
    views: 2340,
    comments: 24,
  },
  {
    id: "3",
    title: "TypeScript Avanzado: Tipos Condicionales y Mapped Types",
    category: "Frontend",
    image: "https://picsum.photos/300/200?random=11",
    author: "Midudev",
    publishDate: "2025-01-03",
    likes: 156,
    views: 1890,
    comments: 18,
  },
  {
    id: "4",
    title: "Tailwind CSS: Técnicas Avanzadas y Mejores Prácticas",
    category: "CSS",
    image: "https://picsum.photos/300/200?random=12",
    author: "Fernando Herrera",
    publishDate: "2024-12-28",
    likes: 203,
    views: 2780,
    comments: 31,
  },
  {
    id: "5",
    title: "Estado Global en React: Zustand vs Redux Toolkit",
    category: "Frontend",
    image: "https://picsum.photos/300/200?random=13",
    author: "Fazt",
    publishDate: "2024-12-25",
    likes: 178,
    views: 2150,
    comments: 22,
  },
];

// Function to calculate time ago
const getTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "hace 1 día";
  if (diffDays < 7) return `hace ${diffDays} días`;
  if (diffDays < 30) return `hace ${Math.floor(diffDays / 7)} semanas`;
  if (diffDays < 365) return `hace ${Math.floor(diffDays / 30)} meses`;
  return `hace ${Math.floor(diffDays / 365)} años`;
};

export default function ArticlesSlugPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section with Image */}
      <section className="relative h-[50vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={mockArticle.image}
            alt={mockArticle.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-xl dark:bg-slate-900 mb-8">
                  <CardContent className="p-8 md:p-12">
                    {/* Article Header */}
                    <div className="mb-8">
                      <Badge className="bg-purple-600 hover:bg-purple-700 text-white mb-4">
                        {mockArticle.category}
                      </Badge>

                      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                        {mockArticle.title}
                      </h1>

                      <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                        {mockArticle.description}
                      </p>

                      {/* Author and Date Info */}
                      <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">
                            {mockArticle.author}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>
                            {new Date(
                              mockArticle.publishDate
                            ).toLocaleDateString("es-ES", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="text-purple-600 font-medium">
                          {getTimeAgo(mockArticle.publishDate)}
                        </div>
                      </div>

                      {/* Stats and Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span className="font-medium">
                              {mockArticle.likes}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <Eye className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">
                              {mockArticle.views}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <MessageSquare className="h-4 w-4 text-green-500" />
                            <span className="font-medium">
                              {mockArticle.comments}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-300 dark:border-slate-600"
                          >
                            <Bookmark className="h-4 w-4 mr-2" />
                            Guardar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-300 dark:border-slate-600"
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Compartir
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-xl dark:prose-invert max-w-none">
                      <div
                        className="text-slate-700 dark:text-slate-300 leading-relaxed article-content"
                        dangerouslySetInnerHTML={{
                          __html: mockArticle.content,
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - Similar Articles */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <Card className="border-0 shadow-xl dark:bg-slate-900">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                        Artículos Similares
                      </h3>
                      <div className="space-y-4">
                        {mockSimilarArticles.map((article) => (
                          <Link
                            key={article.id}
                            href={`/articulos/${String(article.title)
                              .toLowerCase()
                              .replace(/\s+/g, "-")
                              .replace(/[^a-z0-9\-]/g, "")}`}
                            className="block group"
                          >
                            <div className="flex gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                                <Image
                                  src={article.image}
                                  alt={article.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <Badge
                                  variant="secondary"
                                  className="text-xs mb-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                                >
                                  {article.category}
                                </Badge>
                                <h4 className="font-medium text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                  {article.title}
                                </h4>
                                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                                  <span className="flex items-center gap-1">
                                    <Heart className="h-3 w-3 text-red-400" />
                                    {article.likes}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Eye className="h-3 w-3 text-blue-400" />
                                    {article.views}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <Link href="/articulos">
                          <Button
                            variant="outline"
                            className="w-full border-slate-300 dark:border-slate-600 hover:bg-purple-50 hover:border-purple-300 dark:hover:bg-purple-900/20"
                          >
                            Ver todos los artículos
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-xl dark:bg-slate-900">
                  <CardContent className="p-8 md:p-12">
                    <div className="space-y-8">
                      {/* Comments Header */}
                      <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                          Comentarios (
                          {mockComments.length +
                            mockComments.reduce(
                              (acc, comment) => acc + comment.replies.length,
                              0
                            )}
                          )
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                          Únete a la conversación y comparte tus ideas
                        </p>
                      </div>

                      {/* Add Comment Form */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                          Agregar comentario
                        </h3>
                        <div className="flex gap-4">
                          <Avatar className="h-10 w-10 flex-shrink-0">
                            <AvatarImage src="https://picsum.photos/40/40?random=user" />
                            <AvatarFallback className="bg-purple-100 text-purple-600">
                              TU
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-3">
                            <Textarea
                              placeholder="¿Qué opinas sobre este artículo?"
                              className="min-h-[100px] resize-none border-slate-300 dark:border-slate-600"
                            />
                            <div className="flex justify-end">
                              <Button className="bg-purple-600 hover:bg-purple-700">
                                <Send className="h-4 w-4 mr-2" />
                                Publicar comentario
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Comments List */}
                      <div className="space-y-8">
                        {mockComments.map((comment) => (
                          <div key={comment.id} className="space-y-4">
                            {/* Main Comment */}
                            <div className="flex gap-4 group">
                              <Avatar className="h-10 w-10 flex-shrink-0">
                                <AvatarImage src={comment.avatar} />
                                <AvatarFallback className="bg-slate-100 text-slate-600">
                                  {comment.user.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-3">
                                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-semibold text-slate-900 dark:text-white">
                                      {comment.user}
                                    </h4>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                      {getTimeAgo(comment.timestamp)}
                                    </span>
                                  </div>
                                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                    {comment.content}
                                  </p>
                                </div>

                                {/* Comment Actions */}
                                <div className="flex items-center gap-4 text-sm">
                                  <button className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                    <ThumbsUp className="h-4 w-4" />
                                    <span>{comment.likes}</span>
                                  </button>
                                  <button className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                    <ThumbsDown className="h-4 w-4" />
                                    <span>{comment.dislikes}</span>
                                  </button>
                                  <button className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                    <Reply className="h-4 w-4" />
                                    <span>Responder</span>
                                  </button>
                                </div>

                                {/* Replies */}
                                {comment.replies.length > 0 && (
                                  <div className="ml-6 space-y-4 border-l-2 border-slate-200 dark:border-slate-700 pl-6">
                                    {comment.replies.map((reply) => (
                                      <div
                                        key={reply.id}
                                        className="flex gap-4"
                                      >
                                        <Avatar className="h-8 w-8 flex-shrink-0">
                                          <AvatarImage src={reply.avatar} />
                                          <AvatarFallback className="bg-slate-100 text-slate-600 text-xs">
                                            {reply.user.charAt(0)}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-2">
                                          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                              <h5 className="font-medium text-slate-900 dark:text-white text-sm">
                                                {reply.user}
                                              </h5>
                                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                                {getTimeAgo(reply.timestamp)}
                                              </span>
                                            </div>
                                            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                                              {reply.content}
                                            </p>
                                          </div>

                                          {/* Reply Actions */}
                                          <div className="flex items-center gap-3 text-xs">
                                            <button className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                              <ThumbsUp className="h-3 w-3" />
                                              <span>{reply.likes}</span>
                                            </button>
                                            <button className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                              <ThumbsDown className="h-3 w-3" />
                                              <span>{reply.dislikes}</span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}

                                    {/* Reply Form */}
                                    <div className="flex gap-3">
                                      <Avatar className="h-8 w-8 flex-shrink-0">
                                        <AvatarImage src="https://picsum.photos/40/40?random=user" />
                                        <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                                          TU
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1 flex gap-2">
                                        <Input
                                          placeholder="Escribe una respuesta..."
                                          className="flex-1 h-8 text-sm"
                                        />
                                        <Button
                                          size="sm"
                                          className="bg-purple-600 hover:bg-purple-700 h-8 px-3"
                                        >
                                          <Send className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-1">
                {/* Espacio vacío para mantener el layout */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
