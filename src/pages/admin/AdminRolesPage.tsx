import { useState } from "react";
import { useAdminRoles } from "../../hooks/admin/useAdminRoles";
import type { Role } from "../../models/models";
import {AdminRolesModal} from "../../components/admin/AdminRolesModal.tsx";

export const AdminRolesPage = () => {
    const { data = [], isLoading } = useAdminRoles();
    const [selected, setSelected] = useState<Role | null>(null);

    if (isLoading) return <p>Загрузка...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Роли</h1>

            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                    <tr>
                        <th className="px-6 py-4 text-left">ID</th>
                        <th className="px-6 py-4 text-left">Название</th>
                        <th className="px-6 py-4 text-left">Приоритет</th>
                        <th className="px-6 py-4 text-right">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((role) => (
                        <tr key={role.id} className="border-t hover:bg-slate-50">
                            <td className="px-6 py-4">{role.id}</td>
                            <td className="px-6 py-4 font-medium">{role.name}</td>
                            <td className="px-6 py-4 text-emerald-600 font-semibold">
                                {role.priority}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    onClick={() => setSelected(role)}
                                    className="px-4 py-2 text-sm rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                                >
                                    Подробнее
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {selected && (
                <AdminRolesModal
                    role={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </div>
    );
};