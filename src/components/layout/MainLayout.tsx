import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

interface LayoutProps {
    userRole: "admin" | "client";
    onLogout?: () => void;
}

export const MainLayout: React.FC<LayoutProps> = ({
                                                      userRole,
                                                      onLogout
                                                  }) => {

    const menuItems =
        userRole === "admin"
            ? [
                { name: "Все платежи", icon: "📊", path: "/admin/payments" },
                { name: "Валюты", icon: "💱", path: "/admin/currencies" },
                { name: "Роли", icon: "👥", path: "/admin/roles" }
            ]
            : [
                { name: "Мой кабинет", icon: "🏠", path: "/cabinet" },
                { name: "Пополнить", icon: "💳", path: "/top-up" },
                { name: "Платежи", icon: "💰", path: "/payments" }, // 👈 добавили
                { name: "История", icon: "📜", path: "/history" }
            ];

    return (
        <div className="flex min-h-screen bg-white">

            {/* SIDEBAR */}
            <aside className="w-72 bg-[#0f172a] text-white flex flex-col sticky top-0 h-screen shadow-2xl z-50">

                {/* Logo */}
                <div className="p-8 mb-4">
                    <div className="flex items-center space-x-3 group cursor-pointer">
                        <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                            <span className="text-xl font-black">P</span>
                        </div>
                        <span className="font-black text-2xl tracking-tight">
                            PaySystem
                            <div className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em] leading-none mt-1">
                                {userRole} area
                            </div>
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-1">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center space-x-4 p-4 rounded-2xl transition-all group relative overflow-hidden
                                ${
                                    isActive
                                        ? "bg-white/10 text-white"
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`
                            }
                        >
                            <span className="text-xl group-hover:scale-110 transition-transform">
                                {item.icon}
                            </span>
                            <span className="font-bold">
                                {item.name}
                            </span>

                            {/* Hover effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-6 border-t border-slate-800/50">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-800/40 hover:bg-red-500/10 hover:text-red-400 text-slate-400 transition-all font-bold group"
                    >
                        <span>Выйти из системы</span>
                        <span className="group-hover:translate-x-1 transition-transform">
                            ➔
                        </span>
                    </button>

                    <div className="mt-4 text-[10px] text-slate-600 text-center font-bold tracking-widest uppercase">
                        v.1.0.4 secure
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 min-w-0 bg-slate-50/30">
                <div className="max-w-6xl mx-auto p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
