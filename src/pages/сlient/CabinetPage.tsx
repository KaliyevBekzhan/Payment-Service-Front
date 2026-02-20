import * as agent from '../../api/agent.ts';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import { useState } from "react";
import { RecentHistoryTable } from "../../components/RecentHistoryTable.tsx";
import { BalanceCard } from "../../components/BalanceCard.tsx";
import { TransactionForm } from "../../components/transactions/TransactionForm.tsx";

export const CabinetPage = () => {

    const [showForm, setShowForm] = useState<{
        open: boolean;
        type: 'topup' | 'payment';
    }>({
        open: false,
        type: 'topup'
    });

    const { data, isLoading } = useQuery({
        queryKey: ['myCabinet'],
        queryFn: agent.User.myCabinet,
    });

    const queryClient = useQueryClient();

    if (isLoading && !data) {
        return (
            <div className="flex flex-col items-center justify-center p-20 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">
                    Синхронизация...
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 p-4">

            <BalanceCard
                account={data?.account ?? 0}
                walletNumber={data?.walletNumber ?? ""}
                onAction={(type) => setShowForm({ open: true, type })}
            />

            {showForm.open && (
                <TransactionForm
                    type={showForm.type}
                    userAccount={data?.account ?? 0}
                    onClose={() => setShowForm({ ...showForm, open: false })}
                    onSuccess={() => {
                        queryClient.invalidateQueries({ queryKey: ['myCabinet'] });
                    }}
                />
            )}

            <RecentHistoryTable payments={data?.payments ?? []} />

        </div>
    );
};