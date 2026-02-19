import * as agent from '../api/agent';
import { StatusBadge } from '../components/ui/StatusBadge';
import { CurrencySymbol } from '../components/ui/CurrencySymbol';
import type { ActionResponse } from "../responses/responses.ts";
import { QuickActions } from "../components/ui/QuickActions.tsx";
import { TransactionForm } from "../components/TransactionForm.tsx";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";

export const CabinetPage = () => {

    const [showForm, setShowForm] = useState<{ open: boolean; type: 'topup' | 'payment' }>({
        open: false,
        type: 'topup'
    });

    const { data, isLoading } = useQuery({
        queryKey: ['myCabinet'],
        queryFn: agent.User.myCabinet,
    });

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

            {/* БАЛАНС */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card-premium bg-slate-900 text-white border-none flex justify-between items-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Доступные средства</h3>
                        <p className="text-5xl font-black mt-4 tracking-tighter">
                            {data?.account?.toLocaleString()} <span className="text-blue-500 text-3xl">₸</span>
                        </p>
                        <p className="text-slate-500 text-xs mt-4 font-mono opacity-50">{data?.walletNumber}</p>
                    </div>
                    <QuickActions onAction={(type) => setShowForm({ open: true, type })} />
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
                </div>

                <div className="card-premium flex flex-col justify-center text-center">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Всего операций</p>
                    <p className="text-3xl font-black text-slate-800">{data?.payments.length || 0}</p>
                </div>
            </div>

            {/* ФОРМА (Оставляем ОДИН раз) */}
            {showForm.open && (
                <TransactionForm
                    type={showForm.type}
                    userAccount={data?.account || 0}
                    onClose={() => setShowForm({ ...showForm, open: false })}
                />
            )}

            {/* ТАБЛИЦА ИСТОРИИ */}
            <div className="card-premium p-0 overflow-hidden shadow-sm border-none ring-1 ring-slate-100">
                <div className="px-8 py-6 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">История активности</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-y-2 px-6 pb-6">
                        <thead>
                        <tr className="text-slate-400 text-[10px] uppercase font-black tracking-widest">
                            <th className="px-4 py-4 text-left">Актив</th>
                            <th className="px-4 py-4 text-center">Статус</th>
                            <th className="px-4 py-4 text-right">Сумма</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.payments.map((p: ActionResponse) => (
                            <tr key={p.id}>
                                <td className="px-4 py-4 rounded-l-2xl">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-500">
                                            {CurrencySymbol(p.currency)}
                                        </div>
                                        <div className="flex flex-col">
                                                <span className="font-black text-slate-900 leading-none">
                                                    {p.originalAmount > 0 ? '+' : ''}{p.originalAmount} {p.currency}
                                                </span>
                                            <span className="text-[10px] text-slate-400 uppercase mt-1.5 font-bold">
                                                    {p.comment || 'Транзакция'}
                                                </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <StatusBadge status={p.status} />
                                </td>
                                <td className={`px-4 py-4 text-right font-black rounded-r-2xl text-lg ${p.originalAmount > 0 ? 'text-emerald-500' : 'text-slate-900'}`}>
                                    {p.originalAmount > 0 ? '+' : ''}{p.amountInTenge?.toLocaleString(undefined, { minimumFractionDigits: 2 })} ₸
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};