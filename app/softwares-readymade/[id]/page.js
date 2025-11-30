// app/softwares-readymade/[id]/page.js

"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";
import { ProductDialogBox } from "@/components/DialogBoxes/ProductDioalogBox";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/project/${id}`, { cache: "no-store" });
        const result = await res.json();
        if (result.success) {
          setProduct(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-3xl text-blue-400 font-bold animate-pulse">Loading Product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-2xl text-red-400">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/softwares-readymade" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition">
          <ArrowLeft className="w-5 h-5" />
          Back to All Apps
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black bg-linear-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {product.name}
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-4xl mx-auto">
            {product.description}
          </p>
        </div>

        {/* Main Content – Reuse your beautiful ProductDialogBox as full page */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <ProductDialogBox product={product} isOpen={true} onClose={() => {}} />
        </div>

        {/* Demo Link */}
        {product.demoLink && (
          <div className="text-center mt-10">
            <a
              href={product.demoLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white text-lg hover:scale-105 transition shadow-lg"
            >
              <ExternalLink className="w-6 h-6" />
              Open Live Demo
            </a>
          </div>
        )}
      </div>
    </div>
  );
}