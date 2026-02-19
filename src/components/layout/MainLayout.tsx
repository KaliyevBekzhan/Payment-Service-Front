import React from "react";

interface LayoutProps {
    children: React.ReactNode;
    userRole: 'admin' | 'client';
    onLogout?: () => void;
}

export const MainLayout: React.FC<LayoutProps> = ({ children, userRole, onLogout }) => {
    const menuItems = userRole === 'admin'
        ? [
            { name: 'Все платежи', icon: '📊', path: '/admin/payments' },
            { name: 'Валюты', icon: '💱', path: '/admin/currencies' },
            { name: 'Роли', icon: '👥', path: '/admin/roles' }
        ]
        : [
            { name: 'Мой кабинет', icon: '🏠', path: '/cabinet' },
            { name: 'Пополнить', icon: '💳', path: '/top-up' },
            { name: 'История', icon: '📜', path: '/history' }
        ];

    return (
        <div className="flex min-h-screen bg-white">
            {/* ФИКСИРОВАННЫЙ Сайдбар */}
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

                {/* Навигация */}
                <nav className="flex-1 px-4 space-y-1">
                    {menuItems.map(item => (
                        <a
                            key={item.path}
                            href={item.path}
                            className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/5 transition-all group relative overflow-hidden"
                        >
                            <span className="text-xl group-hover:scale-110 transition-transform z-10">{item.icon}</span>
                            <span className="font-bold text-slate-400 group-hover:text-white transition-colors z-10">{item.name}</span>
                            {/* Эффект при наведении */}
                            <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    ))}
                </nav>

                {/* Кнопка выхода внизу сайдбара */}
                <div className="p-6 border-t border-slate-800/50">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-800/40 hover:bg-red-500/10 hover:text-red-400 text-slate-400 transition-all font-bold group"
                    >
                        <span>Выйти из системы</span>
                        <span className="group-hover:translate-x-1 transition-transform">➔</span>
                    </button>
                    <div className="mt-4 text-[10px] text-slate-600 text-center font-bold tracking-widest uppercase">
                        v.1.0.4 secure
                    </div>
                </div>
            </aside>

            {/* Контентная часть (без Header) */}
            <main className="flex-1 min-w-0 bg-slate-50/30">
                <div className="max-w-6xl mx-auto p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {children}
                </div>
            </main>
        </div>
    );
};