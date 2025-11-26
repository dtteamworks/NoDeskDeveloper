import { X, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ReportIssueModal({ onClose }) {
  const [formData, setFormData] = useState({
    productType: "App",
    codingLang: "",
    issueDesc: "",
    productUrl: "",
    fullName: "",
    language: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Issue Reported:", {
      ...formData,
      submittedAt: new Date().toISOString(),
    });
    onClose();

    setTimeout(() => {
      alert("Thank you for reporting the issue! Our team will get back to you soon.");
    }, 1000);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className="relative bg-linear-to-br from-gray-900 via-black to-gray-900 border border-purple-500/30 rounded-3xl p-8 max-w-3xl w-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6  rounded-full bg-white/10 hover:bg-white/20 transition p-2"
          >
            <X className="size-6 text-gray-400" />
          </button>

          <h2 className="text-2xl font-bold text-white mb-8 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text">
            Errors Fixing
          </h2>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-400 text-sm">Type of Product</label>
                <select
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  className="mt-2 w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 transition"
                >
                  <option>App</option>
                  <option>Website</option>
                  <option>Backend API</option>
                  <option>DevOps</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm">
                  Coding Language Used
                </label>
                <input
                  type="text"
                  name="codingLang"
                  placeholder="PHP / Flutter / JS"
                  value={formData.codingLang}
                  onChange={handleChange}
                  className="mt-2 w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-sm">
                Describe the Issue
              </label>
              <textarea
                name="issueDesc"
                rows="3"
                placeholder="Briefly explain the problem..."
                value={formData.issueDesc}
                onChange={handleChange}
                required
                className="mt-2 w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-400 text-sm">Product URL</label>
                <input
                  type="url"
                  name="productUrl"
                  placeholder="https://..."
                  value={formData.productUrl}
                  onChange={handleChange}
                  className="mt-2 w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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
                  className="mt-2 w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-gray-400"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 "
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-sm">Email ID</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition"
              />
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-4 bg-white/10 border border-purple-500/30 rounded-2xl text-gray-400 hover:bg-white/20 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-10 py-4 bg-linear-to-r from-blue-600 via-sky-600 to-teal-700 rounded-2xl font-bold text-white shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105 flex items-center gap-2"
              >
                Submit
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
