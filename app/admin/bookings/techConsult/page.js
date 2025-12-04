"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Phone, Mail, Clock, Languages, Loader2, Calendar } from "lucide-react";
import { API_BASE } from "@/lib/api";


export default function AdminTechConsults() {
  const [consults, setConsults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchConsults = async () => {
      try {
        const res = await fetch(`${API_BASE}/tech-consults`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setConsults(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchConsults();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black"><Loader2 className="w-12 h-12 text-cyan-500 animate-spin" /></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-black text-red-400">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-black/95 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
       

        {consults.length === 0 ? (
          <p className="text-center text-white/60 text-lg">No consultation requests yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {consults.map((item) => (
              <div
                key={item._id}
                className="group relative bg-linear-to-br from-slate-900/90 to-slate-950/90 border border-cyan-500/20 rounded-2xl p-6 shadow-2xl backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-linear-to-r from-cyan-600/10 to-blue-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white">{item.fullName}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "Pending" ? "bg-yellow-500/20 text-yellow-300" :
                      item.status === "Scheduled" ? "bg-blue-500/20 text-blue-300" :
                      item.status === "Completed" ? "bg-green-500/20 text-green-300" :
                      "bg-red-500/20 text-red-300"
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-300">
                    <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-cyan-400" /> {item.email}</p>
                    <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-cyan-400" /> {item.phone}</p>
                    <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-cyan-400" /> {item.preferredTime}</p>
                    <p className="flex items-center gap-2"><Languages className="w-4 h-4 text-cyan-400" /> {item.preferredLang}</p>
                  </div>

                  <button
                    onClick={() => router.push(`/admin/bookings/techConsult/${item._id}`)}
                    className="w-full py-3 bg-linear-to-r from-cyan-600 to-blue-600 rounded-xl font-bold text-white shadow-lg hover:shadow-cyan-500/60 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                  >
                    View Details
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