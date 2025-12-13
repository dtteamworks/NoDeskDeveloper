"use client";
import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import CodeNScriptCard from "./CodeNScriptCard";
import { API_BASE } from "@/lib/api";

const categories = [
  "All",
  "Automation",
  "Finance",
  "Education",
  "Healthcare",
  "Social",
  "Other",
];

export default function CodeNScriptInstallationComponent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/code-n-script-cards`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.data || []);
        } else {
          console.error("Failed to fetch products:", data.message);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);  

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.productType === selectedCategory;
      const matchesSearch =
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(p.codeLanguages) &&
          p.codeLanguages.some((t) =>
            t.toLowerCase().includes(searchTerm.toLowerCase())
          ));

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);
//  ======================================================== //
//  =================== Loading Skeleton =================== //
//  ======================================================== //
  if (loading) {
    return (
      <div className=" text-white pt-24 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero skeleton */}
          <div className="text-center mb-8 md:mb-12 space-y-4">
            <div className="h-12 md:h-16 bg-gray-800 rounded-2xl w-3/4 mx-auto animate-pulse" />
            <div className="h-6 md:h-8 bg-gray-800 rounded-xl w-1/2 max-w-2xl mx-auto animate-pulse" />
          </div>

          {/* Filter bar skeleton */}
          <div className="bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-5 md:p-6 space-y-6">
            <div className="flex flex-wrap gap-3">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-20 bg-white/10 rounded-full animate-pulse"
                />
              ))}
            </div>
            <div className="relative">
              <div className="h-10 bg-white/10 rounded-xl animate-pulse" />
            </div>
          </div>

          {/* Showing count skeleton */}
          <div className="my-6 ml-3">
            <div className="h-6 w-48 bg-gray-700 rounded-lg animate-pulse" />
          </div>

          {/* Product cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-blue-500/20 animate-pulse"
              >
                <div className="h-40 bg-gray-800" />
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <div className="h-5 bg-gray-700 rounded-lg w-2/3" />
                    <div className="h-5 bg-gray-700 rounded-full w-14 " />
                  </div>
                  <div className="h-4 bg-gray-700 rounded w-full" />
                  <div className="flex gap-2">
                    {[...Array(3)].map((_, j) => (
                      <div
                        key={j}
                        className="h-5 w-16 bg-gray-700 rounded-lg"
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, k) => (
                      <div
                        key={k}
                        className="h-5 w-20 bg-gray-700 rounded-md"
                      />
                    ))}
                  </div>
                  <div className="pt-4 border-t border-gray-700 space-y-3">
                    <div className="h-5 bg-gray-700 rounded-lg" />
                    <div className="h-5 bg-gray-700 rounded-lg" />
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 flex-1 bg-gray-700 rounded-xl" />
                    <div className="h-6 flex-1 bg-gray-700 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white pt-24 pb-24 px-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-[29px] sm:text-4xl md:text-6xl font-black tracking-tighter bg-linear-to-r from-blue-600 via-sky-500 to-teal-400 bg-clip-text text-transparent leading-tight">
            Code & Script Installation
          </h1>
          <p className="mt-1 text-sm md:text-lg font-medium text-blue-300/90 max-w-4xl mx-auto leading-relaxed">
            Professional installation & configuration for web and mobile
            applications
          </p>
        </div>

        <div className="mb-4 bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-5 md:p-6">
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full font-semibold text-[11px] md:text-sm transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-linear-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/50"
                    : "bg-white/5 text-blue-300 hover:bg-white/10 border border-blue-500/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/70" />
            <input
              type="text"
              placeholder="Search by name, languages, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 text-xs md:text-sm pr-6 py-3.5 bg-white/5 border border-blue-500/30 rounded-2xl text-white placeholder-blue-400/60 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
          </div>
        </div>

        <div className="mb-12 ml-3 text-blue-300/70 text-sm font-medium">
          Showing{" "}
          <span className="text-white font-bold">
            {filteredProducts.length}
          </span>{" "}
          scripts
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <CodeNScriptCard key={product._id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-32">
            <div className="text-6xl font-black bg-linear-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
              No Scripts Found
            </div>
            <p className="text-xl text-blue-300 mt-6">
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}