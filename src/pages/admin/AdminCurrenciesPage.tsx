import { useState } from "react";
import { useAdminCurrencies } from "../../hooks/admin/useAdminCurrencies";
import type { Currency } from "../../models/models";
import {AdminCurrenciesModal} from "../../components/admin/AdminCurrenciesModal.tsx";

export const AdminCurrenciesPage = () => {
    const { data = [], isLoading } = useAdminCurrencies();
    const [selected, setSelected] = useState<Currency | null>(null);

    if (isLoading) return <p>Загрузка...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Валюты</h1>

            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wide">
                    <tr>
                        <th className="px-6 py-4 text-left">ID</th>
                        <th className="px-6 py-4 text-left">Название</th>
                        <th className="px-6 py-4 text-left">Курс к ₸</th>
                        <th className="px-6 py-4 text-right">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((currency) => (
                        <tr
                            key={currency.id}
                            className="border-t hover:bg-slate-50 transition"
                        >
                            <td className="px-6 py-4">{currency.id}</td>
                            <td className="px-6 py-4 font-medium">
                                {currency.name}
                            </td>
                            <td className="px-6 py-4 text-emerald-600 font-semibold">
                                {(currency.conversionRate ?? 0).toFixed(2)} ₸
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    onClick={() => setSelected(currency)}
                                    className="px-4 py-2 text-sm rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition"
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
                <AdminCurrenciesModal
                    currency={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </div>
    );
};