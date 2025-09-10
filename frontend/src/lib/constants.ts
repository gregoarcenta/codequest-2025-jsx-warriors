// Placeholder images for development
// Replace these with real images in production

export const PLACEHOLDER_IMAGES = {
  hero: "https://picsum.photos/1920/1080",
  featuredArticle: "https://picsum.photos/400/240",
  article: "https://picsum.photos/300/180",
  author: "https://picsum.photos/80/80",
};

// Helper function to generate placeholder images
export function getPlaceholderImage(
  width: number,
  height: number,
  seed?: string | number
): string {
  const baseUrl = "https://picsum.photos";
  const seedParam = seed
    ? `?random=${seed}`
    : `?random=${Math.floor(Math.random() * 1000)}`;
  return `${baseUrl}/${width}/${height}${seedParam}`;
}

// Color scheme for categories
export const CATEGORY_COLORS = {
  Frontend: "bg-blue-500",
  Backend: "bg-green-500",
  Mobile: "bg-purple-500",
  DevOps: "bg-orange-500",
  AI: "bg-pink-500",
  Database: "bg-indigo-500",
  Security: "bg-red-500",
  Tools: "bg-yellow-500",
} as const;
