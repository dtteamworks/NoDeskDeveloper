"use client";
import { Share2, Monitor, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useINRConverter from "@/utils/currencyConverter";

export default function CodeNScriptCard({ product }) {
  const router = useRouter();
  const { convertINR, loading } = useINRConverter();

  const shareProduct = async (product) => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.description?.replace(/<[^>]*>/g, "").slice(0, 50),
        url: `https://www.nodeskdeveloper.com/services/codeNscript/${product.slug}`,
      });
    } else {
      alert(`Share ${product.name}`);
    }
  };

  return (
    <div onClick={() => router.push(`/services/codeNscript/${product.slug}`)} className="group relative bg-linear-to-br from-slate-900/90 via-blue-900/50 to-slate-900/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 cursor-pointer" >
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/5 group-hover:to-blue-500/10 transition-all duration-700 pointer-events-none" />

      <div className="relative h-60 overflow-hidden bg-slate-800/50">
        <Image src={product.images?.[0] || "/productImage.webp"} alt={product.name} width={1920} height={1080} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            shareProduct(product);
          }}
          className="absolute top-4 cursor-pointer right-4 p-2.5 bg-slate-800/80 backdrop-blur-md rounded-xl hover:bg-slate-700/80 transition-all duration-300 hover:scale-110 hover:rotate-12 border border-slate-600/50"
        >
          <Share2 className="w-4 h-4 text-slate-200" />
        </button>
      </div>

      <div className="p-6 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl text-left font-bold text-white leading-tight line-clamp-1 flex-1">
            {product.name}
          </h3>
          <span className="text-xs font-semibold px-3 py-1 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-300 border border-blue-400/30 whitespace-nowrap">
            {product.productType}
          </span>
        </div>

        <p className="text-slate-300 text-left truncate text-xs leading-relaxed line-clamp-1" dangerouslySetInnerHTML={{ __html: product.description || "" }} />

        <div className="flex items-center gap-2">
          {product.installationType?.map((type) => (
            <div key={type} className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/50 rounded-lg border border-slate-700/50" >
              {type === "Web" ? ( <Monitor className="size-3.5 text-slate-400" /> ) : ( <Smartphone className="size-3.5 text-slate-400" /> )}
              <span className="text-[10px] text-slate-400 font-medium">{type}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(Array.isArray(product.codeLanguages) ? product.codeLanguages : product.codeLanguages?.split(", ") || [] ).slice(0, 4).map((lang) => (
              <span key={lang} className="text-[11px] tracking-wide px-2 py-1 bg-slate-800/60 text-slate-300 rounded-md border border-slate-700/50" >{lang}</span>
            ))}
          {product.codeLanguages.length > 4 && (
            <span className="text-xs px-2 py-1 bg-slate-800/60 text-slate-300 rounded-md border border-slate-700/50">
              +{product.codeLanguages.length - 4}
            </span>
          )}
        </div>

        <div className="pt-4 border-t border-slate-700/50 space-y-2">
          <div className="flex justify-between items-center flex-col w-full *:w-full *:flex *:justify-between *:items-center space-y-1">
            <div>
              <p className="text-base text-slate-400 mb-0.5">Base Price</p>
              <p className="text-2xl font-black text-white">
                {loading ? "......." : convertINR(product.basePrice?.toLocaleString()) || 0} </p>
            </div>
            {/* <div className="text-right">
              <p className="text-xs text-slate-400 mb-0.5">Additional Charges</p>
              <p className="text-sm font-bold text-slate-300">
                + {loading ? "......." : convertINR( Object.values(product.additionalCharges).reduce((a, b) => a + b, 0).toLocaleString()) || 0}
              </p>
            </div> */}
          </div>
        </div>

        <button onClick={() => router.push(`/services/codeNscript/${product?.slug}`)} className="border border-white/20 mt-2 bg-linear-to-r from-violet-500  to-purple-600 font-semibold w-full px-5 py-2 rounded-xl" >
          View Details
        </button>
      </div>
    </div>
  );
}
