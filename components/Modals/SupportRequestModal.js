"use client";
import { API_BASE } from "@/lib/api";
import { X, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function SupportRequestModal({ onClose }) {
  const [formData, setFormData] = useState({
    category: "App",
    codeTypes: [], // array for UI toggle
    projectLink: "",
    discussionTime: "",
    language: "English",
  });

  const [loading, setLoading] = useState(false);

  const toggleCodeType = (type) => {
    setFormData((prev) => ({
      ...prev,
      codeTypes: prev.codeTypes.includes(type)
        ? prev.codeTypes.filter((t) => t !== type)
        : [...prev.codeTypes, type],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      category: formData.category,
      projectLink: formData.projectLink.trim(),
      codeTypes: formData.codeTypes, // array bhej rahe hain (schema mein [String] hai)
      language: formData.language,
      discussionTime: formData.discussionTime.trim(),
    };

    try {
      const res = await fetch(`${API_BASE}/technical-maintenance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        alert(
          "Support request submitted successfully! We'll contact you soon."
        );
        onClose();
      } else {
        alert(
          "Error: " + (result.message || "Submission failed. Please try again.")
        );
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
      className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-blue-500/30 rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">
          Technical Maintenance Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-400 text-sm">Type of Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
                className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white focus:outline-none focus:border-blue-400 transition"
              >
                <option className="bg-black">App</option>
                <option className="bg-black">Website</option>
                <option className="bg-black">Backend</option>
                <option className="bg-black">DevOps</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 text-sm block mb-2">
                Code Type (multi-select)
              </label>
              <div className="flex flex-wrap gap-3">
                {["React","Next.js", "Flutter", "JavaScript", "React Native", "Others"].map(
                  (type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleCodeType(type)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                        formData.codeTypes.includes(type)
                          ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg"
                          : "bg-white/10 text-gray-400 border border-blue-500/30"
                      }`}
                    >
                      {type}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-400 text-sm">
                Project Link (URL)
              </label>
              <input
                type="url"
                placeholder="https://yourproject.com"
                value={formData.projectLink}
                onChange={(e) =>
                  setFormData({ ...formData, projectLink: e.target.value })
                }
                required
                className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm">
                Preferred Discussion Time
              </label>
              <input
                type="text"
                placeholder="Wed 4–6 PM"
                value={formData.discussionTime}
                onChange={(e) =>
                  setFormData({ ...formData, discussionTime: e.target.value })
                }
                required
                className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-sm">
              Communication Language
            </label>
            <select
              value={formData.language}
              onChange={(e) =>
                setFormData({ ...formData, language: e.target.value })
              }
              required
              className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white focus:outline-none focus:border-blue-400 transition"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="English + Hindi">English + Hindi</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-8 py-4 bg-white/10 border border-blue-500/30 rounded-2xl text-gray-400 hover:bg-white/20 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || formData.codeTypes.length === 0}
              className="px-10 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 rounded-2xl font-bold text-white shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Submitting..."
              ) : (
                <>
                  Submit Request
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
