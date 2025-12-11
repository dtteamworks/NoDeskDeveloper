"use client";
import { API_BASE } from "@/lib/api";
import { MousePointer2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const services = [
  { id: 1, title: "Developers Enquiries", route: "/admin/bookings/dev-enquiries", endpoint: "/enquiries" },
  { id: 2, title: "Developers Bookings", route: "/admin/bookings/dev-bookings", endpoint: "/bookings" },
  { id: 3, title: "Product Demo Requests", route: "/admin/bookings/productsdemo-requests", endpoint: "/demo-requests" },
  { id: 4, title: "Product Buying Enquiries", route: "/admin/bookings/productsbuying-requests", endpoint: "/buy-enquiries" },
  { id: 5, title: "Install OwnCode Enquiries", route: "/admin/bookings/installcode-enquaries", endpoint: "/install-requests" },
  { id: 6, title: "Code Installation bookings", route: "/admin/bookings/CodeInstallBooking", endpoint: "/code-install-bookings" },
  { id: 7, title: "Tech Consult Enquiries", route: "/admin/bookings/techConsult", endpoint: "/tech-consults" },
  { id: 8, title: "Project Estimation's", route: "/admin/bookings/projectEstimations", endpoint: "/project-estimations" },
  { id: 9, title: "Error Fixing Enquiries", route: "/admin/bookings/errorFixing", endpoint: "/error-fixings" },
  { id: 10, title: "Tech Maintenance Enquiries", route: "/admin/bookings/tech-maintenance", endpoint: "/technical-maintenances" },
  { id: 11, title: "Contact Page Enquiries", route: "/admin/bookings/ContactPageEnqs", endpoint: "/contacts" },
  { id: 12, title: "Career Enquiries", route: "/admin/bookings/CareerPageEnquiries", endpoint: "/careers" },
];

const LAST_SEEN_KEY = "admin_last_seen_timestamps";

export default function ServicesGrid() {
  const router = useRouter();
  const [newCounts, setNewCounts] = useState({});     // Only new/unseen
  const [totalCounts, setTotalCounts] = useState({}); // Total items
  const [lastSeen, setLastSeen] = useState({});       // { id: timestamp }
  const [loading, setLoading] = useState(true);

  // Load last seen from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LAST_SEEN_KEY);
      if (stored) setLastSeen(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to load last seen", err);
    }
  }, []);

  const fetchCounts = async () => {
    setLoading(true);
    const newTotal = {};
    const newNew = {};

    try {
      const promises = services.map(async (service) => {
        try {
          const res = await fetch(`${API_BASE}${service.endpoint}`);
          if (!res.ok) throw new Error();
          const data = await res.json();

          if (data.success && Array.isArray(data.data)) {
            const items = data.data;
            const total = items.length;
            newTotal[service.id] = total;

            const lastSeenTime = lastSeen[service.id] ? new  Date(lastSeen[service.id]).getTime() : 0;
            const unseen = items.filter(item => new Date(item.createdAt).getTime() > lastSeenTime).length;
            newNew[service.id] = unseen;
          } else {
            newTotal[service.id] = 0;
            newNew[service.id] = 0;
          }
        } catch (err) {
          newTotal[service.id] = 0;
          newNew[service.id] = 0;
        }
      });

      await Promise.all(promises);
      setTotalCounts(newTotal);
      setNewCounts(newNew);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial + polling
  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, 30000); // Every 30s
    return () => clearInterval(interval);
  }, [lastSeen]);

  const handleCardClick = (service) => {
    const now = new Date().toISOString();
    const updated = { ...lastSeen, [service.id]: now };
    setLastSeen(updated);
    localStorage.setItem(LAST_SEEN_KEY, JSON.stringify(updated));

    // Immediately hide new badge for this card
    setNewCounts(prev => ({ ...prev, [service.id]: 0 }));

    router.push(service.route);
  };

  return (
    <>
      <div className="border-b border-white/10 backdrop-blur-xl bg-white/2 flex justify-between items-start md:items-center *:py-[22px] *:px-6">
        <div className="px-8 py-10">
          <h1 className="text-2xl md:text-3xl font-black bg-linear-to-tl from-cyan-700 via-emerald-600 to-green-700 bg-clip-text text-transparent">
            All Bookings
          </h1>
          <p className="text-gray-400 mt-1 text-xs md:text-sm flex">
            Manage <span className="hidden md:block px-1">and showcase </span> all bookings
          </p>
        </div>
      </div>

      <div className="min-h-screen bg-black p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const newCount = newCounts[service.id] ?? 0;
              const total = totalCounts[service.id] ?? 0;
              const hasNew = newCount > 0;

              return (
                <div
                  key={service.id}
                  onClick={() => handleCardClick(service)}
                  className="relative group cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="relative overflow-hidden rounded-3xl p-7 bg-linear-to-br from-slate-900/60 to-slate-950/60 border border-slate-800/50 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-cyan-500/40 hover:shadow-cyan-500/10">
                    {/* Subtle hover glow */}
                    <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-semibold text-[14px] leading-tight">
                          {service.title}
                        </h3>
                        <MousePointer2 className="size-5  text-cyan-400 opacity-0 group-hover:opacity-80 duration-300  group-hover:rotate-90 transition-all drop-shadow-blue-200 ease-in" />
                      </div>

                      <div className="flex gap-3 items-center">
                        {/* Total Count - Minimal & professional */}
                        <div className={`px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[9px] h-fit font-semibold ${hasNew ? "hidden" : "text-cyan-400"} transition-colors`}>
                         Total  {total} {total === 1 ? "enquiry" : "enquiries"}
                        </div>

                        {/* New Badge - Eye-catching red with pulse */}
                        {hasNew && (
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-[9px] font-semibold ">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            {newCount === 1 ? "1 NEW" : `${newCount} NEW`}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {loading && Object.keys(newCounts).length === 0 && (
            <div className="text-center text-gray-500 py-12 text-sm">Loading latest updates...</div>
          )}
        </div>
      </div>
    </>
  );
}