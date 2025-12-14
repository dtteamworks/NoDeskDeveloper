"use client";
import { ArrowLeft, Code2 } from "lucide-react";

export default function CodeNScriptEnqsLayout({ children }) {
  return (
    <div className="min-h-screen bg-black/90">
      <div className="">
        <div className="flex items-center justify-between gap-3 border-b border-white/20 py-8 px-4 md:px-8">
          <div className="flex gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-purple-400 via-pink-400 to-red-400  rounded-2xl blur-xl opacity-70" />
              <div className="relative bg-linear-to-br  from-purple-600/20 to-pink-600/20 border border-purple-500/30 p-2 shadow-2xl rounded-xl">
                <Code2 className="size-5 text-red-400" strokeWidth={3} />
              </div>
            </div>
            <h1 className="text-xl md:text-[25px] font-bold bg-linear-to-r from-purple-400 via-pink-400 to-red-400  bg-clip-text text-transparent ">
              Code & Script Enquiries
            </h1>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center text-xs gap-1 text-gray-400 hover:text-white transition-colors group border border-white/25 px-4 py-3 rounded-full ">
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Bookings</span>
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
