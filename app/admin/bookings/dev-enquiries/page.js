// /admin/bookings/page.js (Purana code replace kar do isse - ab logic context se aa raha hai)
"use client";
import { useUnseenCounts } from "@/src/context/UnseenCountsContext";
import { MousePointer2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ServicesGrid() {
  const router = useRouter();
  const { newCounts, totalCounts, markAsSeen, loading, services } = useUnseenCounts();

  const handleCardClick = (service) => {
    markAsSeen(service.id);
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
                    <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-semibold text-[14px] leading-tight">
                          {service.title}
                        </h3>
                        <MousePointer2 className="size-5 text-cyan-400 opacity-0 group-hover:opacity-80 transition-opacity duration-300 -rotate-12 group-hover:rotate-0" />
                      </div>

                      <div className="flex gap-3 items-center">
                        <div className={`px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[9px] h-fit font-semibold ${hasNew ? "hidden" : "text-cyan-400"} transition-colors`}>
                          Total {total} {total === 1 ? "enquiry" : "enquiries"}
                        </div>

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