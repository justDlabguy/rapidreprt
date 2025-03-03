
import { Home, BarChart, Settings, Flask, CreditCard } from "lucide-react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const navItems = [
    { to: "/dashboard", icon: <Home className="w-5 h-5" />, label: "Dashboard" },
    { to: "/lab-results", icon: <Flask className="w-5 h-5" />, label: "Lab Results" },
    { to: "/billing", icon: <CreditCard className="w-5 h-5" />, label: "Billing" },
    { to: "/settings", icon: <Settings className="w-5 h-5" />, label: "Settings" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white p-4 hidden md:block">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-400">LabAnalyst</h2>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
