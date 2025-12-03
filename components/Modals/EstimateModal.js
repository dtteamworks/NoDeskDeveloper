// EstimateModal.jsx
import { X, ArrowRight } from "lucide-react";
import { useState } from "react";

// Backend URL
const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://nodeskdevbackend.onrender.com/api";

export default function EstimateModal({ onClose }) {
  const [formData, setFormData] = useState({
    productType: "",
    codingLangs: "", // comma-separated string from input
    aboutProduct: "",
    discussionTime: "",
    phone: "",
    email: "",
    whatsapp: "",
    language: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Convert comma-separated coding languages into array
    const codingLangsArray = formData.codingLangs
      .split(",")
      .map((lang) => lang.trim())
      .filter((lang) => lang.length > 0);

    if (codingLangsArray.length === 0) {
      alert("Please enter at least one coding language (comma separated).");
      setLoading(false);
      return;
    }

    const payload = {
      productType: formData.productType.trim(),
      codingLangs: codingLangsArray, // array bhej rahe hain (schema mein [String])
      aboutProduct: formData.aboutProduct.trim(),
      discussionTime: formData.discussionTime.trim(),
      phone: formData.phone.trim(),
      email: formData.email.toLowerCase().trim(),
      whatsapp: formData.whatsapp.trim(),
      language: formData.language.trim() || "English",
    };

    try {
      const res = await fetch(`${API_BASE}/project-estimation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Thank you for requesting an estimate! We will get back to you soon.");
        onClose();
      } else {
        alert("Error: " + (result.message || "Submission failed. Please try again."));
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Network error! Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 text-sm bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-linear-to-br from-gray-900 via-black to-gray-900 border border-blue-500/30 rounded-3xl p-8 max-w-3xl w-full shadow-2xl overflow-y-auto max-h-screen"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 bg-linear-to-r from-blue-400 via-sky-500 to-teal-600 bg-clip-text">
          Project Estimations
        </h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-400 text-sm">Type of Product</label>
              <input
                type="text"
                name="productType"
                value={formData.productType}
                placeholder="Mobile App"
                onChange={handleChange}
                required
                className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-gray-300 focus:outline-none focus:border-blue-400 transition"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm">
                Required Coding Languages <span className="text-xs">(comma separated)</span>
              </label>
              <input
                type="text"
                name="codingLangs"
                value={formData.codingLangs}
                onChange={handleChange}
                placeholder="React, Node.js, Flutter"
                required
                className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-gray-300 focus:outline-none focus:border-blue-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-sm">About Product</label>
            <textarea
              name="aboutProduct"
              rows="3"
              placeholder="Brief description of features/scope"
              value={formData.aboutProduct}
              onChange={handleChange}
              required
              className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-400 text-sm">
                On-Call Discussion Time
              </label>
              <input
                type="text"
                name="discussionTime"
                value={formData.discussionTime}
                onChange={handleChange}
                required
                className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Please fill in this field."
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-400 text-sm">Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm">WhatsApp Number</label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-sm">
              Communication Language
            </label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              placeholder="English / Hindi / Bengali"
              required
              className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-gray-300 focus:outline-none focus:border-blue-400 transition"
            />
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 bg-white/10 border border-blue-500/30 rounded-2xl text-gray-400 hover:bg-white/20 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-linear-to-r from-blue-600 via-sky-500 to-teal-600 rounded-2xl font-bold text-white shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : (
                <>
                  Request Estimate
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}