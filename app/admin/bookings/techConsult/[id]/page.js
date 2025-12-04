"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, Trash2, CheckCircle, Phone, Mail, Clock, Languages, Globe, Calendar } from "lucide-react";
import { API_BASE } from "@/lib/api";


export default function AdminTechConsultDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [consult, setConsult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchConsult = async () => {
      try {
        const res = await fetch(`${API_BASE}/tech-consult/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setConsult(data.data);
        setStatus(data.data.status);
      } catch (err) {
        alert("Request not found");
        router.push("/admin/bookings/techConsult");
      } finally {
        setLoading(false);
      }
    };
    fetchConsult();
  }, [id, router]);

  const handleUpdate = async () => {
    if (status === consult.status) return;
    setUpdating(true);
    try {
      const res = await fetch(`${API_BASE}/tech-consult/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setConsult((prev) => ({ ...prev, status }));
        alert("Status updated successfully!");
      }
    } catch (err) {
      alert("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this consultation request permanently?")) return;
    setDeleting(true);
    try {
      await fetch(`${API_BASE}/tech-consult/${id}`, { method: "DELETE" });
      alert("Deleted successfully");
      router.push("/admin/bookings/techConsult");
    } catch (err) {
      alert("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black"><Loader2 className="w-12 h-12 text-cyan-500 animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-black/95 p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => router.back()} className="mb-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
          <ArrowLeft className="w-5 h-5" /> Back to List
        </button>

        <div className="bg-linear-to-br  from-slate-900/90 to-slate-950/90 border border-cyan-500/30 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-xl md:text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4 md:mb-8">
            Consultation Request Details
          </h1>

          <div className="grid md:grid-cols-2 gap-8 text-white/90">
            <div className="space-y-5">
              <p className="flex items-center gap-3"><Mail className="w-5 h-5 text-cyan-400" /> <strong>Name:</strong> {consult.fullName}</p>
              <p className="flex items-center gap-3"><Mail className="w-5 h-5 text-cyan-400" /> <strong>Email:</strong> {consult.email}</p>
              <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-cyan-400" /> <strong>Phone:</strong> {consult.phone}</p>
              <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-green-400" /> <strong>WhatsApp:</strong> {consult.whatsapp}</p>
            </div>
            <div className="space-y-5">
              <p className="flex items-center gap-3"><Globe className="w-5 h-5 text-cyan-400" /> <strong>Tech Type:</strong> {consult.techType}</p>
              <p className="flex items-center gap-3"><Languages className="w-5 h-5 text-cyan-400" /> <strong>Languages:</strong> {consult.language.join(", ")}</p>
              <p className="flex items-center gap-3"><Languages className="w-5 h-5 text-blue-400" /> <strong>Preferred Lang:</strong> {consult.preferredLang}</p>
              <p className="flex items-center gap-3"><Clock className="w-5 h-5 text-cyan-400" /> <strong>Preferred Time:</strong> {consult.preferredTime}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-6 py-3 bg-slate-800/70 border border-cyan-500/40 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option>Pending</option>
              <option>Scheduled</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>

            <button
              onClick={handleUpdate}
              disabled={updating || status === consult.status}
              className="px-8 py-3 bg-linear-to-r from-cyan-600 to-blue-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {updating ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
              Update Status
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-8 py-3 bg-linear-to-r from-red-600 to-red-500 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {deleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
              Delete Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}