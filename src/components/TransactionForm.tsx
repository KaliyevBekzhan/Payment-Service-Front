import { useState, useEffect } from 'react';
import * as agent from '../api/agent';
import { useUserCurrencies } from '../hooks/useUserCurrencies';
import { CurrencySymbol } from '../components/ui/CurrencySymbol';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {Payment} from "../models/models.ts";

interface Props {
    type: 'topup' | 'payment';
    userAccount: number;
    onClose: () => void;
}

export const TransactionForm = ({ type, userAccount, onClose }: Props) => {
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');
    const [selectedCurrencyId, setSelectedCurrencyId] = useState<number>(1);
    const { data: currencies } = useUserCurrencies(); // убрали неиспользуемый curLoading
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (payload: Payment) => {
            if (type === 'payment') {
                return agent.Payments.create(payload);
            }
            return agent.TopUps.create(payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-cabinet'] });
            onClose();
        }
    });


    // Исправляем каскадный рендер: устанавливаем ID только если он еще не задан (равен 1 или 0)
    useEffect(() => {
        if (currencies.length > 0) {
            setSelectedCurrencyId(prev => {
                const exists = currencies.some(c => c.id === prev);
                return exists ? prev : currencies[0].id;
            });
        }
    }, [currencies]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const numAmount = Number(amount);

        if (type === 'payment' && numAmount > userAccount) {
            alert("Недостаточно средств на балансе!");
            return;
        }

        mutation.mutate({
            originalAmount: numAmount,
            currencyId: selectedCurrencyId,
            comment,
            statusId: 1
        });
    };

    return (
        <div className="card-premium ring-2 ring-blue-500/10 animate-in zoom-in-95 duration-300 mb-8">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-3">
                    <span className={`w-3 h-3 rounded-full ${type === 'topup' ? 'bg-emerald-500' : 'bg-blue-600'}`}></span>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        {type === 'topup' ? 'Пополнение счета' : 'Создание платежа'}
                    </h2>
                </div>
                <button onClick={onClose} className="text-slate-300 hover:text-slate-900 font-bold transition-colors">ЗАКРЫТЬ ✖</button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                {/* Выбор валюты */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Валюта</label>
                    <select
                        value={selectedCurrencyId}
                        onChange={(e) => setSelectedCurrencyId(Number(e.target.value))}
                        className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none font-bold transition-all appearance-none cursor-pointer text-sm"
                    >
                        {currencies.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                {/* Сумма */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Сумма</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full pl-6 pr-12 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none font-black text-xl transition-all"
                            placeholder="0"
                            required
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 font-bold">
                            {/* Используем CurrencySymbol здесь */}
                            {CurrencySymbol(currencies.find(c => c.id === selectedCurrencyId)?.name || '')}
                        </span>
                    </div>
                </div>

                {/* Комментарий */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Комментарий</label>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none text-sm font-medium transition-all"
                        placeholder="Назначение..."
                    />
                </div>

                {/* Кнопка отправки */}
                <button
                    type="submit"
                    className={`py-4 rounded-2xl font-black text-white shadow-xl transition-all active:scale-95
                        ${type === 'topup' ? 'bg-emerald-500 shadow-emerald-500/20 hover:bg-emerald-600' : 'bg-blue-600 shadow-blue-500/20 hover:bg-blue-700'}`}
                >
                    ПОДТВЕРДИТЬ
                </button>
            </form>
        </div>
    );
};