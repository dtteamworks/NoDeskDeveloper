"use client";
import { UnseenCountsProvider, useUnseenCounts } from "@/src/context/UnseenCountsContext";
import { LayoutDashboard, Users, Package, CalendarDays, LogOut, Computer, Check, } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { API_BASE } from "@/lib/api";
import { showToast } from "nextjs-toast-notify";

function AdminLayoutContent({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { newCounts } = useUnseenCounts();

  // Calculate total new enquiries across all services
  const totalNewEnquiries = Object.values(newCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/all-developers", label: "All Developers", icon: Users },
    { href: "/admin/softwares", label: "Softwares", icon: Package },
    {
      href: "/admin/bookings",
      label: "Bookings",
      icon: CalendarDays,
      showBadge: true,
    },
    { href: "/admin/codeNscripts", label: "Code & Scripts", icon: Computer },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_BASE}/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        showToast.success("Logged Out Successfully", {
          duration: 2000,
          progress: true,
          position: "top-right",
          transition: "bounceIn",
          sound: true,
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative flex">
        {/* Desktop Sidebar */}
        <aside className="w-72 fixed inset-y-0 left-0 z-50 hidden lg:block">
          <div className="h-full bg-linear-to-b from-white/5 to-white/2 backdrop-blur-2xl border-r border-white/10 flex flex-col">
            {/* Logo */}
            <div className="h-20 flex items-center justify-center border-b border-white/10 px-8 py-13">
              <h1 className="text-3xl font-black bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Admin Panel
              </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-6 py-8 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                const showNewBadge = item.showBadge && totalNewEnquiries > 0;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative
                      ${
                        isActive
                          ? "bg-linear-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/40 shadow-lg shadow-blue-500/20"
                          : "hover:bg-white/5 border border-transparent"
                      }
                    `}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors ${
                        isActive
                          ? "text-blue-400"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                    />
                    <span
                      className={`font-semibold ${
                        isActive
                          ? "text-white"
                          : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* New Badge */}
                    {showNewBadge && (
                      <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full animate-pulse">
                        NEW
                      </span>
                    )}

                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="p-6 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 transition-all group"
              >
                <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
                <span className="font-medium text-gray-300 group-hover:text-white">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-2xl border-t border-white/10">
          <div className="flex items-center justify-around px-2 py-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 relative
                    ${
                      isActive
                        ? "bg-linear-to-r from-blue-500/20 to-purple-500/20"
                        : ""
                    }
                  `}
                >
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      isActive ? "text-blue-400" : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {item.label.split(" ")[0]}
                  </span>
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-400 rounded-full" />
                  )}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl"
            >
              <LogOut className="w-6 h-6 text-gray-400" />
              <span className="text-xs font-medium text-gray-400">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 min-h-screen lg:pt-0 pb-20 lg:pb-0">
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <UnseenCountsProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </UnseenCountsProvider>
  );
}
