import { useEffect, useState } from "react";
import type { ActionResponse } from "../../responses/responses";
import type { UseQueryResult } from "@tanstack/react-query";
import {TransactionMainItem} from "./TransactionMainItem.tsx";

type Props = {
    title: string;
    emptyText: string;
    loadingText: string;
    errorText: string;
    useHook: (page: number) => UseQueryResult<ActionResponse[], Error>;
};

export const TransactionsListPage = ({
                                         title,
                                         emptyText,
                                         loadingText,
                                         errorText,
                                         useHook
                                     }: Props) => {

    const PAGE_SIZE = 10;

    const [page, setPage] = useState(1);
    const [items, setItems] = useState<ActionResponse[]>([]);

    const { data, isLoading, isError, isFetching } = useHook(page);

    // 🔥 накапливаем данные
    useEffect(() => {
        if (data) {
            setItems(prev =>
                page === 1 ? data : [...prev, ...data]
            );
        }
    }, [data, page]);

    const hasNextPage = data?.length === PAGE_SIZE;

    if (page === 1 && isLoading) {
        return <div className="p-6">{loadingText}</div>;
    }

    if (isError) {
        return <div className="p-6 text-red-500">{errorText}</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-black">{title}</h1>

            <div className="space-y-3">
                {items.length === 0 && (
                    <div className="text-slate-400">
                        {emptyText}
                    </div>
                )}

                {items.map(t => (
                    <TransactionMainItem key={`${t.transType}-${t.id}`} transaction={t} />
                ))}
            </div>

            {/* 🔥 КНОПКА LOAD MORE */}
            {hasNextPage && (
                <div className="flex justify-center pt-6">
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={isFetching}
                        className="px-6 py-3 bg-black text-white rounded-xl disabled:opacity-50"
                    >
                        {isFetching ? "Загрузка..." : "Загрузить ещё"}
                    </button>
                </div>
            )}
        </div>
    );
};