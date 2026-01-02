// File: app/admin/bookings/productsbuying-requests/page.js
// Admin List Page – All Buy Product Enquiries

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, User, IndianRupee, AlertCircle } from "lucide-react";
import { API_BASE } from "@/lib/api";

export default function AdminBuyProductEnquire() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await fetch(`${API_BASE}/buy-enquiries`);
        const data = await res.json();
        if (data.success) {
          setEnquiries(data.data);
        } else {
          setError("Failed to load buy enquiries");
        }
      } catch (err) {
        setError("Network error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "In Review":
        return "bg-blue-500/10 border-blue-500/20 text-blue-400";
      case "Contacted":
        return "bg-cyan-500/10 border-cyan-500/20 text-cyan-400";
      case "Quoted":
        return "bg-purple-500/10 border-purple-500/20 text-purple-400";
      case "Closed":
        return "bg-green-500/10 border-green-500/20 text-green-400";
      default:
        return "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"; // Pending
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block size-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-xl">Loading buy enquiries...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-400 text-xl">
        {error}
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enquiries.map((enq) => (
          <div
            key={enq._id}
            className="relative bg-linear-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-hidden hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {enq.name}
                  </h3>
                  <p className="text-sm text-gray-400 truncate">
                    {enq.productName}
                  </p>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(
                    enq.status
                  )}`}
                >
                  {enq.status}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <User className="size-4 text-blue-400" />
                <span className="text-sm text-gray-300">{enq.contact}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IndianRupee className="size-5 text-green-400" />
                  <span className="text-lg font-bold text-white">
                    ₹{enq.finalTotal.toLocaleString()}
                  </span>
                </div>
                {enq.selectedAddons.length > 0 && (
                  <span className="text-xs text-purple-400">
                    + {enq.selectedAddons.length} Addons
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="size-4" />
                <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
              </div>

              <button
                onClick={() =>
                  router.push(
                    `/admin/bookings/productsbuying-requests/${enq._id}`
                  )
                }
                className="w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {enquiries.length === 0 && (
        <div className="text-center text-gray-400 mt-12">
          <AlertCircle className="size-12 mx-auto mb-4" />
          <p>No buy enquiries found</p>
        </div>
      )}
    </>
  );
}
