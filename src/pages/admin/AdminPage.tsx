import { usePaymentsForAdmin } from "../../hooks/admin/usePaymentsForAdmin.ts";
import type { PaymentsForAdminResponse } from "../../responses/responses";
import { PaymentRow } from "../../components/admin/PaymentRow";
import {AdminPaymentModal} from "../../components/admin/AdminPaymentModal.tsx";
import {useState} from "react";

export const AdminPaymentsPage = () => {
    const query = usePaymentsForAdmin();
    const data: PaymentsForAdminResponse[] = query.data ?? [];
    const [selectedId, setSelectedId] = useState<number | null>(null);

    if (query.isLoading) {
        return (
            <div className="flex justify-center p-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (query.isError) {
        return (
            <div className="text-center text-red-500 mt-10">
                Ошибка загрузки данных
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">
                Платежи (Админ)
            </h1>

            <table className="w-full text-sm border-separate border-spacing-0">
                <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wide">
                <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Original</th>
                    <th className="px-4 py-3">In ₸</th>
                    <th className="px-4 py-3">Account</th>
                    <th className="px-4 py-3">Wallet</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Action</th>
                </tr>
                </thead>
                <tbody>
                {data.map(payment => (
                    <PaymentRow
                        key={payment.paymentId}
                        payment={payment}
                        onOpen={(p) => setSelectedId(p.paymentId)}
                    />
                ))}
                </tbody>
            </table>
            {selectedId && (
                <AdminPaymentModal
                    paymentId={selectedId}
                    onClose={() => setSelectedId(null)}
                />
            )}
        </div>
    );
};