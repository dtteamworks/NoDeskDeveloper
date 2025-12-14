"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, Trash2, CheckCircle, ExternalLink, Eye, FileCode, Package, Image as ImageIcon, Clock, Tag, Banknote } from "lucide-react";
import { API_BASE } from "@/lib/api";

export default function AdminCodeNscriptEnquiryDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const res = await fetch(`${API_BASE}/code-n-script-enquiry/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setEnquiry(data.data);
        setStatus(data.data.status);
      } catch (err) {
        alert("Enquiry not found");
        router.push("/admin/bookings/codeNscriptEnquiries");
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiry();
  }, [id, router]);

  const handleUpdate = async () => {
    if (status === enquiry.status) return;
    setUpdating(true);
    try {
      const res = await fetch(`${API_BASE}/code-n-script-enquiry/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setEnquiry(prev => ({ ...prev, status }));
        alert("Status updated successfully!");
      }
    } catch (err) {
      alert("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this enquiry permanently?")) return;
    setDeleting(true);
    try {
      await fetch(`${API_BASE}/code-n-script-enquiry/${id}`, { method: "DELETE" });
      alert("Deleted successfully");
      router.push("/admin/bookings/codeNscriptEnquiries");
    } catch (err) {
      alert("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto p-6 lg:p-10">
        {/* Header */}
        <div className="mb-8">
         

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{enquiry.name || "Untitled Script"}</h1>
              <p className="text-gray-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Submitted on {new Date(enquiry.createdAt).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <span
              className={`shrink-0 self-start sm:self-center px-4 py-2 rounded-full text-sm font-medium ${
                enquiry.status === "Pending"
                  ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                  : enquiry.status === "Scheduled"
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : enquiry.status === "Completed"
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {enquiry.status}
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pricing Card */}
            <div className="bg-linear-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Banknote className="w-5 h-5 text-red-500" />
                Pricing Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
                  <p className="text-sm text-gray-400 mb-1">Base Price</p>
                  <p className="text-2xl font-bold text-white">₹{enquiry.basePrice}</p>
                </div>
                <div className="bg-linear-to-br from-red-500/10 to-red-600/10 rounded-xl p-4 border border-red-500/20">
                  <p className="text-sm text-gray-400 mb-1">Total Price</p>
                  <p className="text-2xl font-bold text-red-400">₹{enquiry.totalPrice || enquiry.basePrice}</p>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="bg-linear-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FileCode className="w-5 h-5 text-red-500" />
                Technical Specifications
              </h2>
              <div className="space-y-4">
                {enquiry.codeLanguages && enquiry.codeLanguages.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Languages</p>
                    <div className="flex flex-wrap gap-2">
                      {enquiry.codeLanguages.map((lang, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-zinc-800 text-sm text-gray-200 rounded-lg border border-zinc-700"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {enquiry.installationType && enquiry.installationType.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Installation Type</p>
                    <div className="flex flex-wrap gap-2">
                      {enquiry.installationType.map((type, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-red-500/10 text-sm text-red-400 rounded-lg border border-red-500/20"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {enquiry.description && (
              <div className="bg-linear-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Description</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{enquiry.description}</p>
              </div>
            )}

            {/* Images Gallery */}
            {enquiry.images && enquiry.images.length > 0 && (
              <div className="bg-linear-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-red-500" />
                  Attachments ({enquiry.images.length})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {enquiry.images.map((img, idx) => (
                    <a
                      key={idx}
                      href={img}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-square rounded-lg overflow-hidden border border-zinc-700 hover:border-red-500/50 transition-all"
                    >
                      <img
                        src={img}
                        alt={`Attachment ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ExternalLink className="w-6 h-6 text-white" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Actions & Links */}
          <div className="space-y-6">
            {/* Status Update Card */}
            <div className="bg-linear-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Update Status</h2>
              <div className="space-y-3">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                >
                  <option>Pending</option>
                  <option>Scheduled</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>

                <button
                  onClick={handleUpdate}
                  disabled={updating || status === enquiry.status}
                  className="w-full px-4 py-3 bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 rounded-xl font-medium text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-500/20"
                >
                  {updating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <CheckCircle className="w-5 h-5" />
                  )}
                  {updating ? "Updating..." : "Update Status"}
                </button>
              </div>
            </div>

            {/* Links Card */}
            {(enquiry.codeLink || enquiry.codePreview || enquiry.previousLink) && (
              <div className="bg-linear-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
                <div className="space-y-2">
                  {enquiry.codeLink && (
                    <a
                      href={enquiry.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg border border-zinc-700 hover:border-red-500/50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                        <FileCode className="w-5 h-5 text-red-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">Source Code</p>
                        <p className="text-xs text-gray-400 truncate">View repository</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                    </a>
                  )}

                  {enquiry.codePreview && (
                    <a
                      href={enquiry.codePreview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg border border-zinc-700 hover:border-red-500/50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                        <Eye className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">Live Preview</p>
                        <p className="text-xs text-gray-400 truncate">View demo</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </a>
                  )}

                  {enquiry.previousLink && (
                    <a
                      href={enquiry.previousLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg border border-zinc-700 hover:border-red-500/50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                        <Package className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">Previous Work</p>
                        <p className="text-xs text-gray-400 truncate">View reference</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Danger Zone */}
            <div className="bg-linear-to-br from-red-950/20 to-black border border-red-900/30 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h2>
              <p className="text-sm text-gray-400 mb-4">This action cannot be undone</p>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="w-full px-4 py-3 bg-red-600/20 hover:bg-red-600 border border-red-600/30 hover:border-red-600 rounded-xl font-medium text-red-400 hover:text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {deleting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Trash2 className="w-5 h-5" />
                )}
                {deleting ? "Deleting..." : "Delete Enquiry"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}