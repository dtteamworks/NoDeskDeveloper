"use client";

import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";
import SoftwareCard from "@/components/AdminPanel/SoftwareCard";
import AddSoftwareModal from "@/components/Modals/AddSoftwareModal";

export default function AllSoftwaresPage() {
  const [softwares, setSoftwares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSoftwares = async () => {
      try {
        const res = await fetch(`${API_BASE}/projects`);
        const result = await res.json();
        console.log("Fetched softwares:", result);

        if (result.success) {
          setSoftwares(result.data);
        }
      } catch (error) {
        console.error("Error fetching softwares:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSoftwares();
  }, []);

  const handleAddSoftware = async (newSoftware) => {
    try {
      const res = await fetch(`${API_BASE}/add-project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSoftware),
      });

      const result = await res.json();

      if (result.success) {
        setSoftwares((prev) => [result.data, ...prev]);
        setIsModalOpen(false);
      } else {
        alert("Failed: " + result.message);
      }
    } catch (error) {
      alert("Network error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-2xl">Loading softwares...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="border-b border-white/10 backdrop-blur-xl bg-white/2 flex justify-between items-center">
          <div className="px-8 py-10">
            <h1 className="text-4xl font-black bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              All Softwares
            </h1>
            <p className="text-gray-400 mt-2">Manage and showcase all ready-made projects</p>
          </div>

          <button onClick={() => setIsModalOpen(true)} className="px-8 py-10">
            <span className="px-6 py-3 bg-linear-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 rounded-xl font-bold text-white shadow-lg transition flex items-center gap-2">
              Add Software
            </span>
          </button>
        </div>

        {/* Grid */}
        <div className="p-8">
          {softwares.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">No softwares added yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {softwares.map((software) => (
                <SoftwareCard key={software._id} software={software} />
              ))}
            </div>
          )}
        </div>
      </div>

      <AddSoftwareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddSoftware}
      />
    </>
  );
}