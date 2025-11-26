import { X, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function EstimateModal({ onClose }) {
  const [formData, setFormData] = useState({
    productType: "",
    codingLangs: "React, Node, Flutter",
    aboutProduct: "",
    discussionTime: "",
    phone: "",
    email: "",
    whatsapp: "",
    language: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Estimate Request Submitted:", {
      ...formData,
      submittedAt: new Date().toISOString(),
    });
    onClose();

    setTimeout(() => {
      alert("Thank you for requesting an estimate! We will get back to you soon.");
    }, 1000);
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

        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 bg-linear-to-r from-blue-400 via-sky-50  to-teal-600 bg-clip-text">
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
                className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-gray-300 "
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm">
                Required Coding Languages
              </label>
              <input
                type="text"
                name="codingLangs"
                value={formData.codingLangs}
                onChange={handleChange}
                placeholder="React, Node, Flutter"
                className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-gray-300 "
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
                className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
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
                className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
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
                className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm">WhatsApp Number</label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="+91xxxxxxxx"
                className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
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
              className="mt-2 w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-xl text-gray-400"
            />
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white/10 border border-blue-500/30 rounded-2xl text-gray-400 hover:bg-white/20 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-linear-to-r from-blue-600 via-sky-500 to-teal-600 rounded-2xl font-bold text-white shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105 flex items-center gap-2"
            >
              Request Estimate
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
