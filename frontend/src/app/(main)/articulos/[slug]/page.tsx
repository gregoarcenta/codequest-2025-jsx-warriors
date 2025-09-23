import { Metadata } from "next";
import ArticleHero from "@/components/articulos/article-hero";
import ArticleContent from "@/components/articulos/article-content";
import CommentSection from "@/components/articulos/comment-section";
import SimilarArticles from "@/components/articulos/similar-articles";

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/";
    const resp = await fetch(
      `${apiUrl}/posts/published/${slug}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!resp.ok) {
      console.error(
        `Error fetching metadata for slug: ${slug}, status: ${resp.status}`,
        apiUrl,
        resp
      );
      return {
        title: "Artículo no encontrado",
        description: "El artículo que buscas no está disponible",
      };
    }

    const post = await resp.json();

    return {
      title: post.title,
      description: post.title, // No hay description en la API, usamos title
      openGraph: {
        title: post.title,
        description: post.title,
        images: post.coverImageUrl ? [post.coverImageUrl] : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.title,
        images: post.coverImageUrl ? [post.coverImageUrl] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "DevTalles Blog",
      description: "Artículo del blog de DevTalles",
    };
  }
}

export default async function ArticlesSlugPage({ params }: Props) {
  // Obtener datos del post para pasar a los componentes
  const { slug } = await params;
  let postData = null;

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const resp = await fetch(`${apiUrl}/posts/published/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (resp.ok) {
      postData = await resp.json();
    }
  } catch (error) {
    console.error("Error fetching post data:", error);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section with Image */}
      <ArticleHero slug={slug} />

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <ArticleContent slug={slug} />

              {/* Sidebar - Similar Articles */}
              <SimilarArticles
                currentPostId={postData?.id || ""}
                categoryId={postData?.category?.id}
              />
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
                <CommentSection postId={postData?.id || ""} />
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
