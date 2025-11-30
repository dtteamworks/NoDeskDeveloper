// app/softwares-readymade/[id]/page.js

"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, PlayCircle, Copy, Smartphone, Monitor } from "lucide-react";
import Link from "next/link";
import { API_BASE } from "@/lib/api";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form & Addons State
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });
  const [addons, setAddons] = useState({
    deployment: false,
    branding: false,
    payment: false,
    gateway: false,
    customFields: false,
    multiLanguage: false,
    whatsapp: false,
  });

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        // YEHI SAHI URL HAI TERE BACKEND KE HISAB SE
        const res = await fetch(`${API_BASE}/project/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const result = await res.json();
        
        // Tera backend response format → { success: true, data: {...} }
        if (result.success && result.data) {
          setProduct(result.data);
        } else {
          throw new Error("Invalid response");
        }
      } catch (err) {
        console.error("Product fetch error:", err);
        setProduct(null); // trigger not found
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-3xl font-bold text-blue-400 animate-pulse">Loading Product...</p>
    </div>
    );
  }

  // Not Found / Error State
  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center flex-col gap-6">
        <p className="text-2xl text-red-400 font-bold">Product Not Found</p>
        <Link href="/softwares-readymade" className="px-8 py-4 bg-blue-600 rounded-xl hover:bg-blue-700 transition font-semibold">
          Back to Apps
        </Link>
      </div>
    );
  }

  // Pricing Calculations
  const basePrice = Number(product.price) || 0;

  const addonsList = [
    { key: "deployment", label: "Installation & Deployment", cost: Number(product.deployment) || 0 },
    { key: "branding", label: "Branding (logo/colors)", cost: Number(product.branding) || 0 },
    { key: "payment", label: "Payment Gateway", cost: Number(product.payment) || 0 },
    { key: "gateway", label: "Admin Custom Fields", cost: Number(product.gateway) || 0 },
    { key: "multiLanguage", label: "Multi-language", cost: Number(product.multiLanguage) || 0 },
    { key: "whatsapp", label: "WhatsApp Integration", cost: Number(product.whatsapp) || 0 },
  ];

  const selectedAddons = addonsList.filter(a => addons[a.key]);
  const addonsTotal = selectedAddons.reduce((acc, a) => acc + a.cost, 0);
  const serviceFee = (basePrice + addonsTotal) * 0.05;
  const total = basePrice + addonsTotal + serviceFee; // 100% defined

  const handleCopyQuote = () => {
    const quote = `${product.name}\nBase Price: ₹${basePrice.toLocaleString()}\nAdd-ons: ₹${Math.round(addonsTotal).toLocaleString()}\nService Fee (5%): ₹${Math.round(serviceFee).toLocaleString()}\nTotal: ₹${Math.round(total).toLocaleString()}`;
    navigator.clipboard.writeText(quote);
    alert("Quote copied to clipboard!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Request sent successfully! We will contact you soon.");
    // Yahan backend call bhi laga sakte hain baad mein
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-20 px-6">
      <div className=" mx-auto">
        

        <div className="bg-slate-900 rounded-3xl max-w-6xl mx-auto overflow-hidden border border-slate-700 shadow-2xl">
          <div className="bg-linear-to-r from-blue-900/40 to-purple-900/40 p-10 border-b border-slate-700">
            <h1 className="text-xl md:text-6xl font-black bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {product.name}
            </h1>
            <p className="mt-4 text-sm text-gray-300 max-w-3xl">{product.description}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 p-8 md:p-12">
            {/* Left Side */}
            <div className="space-y-8">
              <img src={product.screenshots[0]} alt={product.name} className="w-full h-96 object-cover rounded-2xl border border-slate-700 shadow-xl" />
              <div className="grid grid-cols-3 gap-4">
                {product.screenshots.slice(0, 4).map((img, i) => (
                  <img key={i} src={img} alt="" className="w-full h-40 object-cover rounded-xl border border-slate-700 hover:border-blue-500 transition" />
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {product.platforms?.map(p => (
                  <span key={p} className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 rounded-xl border border-slate-700 text-sm font-medium">
                    {p === "Web" ? <Monitor className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
                    {p}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {(Array.isArray(product.tech) ? product.tech : product.tech?.split(",") || []).map(t => (
                  <span key={t} className="px-4 py-2 bg-slate-800/70 rounded-lg text-sm border border-slate-700">
                    {t.trim()}
                  </span>
                ))}
              </div>

              <div className="flex gap-8 pt-4">
                {product.demoLink && (
                  <a href={product.demoLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-blue-400 hover:text-blue-300 font-bold text-lg">
                    <PlayCircle className="w-7 h-7" /> Open Live Demo
                  </a>
                )}
                <button onClick={handleCopyQuote} className="flex items-center gap-3 text-purple-400 hover:text-purple-300 font-bold text-lg">
                  <Copy className="w-6 h-6" /> Copy Quote
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" placeholder="Your Name *" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-6 py-4 bg-slate-800/70 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 transition" />
                <input type="text" placeholder="Email or Phone *" required value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} className="w-full px-6 py-4 bg-slate-800/70 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 transition" />
                <textarea placeholder="Tell us about your project (optional)" rows={5} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full px-6 py-4 bg-slate-800/70 border border-slate-700 rounded-xl resize-none focus:outline-none focus:border-blue-500 transition" />
              </form>

              <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                <h3 className="text-2xl font-bold mb-6">Customize Your Package</h3>
                <div className="space-y-4">
                  {addonsList.map(item => (
                    <label key={item.key} className="flex items-center justify-between cursor-pointer py-2">
                      <span className="text-slate-300">{item.label}</span>
                      <input type="checkbox" checked={addons[item.key]} onChange={e => setAddons({ ...addons, [item.key]: e.target.checked })} className="w-5 h-5 rounded accent-purple-500" />
                    </label>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t-2 border-slate-700 space-y-4">
                  <div className="flex justify-between text-lg"><span className="text-slate-400">Base Price</span><span className="font-bold text-white">₹{basePrice.toLocaleString()}</span></div>
                  {selectedAddons.length > 0 && <div className="flex justify-between text-lg"><span className="text-slate-400">Add-ons Total</span><span className="font-bold text-white">₹{addonsTotal.toLocaleString()}</span></div>}
                  <div className="flex justify-between text-lg"><span className="text-slate-400">Service Fee (5%)</span><span className="text-white">₹{Math.round(serviceFee).toLocaleString()}</span></div>
                  <div className="flex justify-between text-3xl font-black pt-6 border-t-2 border-slate-600">
                    <span>Total Amount</span>
                    <span className="text-purple-400">₹{Math.round(total).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button type="button" onClick={handleCopyQuote} className="flex-1 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold transition">Copy Quote</button>
                  <button onClick={handleSubmit} className="flex-1 py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold shadow-lg transition">Send Request</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}