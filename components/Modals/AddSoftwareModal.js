// components/AdminPanel/AddSoftwareModal.js

"use client";

import { useState, useEffect, useRef } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { X, Upload, Trash2, Check, Loader2 } from "lucide-react";
import Image from "next/image";

export default function AddSoftwareModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Food",
    description: "",
    platforms: [],
    tech: "",
    price: "",
    customization: "",
    screenshots: [],
    demoLink: "",
    deployment: "",
    branding: "",
    payment: "",
    gateway: "",
    whatsapp: "",
    multiLanguage: "",
    isActive: true,
  });

  const [isUploading, setIsUploading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => e.key === "Escape" && onClose();
    const handleOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleOutside);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [isOpen, onClose]);

  const handleUploadSuccess = (result) => {
    const url = result?.info?.secure_url;
    if (url && formData.screenshots.length < 3) {
      setFormData((prev) => ({
        ...prev,
        screenshots: [...prev.screenshots, url],
      }));
    }
    setIsUploading(false);
  };

  const removeScreenshot = (index) => {
    setFormData((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));
  };

  const togglePlatform = (platform) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const techArray = formData.tech
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const newProject = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      platforms: formData.platforms,
      tech: techArray,
      price: Number(formData.price) || 0,
      customization: Number(formData.customization) || 0,
      screenshots: formData.screenshots,
      demoLink: formData.demoLink,
      deployment: Number(formData.deployment) || 0,
      branding: Number(formData.branding) || 0,
      payment: Number(formData.payment) || 0,
      gateway: Number(formData.gateway) || 0,
      whatsapp: Number(formData.whatsapp) || 0,
      multiLanguage: Number(formData.multiLanguage) || 0,
      isActive: formData.isActive,
    };

    console.log("New Project Added:", newProject);
    onAdd?.(newProject);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-linear-to-b from-gray-900/95 to-black/95 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-2xl shadow-purple-600/30 p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-black bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Add New Software Project
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-all"
            >
              <X className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Screenshots Upload (Max 3) */}
            <div>
              <label className="block text-lg font-semibold text-gray-300 mb-4">
                Screenshots (Max 3) *
              </label>

              <div className="space-y-4">
                {/* Upload Widget */}
                {formData.screenshots.length < 3 && (
                  <CldUploadWidget
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                    }
                    onSuccess={handleUploadSuccess}
                    onQueuesStart={() => setIsUploading(true)}
                    onQueuesEnd={() => setIsUploading(false)}
                  >
                    {({ open }) => (
                      <div
                        onClick={() => open()}
                        className="border-2 border-dashed border-white/30 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-500/60 hover:bg-white/5 transition-all duration-300"
                      >
                        {isUploading ? (
                          <div className="space-y-4">
                            <Loader2 className="w-12 h-12 mx-auto animate-spin text-blue-400" />
                            <p className="text-white text-lg">Uploading...</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <Upload className="w-14 h-14 mx-auto text-gray-400" />
                            <p className="text-white text-xl font-medium">
                              Click to Upload Screenshot
                            </p>
                            <p className="text-gray-500">
                              {formData.screenshots.length}/3 uploaded • JPG,
                              PNG, WebP
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </CldUploadWidget>
                )}

                {/* Preview Uploaded Screenshots */}
                {formData.screenshots.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {formData.screenshots.map((url, index) => (
                      <div
                        key={index}
                        className="relative group rounded-xl overflow-hidden border-2 border-blue-500/50"
                      >
                        <Image
                          src={url}
                          width={1920}
                          height={1080}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-40 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeScreenshot(index)}
                          className="absolute top-2 right-2 p-2 bg-red-600/90 rounded-lg hover:bg-red-700 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Project Name *"
                required
                minLength={3}
                maxLength={100}
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/60 outline-none"
              />

              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, category: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white outline-none"
              >
                <option value="Food" className="bg-black">
                  Food
                </option>
                <option value="E-commerce" className="bg-black">
                  E-commerce
                </option>
                <option value="Health" className="bg-black">
                  Health
                </option>
                <option value="Education" className="bg-black">
                  Education
                </option>
                <option value="Finance" className="bg-black">
                  Finance
                </option>
                <option value="Social" className="bg-black">
                  Social
                </option>
                <option value="Other" className="bg-black">
                  Other
                </option>
              </select>
            </div>

            {/* Description */}
            <textarea
              placeholder="Project Description (10-500 characters) *"
              required
              minLength={10}
              maxLength={500}
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData((p) => ({ ...p, description: e.target.value }))
              }
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/60 outline-none resize-none"
            />

            {/* Platforms (Checkboxes) */}
            <div>
              <label className="block text-lg font-semibold text-gray-300 mb-4">
                Platforms *
              </label>
              <div className="flex flex-wrap gap-4">
                {["Android", "iOS", "Web", "Desktop"].map((platform) => (
                  <label
                    key={platform}
                    className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={formData.platforms.includes(platform)}
                      onChange={() => togglePlatform(platform)}
                      className="w-5 h-5 accent-blue-500"
                    />
                    <span className="text-white font-medium">{platform}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tech Stack & Demo Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Tech Stack (comma separated) *"
                required
                value={formData.tech}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, tech: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/60 outline-none"
              />

              <input
                type="url"
                placeholder="Demo Link (optional)"
                value={formData.demoLink}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, demoLink: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/60 outline-none"
              />
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <input
                type="number"
                placeholder="Base Price (₹) *"
                required
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, price: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none"
              />

              <input
                type="number"
                placeholder="Customization (₹)"
                min="0"
                value={formData.customization}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, customization: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none"
              />

              <input
                type="number"
                placeholder="Deployment (₹)"
                min="0"
                value={formData.deployment}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, deployment: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none"
              />

              <input
                type="number"
                placeholder="Branding (₹)"
                min="0"
                value={formData.branding}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, branding: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none"
              />

              <input
                type="number"
                placeholder="Payment (₹)"
                min="0"
                value={formData.payment}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, payment: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none"
              />

              <input
                type="number"
                placeholder="Gateway (₹)"
                min="0"
                value={formData.gateway}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, gateway: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none"
              />

              <input
                type="number"
                placeholder="WhatsApp (₹)"
                min="0"
                value={formData.whatsapp}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, whatsapp: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none"
              />

              <input
                type="number"
                placeholder="Multi-Language (₹)"
                min="0"
                value={formData.multiLanguage}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, multiLanguage: e.target.value }))
                }
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/60 outline-none"
              />
            </div>

            {/* Active Status */}
            <label className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-all w-fit">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, isActive: e.target.checked }))
                }
                className="w-5 h-5 accent-green-500"
              />
              <span className="text-white font-medium">Active Project</span>
            </label>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 border border-white/20 rounded-xl text-gray-300 hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-10 py-3 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white flex items-center gap-3 shadow-xl hover:shadow-purple-500/50 transition-all"
              >
                <Check className="w-5 h-5" />
                Add Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}