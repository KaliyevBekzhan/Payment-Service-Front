import { StatusBadge } from "../ui/StatusBadge";
import { CurrencySymbol } from "../ui/CurrencySymbol";
import type { ActionResponse } from "../../responses/responses";

interface Props {
    transaction: ActionResponse;
}

export const TransactionItem = ({ transaction }: Props) => {
    const isPositive = transaction.originalAmount > 0;

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-center">

            {/* LEFT */}
            <div className="flex items-center gap-4">

                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                    ${isPositive
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-slate-100 text-slate-600'}`}
                >
                    {CurrencySymbol(transaction.currency)}
                </div>

                <div>
                    <div
                        className={`font-bold flex items-center gap-2
                        ${isPositive
                            ? 'text-emerald-600'
                            : 'text-slate-900'}`}
                    >
                        <span className="text-sm">
                            {isPositive ? '▲' : '▼'}
                        </span>

                        {isPositive ? '+' : '-'}
                        {Math.abs(transaction.originalAmount)} {transaction.currency}
                    </div>

                    <div className="text-xs text-slate-400">
                        {transaction.comment || "Без комментария"}
                    </div>
                </div>
            </div>

            {/* RIGHT */}
            <div className="text-right flex flex-col items-end gap-1">
                <StatusBadge status={transaction.status} />

                <div className="text-sm text-slate-500">
                    {isPositive ? '+' : '-'}
                    {Math.abs(transaction.amountInTenge ?? 0).toLocaleString()} ₸
                </div>
            </div>
        </div>
    );
};
