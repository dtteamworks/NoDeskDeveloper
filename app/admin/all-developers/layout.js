"use client";

import { createContext, useState, useContext } from "react";

const DeveloperContext = createContext();

export const useDeveloperModal = () => useContext(DeveloperContext);

export default function DevelopersLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DeveloperContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="border-b border-white/10 backdrop-blur-xl bg-white/2 flex justify-between items-start md:items-center *:py-[22px] *:px-6">
          <div className="px-8 py-10">
            <h1 className="text-2xl md:text-3xl font-black bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              All Developers
            </h1>
            <p className="text-gray-400 mt-1 text-xs md:text-sm flex">
              Manage <span className="hidden md:block px-1">and showcase </span>{" "}
              all developers
            </p>
          </div>

          <button onClick={() => setIsModalOpen(true)} className="px-8 py-10">
            <span className="text-sm md:text-sm tracking-wider px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-white shadow-lg transition flex items-center">
             Add <span className="hidden md:block pl-1">Developer</span>
            </span>
          </button>
        </div>

        {children}
      </div>
    </DeveloperContext.Provider>
  );
}