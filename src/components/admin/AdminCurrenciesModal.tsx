import { useState } from "react";
import type { Currency } from "../../models/models";
import { useAdminCurrencyActions } from "../../hooks/admin/useAdminCurrencyActions";

interface Props {
    currency: Currency;
    onClose: () => void;
}

export const AdminCurrenciesModal = ({ currency, onClose }: Props) => {

    const { update, remove } = useAdminCurrencyActions();

    const [name, setName] = useState(currency.name);
    const [rate, setRate] = useState(currency.conversionRate);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = async () => {
        await update.mutateAsync({
            id: currency.id,
            data: { name, conversionRate: rate }
        });
        onClose();
    };

    const handleDelete = async () => {
        await remove.mutateAsync(currency.id);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">

                <h2 className="text-xl font-bold">
                    Валюта №{currency.id}
                </h2>

                <div className="space-y-4 text-sm">

                    {/* Название */}
                    <div>
                        <label className="block text-xs uppercase text-slate-400 mb-2">
                            Название
                        </label>

                        {isEditing ? (
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-800"
                            />
                        ) : (
                            <div className="px-3 py-2 bg-slate-100 rounded-lg">
                                {currency.name}
                            </div>
                        )}
                    </div>

                    {/* Курс */}
                    <div>
                        <label className="block text-xs uppercase text-slate-400 mb-2">
                            Курс к ₸
                        </label>

                        {isEditing ? (
                            <input
                                type="number"
                                step="0.01"
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-800"
                            />
                        ) : (
                            <div className="px-3 py-2 bg-slate-100 rounded-lg font-semibold text-emerald-600">
                                {currency.conversionRate?.toFixed(2)} ₸
                            </div>
                        )}
                    </div>

                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300"
                    >
                        Закрыть
                    </button>

                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Редактировать
                        </button>
                    )}

                    {isEditing && (
                        <button
                            onClick={handleSave}
                            disabled={update.isPending}
                            className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
                        >
                            {update.isPending ? "Сохранение..." : "Сохранить"}
                        </button>
                    )}

                    <button
                        onClick={handleDelete}
                        disabled={remove.isPending}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
                    >
                        {remove.isPending ? "Удаление..." : "Удалить"}
                    </button>

                </div>
            </div>
        </div>
    );
};