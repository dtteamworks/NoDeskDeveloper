"use client";

import { FolderCode } from "lucide-react";

export default function TechConsultEnquiriesLayout({ children }) {
  return (
    <div className="min-h-screen bg-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 border-b border-white/20 py-[34px] px-4 md:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500 via-sky-500 to-teal-500 rounded-2xl blur-xl opacity-70" />
            <div className="relative bg-linear-to-br from-blue-600 via-sky-500 to-teal-400 p-2 shadow-2xl rounded-xl">
              <FolderCode className="size-5 text-white" strokeWidth={3} />
            </div>
          </div>
          <h1 className="text-xl md:text-[25px] font-bold ">
            Tech Consultation Requests
          </h1>
        </div>

        {children}
      </div>
    </div>
  );
}
