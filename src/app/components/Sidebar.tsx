import {
  LayoutDashboard,
  FileText,
  Truck,
  TrendingUp,
  Users,
  Navigation,
  Settings,
  MapPin,
  Route,
  MessageSquare,
  Search,
  Package,
  Plus,
  Upload,
  Building2,
  ChevronDown,
  ChevronRight,
  Network,
  Calculator,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useState } from "react";

import { useNavigate } from "react-router";

interface MenuItem {
  icon: any;
  label: string;
  path?: string;
  submenu?: { icon: any; label: string; path: string }[];
}


const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Search, label: "Search Loads", path: "/load-board" },
  { icon: Network, label: "Private Loads", path: "/private-loads" },
  { icon: Truck, label: "Search Trucks", path: "/truck-board" },
  { icon: Building2, label: "Companies", path: "/company-directory" },
  { icon: Users, label: "Carrier Network", path: "/carrier-network" },
  { icon: FileText, label: "My Loads", path: "/rate-analysis" },
  { icon: Users, label: "My Trucks", path: "/brokers" },
  { icon: Navigation, label: "Dispatch", path: "/dispatch" },
  {
    icon: Package,
    label: "Shipments",
    submenu: [
      { icon: Package, label: "Manage Shipments", path: "/shipment-lifecycle" },
      { icon: Plus, label: "Post a Load", path: "/post-load" },
      { icon: Upload, label: "Bulk Upload", path: "/bulk-upload" },
    ],
  },
  { icon: MapPin, label: "Tracking", path: "/shipment-tracking" },
  { icon: Calculator, label: "Tools", path: "/logistics-tools" },
  { icon: Route, label: "Trip Planner", path: "/trip-planner" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: Settings, label: "My Account", path: "/settings" },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["Shipments"]);

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const isSubmenuActive = (submenu?: { path: string }[]) => {
    if (!submenu) return false;
    return submenu.some((item) => location.pathname === item.path);
  };

  const handleLogout = () => {
    // 1. Clear the storage
    localStorage.removeItem("token");

    navigate("/login", { replace: true });
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 bg-[#1e293b] h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-slate-700 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-xl leading-none">
                Freight
              </span>
              <span className="text-slate-400 text-xs leading-none mt-0.5">
                Hub
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedMenus.includes(item.label);
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isActive = item.path ? location.pathname === item.path : false;
          const isSubmenuItemActive = isSubmenuActive(item.submenu);

          return (
            <div key={item.label}>
              {/* Main Menu Item */}
              {hasSubmenu ? (
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isSubmenuItemActive
                      ? "bg-slate-700 text-white"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm flex-1 text-left">
                    {item.label}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  )}
                </button>
              ) : (
                <Link
                  to={item.path!}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-slate-700 text-white"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              )}

              {/* Submenu Items */}
              {hasSubmenu && isExpanded && (
                <div className="mt-1 ml-3 pl-3 border-l-2 border-slate-700 space-y-1">
                  {item.submenu!.map((subItem) => {
                    const SubIcon = subItem.icon;
                    const isSubActive = location.pathname === subItem.path;

                    return (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                          isSubActive
                            ? "bg-slate-600 text-white"
                            : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                        }`}
                      >
                        <SubIcon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{subItem.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="text-xs text-slate-400">
          <div className="mb-1">Need help?</div>
          {/* <button
            onClick={handleLogout}
            className="block text-slate-300 hover:text-white font-medium"
          >
            Logout
          </button> */}
          <button className="text-slate-300 hover:text-white font-medium">
            Support
          </button>
        </div>
      </div>
    </aside>
  );
}
