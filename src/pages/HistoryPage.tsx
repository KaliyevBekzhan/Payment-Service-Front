import { useQuery } from "@tanstack/react-query";
import * as agent from "../api/agent";
import { StatusBadge } from "../components/ui/StatusBadge";
import type { ActionResponse } from "../responses/responses.ts";

export const HistoryPage = () => {

    const { data = [], isLoading, isError } = useQuery<ActionResponse[]>({
        queryKey: ['history'],
        queryFn: agent.User.history
    });

    if (isLoading) return <div className="p-6">Загрузка истории...</div>;
    if (isError) return <div className="p-6 text-red-500">Ошибка загрузки истории</div>;

    const totalIncome = data
        .filter(x => x.originalAmount > 0)
        .reduce((sum, x) => sum + x.amountInTenge, 0);

    const totalExpense = data
        .filter(x => x.originalAmount < 0)
        .reduce((sum, x) => sum + x.amountInTenge, 0);

    return (
        <div className="space-y-8">

            <h1 className="text-2xl font-black">История операций</h1>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <p className="text-xs uppercase text-slate-400 font-bold">
                        Всего операций
                    </p>
                    <p className="text-3xl font-black">
                        {data.length}
                    </p>
                </div>

                <div className="bg-emerald-50 p-6 rounded-2xl shadow-sm">
                    <p className="text-xs uppercase text-emerald-600 font-bold">
                        Пополнения
                    </p>
                    <p className="text-3xl font-black text-emerald-600">
                        +{totalIncome.toLocaleString()} ₸
                    </p>
                </div>

                <div className="bg-red-50 p-6 rounded-2xl shadow-sm">
                    <p className="text-xs uppercase text-red-600 font-bold">
                        Расходы
                    </p>
                    <p className="text-3xl font-black text-red-600">
                        -{Math.abs(totalExpense).toLocaleString()} ₸
                    </p>
                </div>

            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold">
                    <tr>
                        <th className="p-4 text-left">ID</th>
                        <th className="p-4 text-left">Тип</th>
                        <th className="p-4 text-left">Дата</th>
                        <th className="p-4 text-left">Комментарий</th>
                        <th className="p-4 text-center">Статус</th>
                        <th className="p-4 text-right">Сумма</th>
                    </tr>
                    </thead>

                    <tbody>
                    {data.map((t) => {

                        const isPositive = t.originalAmount > 0;

                        return (
                            <tr
                                key={t.id}
                                className="border-t hover:bg-slate-50 transition"
                            >

                                <td className="p-4 font-mono text-xs text-slate-400">
                                    #{t.id}
                                </td>

                                <td className="p-4 font-bold">
                                    {t.transType}
                                </td>

                                <td className="p-4 text-slate-500">
                                    {t.createdAt
                                        ? new Date(t.createdAt).toLocaleString()
                                        : "—"}
                                </td>

                                <td className="p-4 text-slate-600">
                                    {t.comment || "Без комментария"}
                                </td>

                                <td className="p-4 text-center">
                                    <StatusBadge status={t.status} />
                                </td>

                                <td
                                    className={`p-4 text-right font-bold
                                            ${isPositive
                                        ? "text-emerald-600"
                                        : "text-red-600"
                                    }`}
                                >
                                    {isPositive ? "▲" : "▼"}{" "}
                                    {Math.abs(t.amountInTenge).toLocaleString()} ₸
                                </td>

                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
