import type { ActionResponse } from "../../responses/responses";

interface Props {
    transactions: ActionResponse[];
    onDetailsClick?: () => void;
}

export const TransactionHistorySummary = ({
                                              transactions,
                                          }: Props) => {

    const totalCount = transactions.length;

    const totalIncome = transactions
        .filter(t => t.amountInTenge > 0)
        .reduce((sum, t) => sum + t.amountInTenge, 0);

    const totalExpense = transactions
        .filter(t => t.amountInTenge < 0)
        .reduce((sum, t) => sum + t.amountInTenge, 0);

    const net = totalIncome + totalExpense;

    const largestTransaction = transactions.length > 0
        ? [...transactions].sort(
            (a, b) =>
                Math.abs(b.amountInTenge) -
                Math.abs(a.amountInTenge)
        )[0]
        : undefined;

    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">

            <div className="flex justify-between items-center">
                <h2 className="text-xl font-black">
                    Финансовая сводка
                </h2>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                <StatCard
                    title="Всего операций"
                    value={totalCount}
                />

                <StatCard
                    title="Пополнения"
                    value={`${totalIncome.toLocaleString()} ₸`}
                    positive
                />

                <StatCard
                    title="Расходы"
                    value={`${totalExpense.toLocaleString()} ₸`}
                    negative
                />

                <StatCard
                    title="Чистый результат"
                    value={`${net.toLocaleString()} ₸`}
                    positive={net >= 0}
                    negative={net < 0}
                />

            </div>

            {largestTransaction && (
                <div className="text-sm text-slate-500">
                    Самая крупная операция:
                    <span className="font-bold text-slate-900 ml-2">
                        {largestTransaction.comment || "Без комментария"}
                    </span>
                    {" "}({largestTransaction.amountInTenge.toLocaleString()} ₸)
                </div>
            )}

        </div>
    );
};

const StatCard = ({
                      title,
                      value,
                      positive,
                      negative
                  }: {
    title: string;
    value: string | number;
    positive?: boolean;
    negative?: boolean;
}) => {

    const color =
        positive ? "text-emerald-600" :
            negative ? "text-red-600" :
                "text-slate-900";

    return (
        <div className="bg-slate-50 p-6 rounded-2xl">
            <p className="text-xs uppercase text-slate-400 font-bold">
                {title}
            </p>
            <p className={`text-2xl font-black ${color}`}>
                {value}
            </p>
        </div>
    );
};