import { useState } from "react";
import { X, Monitor, Smartphone, Copy, PlayCircle, Play } from "lucide-react";

export const ProductDialogBox = ({ product, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });

  const [addons, setAddons] = useState({
    deployment: false,
    branding: false,
    payment: false,
    gateway: false,
    customFields: false,
    multiLanguage: false,
    whatsapp: false,
  });

  if (!isOpen) return null;

  const basePrice = product.price;

  // Calculate addon costs from product data
  const addonsList = [
    {
      key: "deployment",
      label: "Installation & Deployment",
      cost: product.deployment || 0,
    },
    {
      key: "branding",
      label: "Branding (logo/colors)",
      cost: product.branding || 0,
    },
    { key: "payment", label: "Payment Gateway", cost: product.payment || 0 },
    {
      key: "gateway",
      label: "Admin Custom Fields",
      cost: product.gateway || 0,
    },
    {
      key: "multiLanguage",
      label: "Multi-language",
      cost: product.multiLanguage || 0,
    },
    {
      key: "whatsapp",
      label: "WhatsApp Integration",
      cost: product.whatsapp || 0,
    },
  ];

  const selectedAddons = addonsList.filter((addon) => addons[addon.key]);
  const addonsTotal = selectedAddons.reduce(
    (sum, addon) => sum + addon.cost,
    0
  );
  const hasSelectedAddons = selectedAddons.length > 0;

  const serviceFee = (basePrice + addonsTotal) * 0.05;
  const total = basePrice + addonsTotal + serviceFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Demo Request Submitted:", {
      product: product.name,
      client: formData,
      selectedAddons: selectedAddons.map((a) => ({
        name: a.label,
        cost: a.cost,
      })),
      pricing: {
        base: basePrice,
        addonsTotal: Math.round(addonsTotal),
        serviceFee: Math.round(serviceFee),
        estimatedTotal: Math.round(total),
      },
    });
    alert("Request sent! Check console for details.");
  };

  const handleCopyQuote = () => {
    const quote = `${product.name}\nBase: ₹${basePrice}\nAdd-ons: ₹${Math.round(
      addonsTotal
    )}\nTotal: ₹${Math.round(total)}`;
    navigator.clipboard.writeText(quote);
    alert("Quote copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-slate-700">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-xl transition"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 p-6 overflow-y-auto max-h-[75vh]">
          {/* Left Side - Product Info */}
          <div className="space-y-6">
            <img
              key={"jj"}
              src={product.screenshots[0]}
              alt=""
              className="rounded-xl object-cover w-full h-52 bg-slate-800"
            />

            <div className="grid grid-cols-3 gap-3">
              {product.screenshots.slice(0, 3).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="rounded-xl object-cover h-32 bg-slate-800"
                />
              ))}
            </div>

            <div className="flex gap-2 flex-wrap">
              {product.platforms.map((p) => (
                <span
                  key={p}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg text-xs text-slate-300"
                >
                  {p === "Web" ? (
                    <Monitor className="w-4 h-4" />
                  ) : (
                    <Smartphone className="w-4 h-4" />
                  )}
                  {p}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {(Array.isArray(product.tech)
                ? product.tech
                : product.tech?.split(", ") || []
              ).map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1.5 bg-slate-800/70 rounded-md text-slate-400"
                >
                  {t.trim()}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href={product.demoLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
              >
                <PlayCircle className="w-5 h-5" /> Open Demo
              </a>
              <button
                onClick={handleCopyQuote}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium"
              >
                <Copy className="w-5 h-5" /> Copy Quote
              </button>
            </div>
          </div>

          {/* Right Side - Form + Quick Quote */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Email / Phone"
                required
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
              <textarea
                placeholder="Tell us about your use case..."
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
              />
            </form>

            <div className="space-y-4 bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
              <h3 className="font-bold text-lg text-white">
                Customize Your Package
              </h3>

              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { key: "deployment", label: "Installation & Deployment" },
                  { key: "branding", label: "Branding (logo/colors)" },
                  { key: "payment", label: "Payment Gateway" },
                  { key: "gateway", label: "Admin Custom Fields" },
                  { key: "multiLanguage", label: "Multi-language" },
                  { key: "whatsapp", label: "WhatsApp Integration" },
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={addons[item.key]}
                      onChange={(e) =>
                        setAddons({ ...addons, [item.key]: e.target.checked })
                      }
                      className="w-4 h-4 rounded accent-purple-500"
                    />
                    <span className="text-slate-300">{item.label}</span>
                  </label>
                ))}
              </div>

              {hasSelectedAddons && (
                <div className="space-y-3 pt-4 border-t border-slate-700">
                  <h4 className="text-sm font-semibold text-slate-300">
                    Selected Add-ons:
                  </h4>
                  {selectedAddons.map((addon) => (
                    <div
                      key={addon.key}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-slate-400">{addon.label}</span>
                      <span className="text-white font-medium">
                        ₹{addon.cost.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2 pt-4 border-t border-slate-700">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Base Price</span>
                  <span className="text-white font-medium">
                    ₹{basePrice.toLocaleString()}
                  </span>
                </div>
                {hasSelectedAddons && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Add-ons Total</span>
                    <span className="text-white font-medium">
                      ₹{Math.round(addonsTotal).toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Service Fee (5%)</span>
                  <span className="text-white font-medium">
                    ₹{Math.round(serviceFee).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-slate-600">
                  <span className="text-white">Estimated Total</span>
                  <span className="text-purple-400">
                    ₹{Math.round(total).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCopyQuote}
                  type="button"
                  className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold text-white transition"
                >
                  Copy Quote
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-white shadow-lg shadow-purple-500/30 transition"
                >
                  Request Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
