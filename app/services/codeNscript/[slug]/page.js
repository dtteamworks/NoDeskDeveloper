"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  PlayCircle,
  Copy,
  Smartphone,
  Monitor,
  Check,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useINRConverter from "@/utils/currencyConverter";

// Hardcoded sample data since no backend
const sampleProducts = {
  "example-script": {
    _id: "1",
    slug: "example-script",
    name: "Example Code Name",
    images: [
      "https://images.pexels.com/photos/45980/pexels-photo-45980.jpeg",
      "https://images.pexels.com/photos/5661241/pexels-photo-5661241.jpeg",
      "https://images.pexels.com/photos/30399211/pexels-photo-30399211.jpeg",
      "https://images.pexels.com/photos/5833316/pexels-photo-5833316.jpeg",
    ],
    codeLanguages: ["Python", "JavaScript", "Node.js"],
    codeLink: "https://github.com/example/code",
    codePreview: "https://preview.example.com",
    previousLink: "https://previous.example.com",
    clientSideRequirements: "Modern browser, Node.js v18+, Internet connection",
    installationType: ["Web", "Android"],
    basePrice: 1500,
    additionalCharges: {
      installation: 500,
      customization: 2000,
      branding: 1000,
      paymentGatewayIntegration: 1500,
      deployment: 800,
      cloudSetup: 1200,
      playConsoleUpload: 300,
      iosConsoleUpload: 400,
    },
    description: "A versatile script for automation tasks.",
  },
  "another-script": {
    _id: "2",
    slug: "another-script",
    name: "Another Code Name",
    images: [
      "https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg",
      "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg",
      "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg",
    ],

    codeLanguages: ["Java", "Kotlin"],
    codeLink: "https://github.com/example/another",
    codePreview: "https://preview.another.com",
    previousLink: "https://previous.another.com",
    clientSideRequirements: "Android SDK, Java 17+",
    installationType: ["Android", "iOS"],
    basePrice: 2500,
    additionalCharges: {
      installation: 700,
      customization: 3000,
      branding: 1500,
      paymentGatewayIntegration: 2000,
      deployment: 1000,
      cloudSetup: 1500,
      playConsoleUpload: 500,
      iosConsoleUpload: 600,
    },
    description: "Mobile app script for e-commerce.",
  },
};

export default function CodeNScriptDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0);
  const { convertINR } = useINRConverter();

  // Form & Addons State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    description: "",
    availableTime: "",
  });
  const [addons, setAddons] = useState({
    installation: false,
    customization: false,
    branding: false,
    paymentGatewayIntegration: false,
    deployment: false,
    cloudSetup: false,
    playConsoleUpload: false,
    iosConsoleUpload: false,
  });

  useEffect(() => {
    if (!slug) return;

    // Simulate fetch with hardcoded data
    const foundProduct = sampleProducts[slug];
    if (foundProduct) {
      setProduct(foundProduct);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-xl font-semibold text-blue-400 animate-pulse">
          Loading Script...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center flex-col gap-4">
        <p className="text-lg text-red-400 font-semibold">Script Not Found</p>
        <Link
          href="/services/codeNscript"
          className="px-6 py-2.5 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
        >
          Back to Scripts
        </Link>
      </div>
    );
  }

  // Pricing Calculations
  const basePrice = Number(product.basePrice) || 0;

  const addonsList = [
    {
      key: "installation",
      label: "Installation",
      cost: Number(product.additionalCharges.installation) || 0,
    },
    {
      key: "customization",
      label: "Customization",
      cost: Number(product.additionalCharges.customization) || 0,
    },
    {
      key: "branding",
      label: "Branding",
      cost: Number(product.additionalCharges.branding) || 0,
    },
    {
      key: "paymentGatewayIntegration",
      label: "Payment Gateway Integration",
      cost: Number(product.additionalCharges.paymentGatewayIntegration) || 0,
    },
    {
      key: "deployment",
      label: "Deployment",
      cost: Number(product.additionalCharges.deployment) || 0,
    },
    {
      key: "cloudSetup",
      label: "Cloud Setup",
      cost: Number(product.additionalCharges.cloudSetup) || 0,
    },
    {
      key: "playConsoleUpload",
      label: "Play Console Upload",
      cost: Number(product.additionalCharges.playConsoleUpload) || 0,
    },
    {
      key: "iosConsoleUpload",
      label: "iOS Console Upload",
      cost: Number(product.additionalCharges.iosConsoleUpload) || 0,
    },
  ];

  const selectedAddons = addonsList.filter((a) => addons[a.key]);
  const addonsTotal = selectedAddons.reduce((acc, a) => acc + a.cost, 0);
  const serviceFee = (basePrice + addonsTotal) * 0.05;
  const total = basePrice + addonsTotal + serviceFee;

  const handleCopyQuote = () => {
    let quote = `${product.name}\nBase Price: ${convertINR(
      basePrice.toLocaleString()
    )}`;

    if (selectedAddons.length > 0) {
      quote += `\n\nSelected Additional Charges:`;
      selectedAddons.forEach((addon) => {
        quote += `\n• ${addon.label}: ${convertINR(
          addon.cost.toLocaleString()
        )}`;
      });
      quote += `\n\nAdditional Total: ${convertINR(
        Math.round(addonsTotal).toLocaleString()
      )}`;
    }

    quote += `\nService Fee (5%): ${convertINR(
      Math.round(serviceFee).toLocaleString()
    )}`;
    quote += `\n\nTotal Amount: ${convertINR(
      Math.round(total).toLocaleString()
    )}`;

    navigator.clipboard.writeText(quote);
    alert("Quote copied to clipboard!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Name, Phone, and Email are required!");
      return;
    }

    // Skip backend submit, just simulate success
    alert("Request sent successfully! We will contact you soon.");

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      description: "",
      availableTime: "",
    });
    setAddons({
      installation: false,
      customization: false,
      branding: false,
      paymentGatewayIntegration: false,
      deployment: false,
      cloudSetup: false,
      playConsoleUpload: false,
      iosConsoleUpload: false,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1380px] mx-auto">
        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
          {/* Header */}
          <div className="relative bg-linear-to-r from-blue-900/30 to-purple-900/30 p-6 border-b border-slate-800">
            <h1 className="text-3xl font-extrabold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {product.name}
            </h1>

            <Link
              href="/services/codeNscript"
              className="absolute top-[28%] hidden right-10 text-xs border border-white/20 px-3 py-2.5 md:inline-flex items-center gap-2 text-white hover:text-white transition-all duration-200 ease-in bg-linear-to-tl from-slate-900 via-slate-700 to-slate-600 rounded-full shadow-lg shadow-slate-900/50 hover:shadow-xl hover:shadow-slate-900/60"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Scripts
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 p-6">
            {/* Left Side */}
            <div className="space-y-4 border-b pb-8 sm:pb-0 md:border-b-0 border-white/20">
              {/* Main Image */}
              <div className="relative group">
                <Image
                  src={product.images[mainImage]}
                  width={1920}
                  height={1080}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-xl border border-slate-800 shadow-lg"
                />
              </div>

              {/* Thumbnail Grid (up to 3) */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {product.images.slice(0, 3).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setMainImage(i)}
                      className={`relative w-full h-20 rounded-lg overflow-hidden border-2 transition ${
                        mainImage === i
                          ? "border-blue-500"
                          : "border-slate-700 hover:border-slate-600"
                      }`}
                    >
                      <Image
                        src={img}
                        width={1920}
                        height={1080}
                        alt={`Thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Links/Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                {product.codeLink && (
                  <a
                    href={product.codeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-xl text-sm text-white transition-all"
                  >
                    <LinkIcon className="w-4 h-4" /> Code Link
                  </a>
                )}
                {product.codePreview && (
                  <a
                    href={product.codePreview}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-xl text-sm text-white transition-all"
                  >
                    <PlayCircle className="w-4 h-4" /> Code Preview
                  </a>
                )}
                {product.previousLink && (
                  <a
                    href={product.previousLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-xl text-sm text-white transition-all"
                  >
                    <LinkIcon className="w-4 h-4" /> Previous Link
                  </a>
                )}
              </div>

              {/* Installation Types */}
              <div className="flex flex-wrap gap-2">
                {product.installationType?.map((p) => (
                  <span
                    key={p}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 rounded-lg border border-slate-700 text-[10px] sm:text-xs font-medium"
                  >
                    {p === "Web" ? (
                      <Monitor className="w-3.5 h-3.5" />
                    ) : (
                      <Smartphone className="w-3.5 h-3.5" />
                    )}
                    {p}
                  </span>
                ))}
              </div>

              {/* Code Languages */}
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(product.codeLanguages)
                  ? product.codeLanguages
                  : product.codeLanguages?.split(",") || []
                ).map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-slate-800/60 rounded-md text-xs border border-slate-700/50"
                  >
                    {t.trim()}
                  </span>
                ))}
              </div>

              {/* Client Side Requirements */}
              <div className="pt-4 border-t border-slate-700/50">
                <p className="text-xs text-slate-400 mb-1">
                  Client Side Requirements:
                </p>
                <p className="text-sm text-slate-300">
                  {product.clientSideRequirements}
                </p>
              </div>

              {/* Description */}
              <div className="border mt-6 p-4 pr-px py-2 text-sm border-white/20 rounded-xl">
                <div
                  className="max-h-110 prodfeatures overflow-y-scroll prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-2 [&_strong]:text-white [&_em]:italic [&_a]:text-blue-400 [&_a]:underline"
                  dangerouslySetInnerHTML={{
                    __html: product.description || "",
                  }}
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="space-y-6">
              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-800/70 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm"
                />
                <input
                  type="tel"
                  placeholder="Phone *"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-800/70 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-800/70 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm"
                />
                <textarea
                  placeholder="Description (optional)"
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-800/70 border border-slate-700 rounded-lg resize-none focus:outline-none focus:border-blue-500 transition text-sm"
                />
                <input
                  type="text"
                  placeholder="Available Time (e.g., 10 AM - 2 PM)"
                  value={formData.availableTime}
                  onChange={(e) =>
                    setFormData({ ...formData, availableTime: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-800/70 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 transition text-sm"
                />
              </form>

              {/* Pricing Card */}
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                <h3 className="text-lg font-bold mb-4">Installation Charges</h3>

                {/* Addons Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {addonsList.map((item) => (
                    <label
                      key={item.key}
                      className={`flex items-center gap-2 cursor-pointer p-2.5 rounded-lg border transition ${
                        addons[item.key]
                          ? "bg-purple-500/20 border-purple-500"
                          : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={addons[item.key]}
                        onChange={(e) =>
                          setAddons({ ...addons, [item.key]: e.target.checked })
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition ${
                          addons[item.key]
                            ? "bg-purple-500 border-purple-500"
                            : "border-slate-600"
                        }`}
                      >
                        {addons[item.key] && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-xs text-slate-300 flex-1">
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Selected Addons List */}
                {selectedAddons.length > 0 && (
                  <div className="mb-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                    <p className="text-xs font-semibold text-slate-400 mb-2">
                      Selected Charges:
                    </p>
                    <div className="space-y-1.5">
                      {selectedAddons.map((addon) => (
                        <div
                          key={addon.key}
                          className="flex justify-between text-xs"
                        >
                          <span className="text-slate-300">{addon.label}</span>
                          <span className="font-medium text-white">
                            {convertINR(addon.cost.toLocaleString())}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="space-y-2.5 pt-4 border-t border-slate-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Base Price</span>
                    <span className="font-semibold text-white">
                      {convertINR(basePrice.toLocaleString())}
                    </span>
                  </div>
                  {selectedAddons.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Additional Total</span>
                      <span className="font-semibold text-white">
                        {convertINR(addonsTotal.toLocaleString())}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Service Fee (5%)</span>
                    <span className="text-white">
                      {convertINR(Math.round(serviceFee).toLocaleString())}
                    </span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-3 border-t border-slate-600">
                    <span>Total</span>
                    <span className="text-purple-400">
                      {convertINR(Math.round(total).toLocaleString())}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-5">
                  <button
                    type="button"
                    onClick={handleCopyQuote}
                    className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition text-sm"
                  >
                    Copy Quote
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 py-2.5 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-medium shadow-lg transition text-sm"
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
