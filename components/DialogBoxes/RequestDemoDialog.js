import { X } from "lucide-react";
import { useState } from "react";

export const RequestDemoDialog = ({ product, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    preferredLanguage: "",
    availabilityTime: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Validation
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.projectType ||
      !formData.preferredLanguage ||
      !formData.availabilityTime
    ) {
      alert("Please fill all required fields");
      return;
    }

    console.log("Demo Request Details:", {
      ...formData,
      productName: product?.name,
      productId: product?.id,
    });

    setTimeout(() => {
      alert("Thank you! Your demo request has been submitted successfully.");
    }, 1000);

    setFormData({
      name: "",
      phone: "",
      email: "",
      projectType: "",
      preferredLanguage: "",
      availabilityTime: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 blur-xl backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full min-w-5xl max-w-md bg-linear-to-br from-slate-900 via-gray-900/50 to-gray-900 border border-blue-500/30 rounded-3xl shadow-2xl shadow-blue-500/20 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 border-b border-slate-700/50">
          <h2 className="text-2xl font-bold text-white">Request Demo</h2>
          <p className="text-sm text-slate-400 mt-1">
            {product?.name || "Product Demo"}
          </p>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-slate-800 hover:bg-slate-700/50 rounded-xl transition-all duration-300 hover:rotate-90"
          >
            <X className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {/* Name */}
          <div className="flex justify-between gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="Enter your name"
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Email */}
          <div className="flex justify-between gap-4">
           
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="Enter your email"
            />

          {/* Project Type */}
        
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="">Select project type</option>
              <option value="website">Website</option>
              <option value="mobile-app">Mobile App</option>
              <option value="both">Both (Website & Mobile App)</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Preferred Language */}
          <div className="flex justify-between gap-4">
           
            <select
              name="preferredLanguage"
              value={formData.preferredLanguage}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="">Select language</option>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="hinglish">Hinglish</option>
            </select>

          {/* Availability Time */}
            
            <select
              name="availabilityTime"
              value={formData.availabilityTime}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="">Select time slot</option>
              <option value="morning">Morning (9 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
              <option value="evening">Evening (4 PM - 8 PM)</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full   group mt-6 mx-auto "
          >
            <div className="w-fit relative cursor-pointer mx-auto overflow-hidden px-8 py-3.5 bg-linear-to-r from-blue-600 via-sky-600 to-teal-600 hover:from-blue-500 hover:to-sky-500 rounded-xl font-bold text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95">

            <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Submit Request</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
