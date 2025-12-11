"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE } from "@/lib/api"; // Adjust path if needed

const UnseenCountsContext = createContext({
  newCounts: {},
  totalCounts: {},
  markAsSeen: () => {},
});

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

export function UnseenCountsProvider({ children }) {
  const [newCounts, setNewCounts] = useState({});
  const [totalCounts, setTotalCounts] = useState({});
  const [lastSeen, setLastSeen] = useState({});
  const [loading, setLoading] = useState(true);

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
            newTotal[service.id] = items.length;
            const lastSeenTime = lastSeen[service.id] ? new Date(lastSeen[service.id]).getTime() : 0;
            newNew[service.id] = items.filter(item => new Date(item.createdAt).getTime() > lastSeenTime).length;
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

  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, 30000);
    return () => clearInterval(interval);
  }, [lastSeen]);

  const markAsSeen = (serviceId) => {
    const now = new Date().toISOString();
    const updated = { ...lastSeen, [serviceId]: now };
    setLastSeen(updated);
    localStorage.setItem(LAST_SEEN_KEY, JSON.stringify(updated));
    setNewCounts(prev => ({ ...prev, [serviceId]: 0 }));
  };

  return (
    <UnseenCountsContext.Provider value={{ newCounts, totalCounts, markAsSeen, loading, services }}>
      {children}
    </UnseenCountsContext.Provider>
  );
}

export const useUnseenCounts = () => useContext(UnseenCountsContext);