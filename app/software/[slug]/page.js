import { API_BASE } from "@/lib/api";
import ProductDetailBySlug from "@/components/ReadyMadeProduct/ProductDetailBySlug";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const res = await fetch(`${API_BASE}/project/slug/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { title: "Product Not Found" };
    }

    const { success, data: product } = await res.json();

    if (!success || !product) {
      return { title: "Product Not Found" };
    }

    const title = `${product?.name} - Ready Made App`;
    const description = product.description
      .replace(/<[^>]*>/g, "")
      .slice(0, 150) || "Production-ready app";

    const ogImage = product.screenshots?.[0] || "/productImage.webp";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [ogImage],
        url: `https://www.nodeskdeveloper.com/software/${slug}`,
        siteName: "Nodesk Developer",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  } catch (error) {
    return { title: "Loading..." };
  }
}

// Optional: Build time pre-render (agar chahte ho sab products static generate ho)
export async function generateStaticParams() {
  const res = await fetch(`${API_BASE}/projects`);
  const { data: products } = await res.json();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage() {
  return <ProductDetailBySlug />;
}