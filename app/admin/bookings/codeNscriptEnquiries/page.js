"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, Calendar, Package, User, Mail, 
  IndianRupee, Code2, MonitorSmartphone, LayoutGrid 
} from "lucide-react";
import { API_BASE } from "@/lib/api";

// --- Skeleton Component for Loading State ---
const SkeletonCard = () => (
  <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-5 animate-pulse">
    <div className="flex justify-between items-start">
      <div className="space-y-2 flex-1">
        <div className="h-5 bg-zinc-800 rounded w-3/4" />
        <div className="h-4 bg-zinc-800 rounded w-1/2" />
      </div>
      <div className="h-6 bg-zinc-800 rounded-full w-20" />
    </div>
    <div className="h-px bg-zinc-800 w-full" />
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex justify-between">
          <div className="h-4 bg-zinc-800 rounded w-20" />
          <div className="h-4 bg-zinc-800 rounded w-24" />
        </div>
      ))}
    </div>
    <div className="h-12 bg-zinc-800 rounded-xl w-full" />
  </div>
);

export default function AdminCodeNscriptEnquiryPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await fetch(`${API_BASE}/code-n-script-enquiries`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEnquiries(data.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-red-500/30">
      <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : enquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-zinc-900 rounded-3xl">
            <div className="w-20 h-20 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6">
              <Package className="w-10 h-10 text-zinc-700" />
            </div>
            <h3 className="text-xl font-medium text-white">No enquiries found</h3>
            <p className="text-zinc-500 mt-2">New requests will appear here automatically.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enquiries.map((enq) => (
              <div
                key={enq._id}
                className="group relative bg-zinc-900/40 border border-zinc-800/50 rounded-2xl overflow-hidden hover:bg-red-500/30 hover:border-red-500/40 transition-all duration-500 flex flex-col"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="p-6 flex flex-col flex-1">
                  {/* Status & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-zinc-500 font-bold">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-tight bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {enq.status || "New"}
                    </span>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                    {enq.name}
                  </h3>
                  
                  {/* Client Info */}
                  <div className="mt-4 space-y-2 bg-black/20 p-3 rounded-xl border border-zinc-800/30">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-zinc-500" />
                      <span className="text-zinc-300 font-medium truncate">{enq.clientName || "Unknown Client"}</span>
                    </div>
                  </div>

                  {/* Info List */}
                  <div className="mt-6 space-y-4 flex-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-zinc-500">
                        <IndianRupee className="w-4 h-4" />
                        <span>Grand Total</span>
                      </div>
                      <span className="text-white font-bold text-base">
                        ₹{enq.grandTotal?.toLocaleString() || enq.basePrice?.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-zinc-500">
                        <Code2 className="w-4 h-4" />
                        <span>Languages</span>
                      </div>
                      <div className="flex gap-1 overflow-hidden">
                        {enq.codeLanguages?.slice(0, 2).map((l, i) => (
                          <span key={i} className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">
                            {l}
                          </span>
                        ))}
                        {enq.codeLanguages?.length > 2 && <span className="text-[10px] text-zinc-600">+{enq.codeLanguages.length - 2}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-zinc-500">
                        <MonitorSmartphone className="w-4 h-4" />
                        <span>Platform</span>
                      </div>
                      <span className="text-zinc-400 text-xs line-clamp-1">{enq.installationType?.join(", ") || "N/A"}</span>
                    </div>
                  </div>

                  {/* Button */}
                  <button onClick={() => router.push(`/admin/bookings/codeNscriptEnquiries/${enq._id}`)} className="w-full cursor-pointer mt-6 py-3 px-4 bg-zinc-100 hover:bg-red-600 text-black hover:text-white rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 active:scale-95" >
                    Manage Enquiry
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}