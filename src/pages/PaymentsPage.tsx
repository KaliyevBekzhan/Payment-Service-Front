import { usePayments } from "../hooks/usePayments";
import {TransactionItem} from "../components/transactions/transactions.tsx";

export const PaymentsPage = () => {
    const { data = [], isLoading, isError } = usePayments();

    if (isLoading) {
        return <div className="p-6">Загрузка платежей...</div>;
    }

    if (isError) {
        return <div className="p-6 text-red-500">Ошибка загрузки платежей</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-black">Мои платежи</h1>

            <div className="space-y-3">
                {data.length === 0 && (
                    <div className="text-slate-400">
                        Платежей пока нет
                    </div>
                )}

                {data.map(t => (
                    <TransactionItem key={t.id} transaction={t} />
                ))}
            </div>
        </div>
    );
};
