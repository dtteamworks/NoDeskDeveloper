"use client";

import { useEffect, useState } from "react";
import DevCard from "@/components/AdminPanel/DevCard";
import AddDeveloperModal from "@/components/Modals/AddDeveloperModal";
import { API_BASE } from "@/lib/api";
import { useDeveloperModal } from "./layout";

export default function AllDevelopersPage() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isModalOpen, setIsModalOpen } = useDeveloperModal();

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const res = await fetch(`${API_BASE}/developers`, {
          cache: "no-store",
        });
        const result = await res.json();

        if (result.success) {
          setDevelopers(result.data);
        }
      } catch (error) {
        console.error("Error fetching developers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDevelopers();
  }, []);

  const handleAddDeveloper = async (newDev) => {
    try {
      const res = await fetch(`${API_BASE}/add-developer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDev),
      });

      const result = await res.json();

      if (result.success) {
        setDevelopers((prev) => [result.data, ...prev]);
        setIsModalOpen(false);
        console.log("Developer added successfully:", result.data);
      } else {
        console.error("Failed to add developer:", result.message);
      }
    } catch (error) {
      console.error("Error adding developer:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">Loading developers...</p>
      </div>
    );
  }

  return (
    <>
      {/* Grid */}
      <div className="p-8 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {developers.map((dev) => (
            <DevCard key={dev._id} developer={dev} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AddDeveloperModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddDeveloper}
      />
    </>
  );
}