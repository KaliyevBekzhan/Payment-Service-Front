import { useInfiniteQuery } from "@tanstack/react-query";
import * as agent from "../../api/agent.ts";
import { StatusBadge } from "../../components/ui/StatusBadge.tsx";
import type { ActionResponse } from "../../responses/responses.ts";

export const HistoryPage = () => {

    const PAGE_SIZE = 10;

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery<ActionResponse[]>({
        queryKey: ['history'],
        initialPageParam: 1,
        queryFn: ({ pageParam }) =>
            agent.User.history({
                pageNumber: pageParam as number,
                pageSize: PAGE_SIZE
            }),
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length < PAGE_SIZE) return undefined;
            return pages.length + 1;
        }
    });

    if (isLoading) return <div className="p-6">Загрузка истории...</div>;
    if (isError) return <div className="p-6 text-red-500">Ошибка загрузки истории</div>;

    const flatData = data?.pages.flat() ?? [];

    const totalIncome = flatData
        .filter(x => x.originalAmount > 0)
        .reduce((sum, x) => sum + x.amountInTenge, 0);

    const totalExpense = flatData
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
                        {flatData.length}
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
                    {flatData.map((t) => {

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
                                    className={`p-4 text-right font-bold ${
                                        isPositive
                                            ? "text-emerald-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {isPositive ? "▲" : "▼"}{" "}
                                    {t.amountInTenge.toLocaleString()} ₸
                                </td>

                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            {/* LOAD MORE */}
            {hasNextPage && (
                <div className="flex justify-center p-6">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="px-6 py-3 bg-black text-white rounded-xl disabled:opacity-50"
                    >
                        {isFetchingNextPage ? "Загрузка..." : "Загрузить ещё"}
                    </button>
                </div>
            )}

        </div>
    );
};