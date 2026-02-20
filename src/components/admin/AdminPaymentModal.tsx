import { usePaymentForAdmin } from "../../hooks/admin/usePaymentForAdmin.ts";
import { CurrencySymbol } from "../ui/CurrencySymbol";
import {useAdminPaymentActions} from "../../hooks/admin/useAdminPaymentsActions.ts";

interface Props {
    paymentId: number;
    onClose: () => void;
}

export const AdminPaymentModal = ({ paymentId, onClose }: Props) => {

    const { data, isLoading } = usePaymentForAdmin(paymentId);
    const { acceptMutation, declineMutation } = useAdminPaymentActions();

    const handleAccept = async () => {
        await acceptMutation.mutateAsync(paymentId);
        onClose();
    };

    const handleDecline = async () => {
        await declineMutation.mutateAsync(paymentId);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 space-y-8">

                {isLoading && (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-800"></div>
                    </div>
                )}

                {data && (
                    <>
                        {/* Заголовок */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    Платёж №{data.id}
                                </h2>
                                <p className="text-sm text-slate-500">
                                    {new Date(data.createdAt).toLocaleString()}
                                </p>
                            </div>

                            {data.status && (
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                    {data.status}
                                </span>
                            )}
                        </div>

                        {/* Контент */}
                        <div className="grid grid-cols-2 gap-8 text-sm">

                            <div className="space-y-6">

                                <div>
                                    <p className="text-slate-400 uppercase text-xs mb-2">
                                        Пользователь
                                    </p>
                                    <p><b>Имя:</b> {data.userName}</p>
                                </div>

                                <div>
                                    <p className="text-slate-400 uppercase text-xs mb-2">
                                        Кошелёк
                                    </p>
                                    <p><b>Номер:</b> {data.walletNumber}</p>
                                    <p><b>Баланс:</b> {data.account}</p>
                                </div>

                            </div>

                            <div className="space-y-6">

                                <div>
                                    <p className="text-slate-400 uppercase text-xs mb-2">
                                        Суммы
                                    </p>

                                    <p>
                                        <b>Исходная:</b>{" "}
                                        <span className="text-emerald-600 font-semibold">
                                            {data.originalAmount} {CurrencySymbol(data.currency)}
                                        </span>
                                    </p>

                                    <p>
                                        <b>В тенге:</b>{" "}
                                        <span className="text-green-600 font-semibold">
                                            {data.amountInTenge} ₸
                                        </span>
                                    </p>
                                </div>

                                {data.comment && (
                                    <div>
                                        <p className="text-slate-400 uppercase text-xs mb-2">
                                            Комментарий
                                        </p>
                                        <p className="text-slate-600">
                                            {data.comment}
                                        </p>
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* Кнопки */}
                        <div className="flex justify-end gap-4 pt-6 border-t">

                            <button
                                onClick={onClose}
                                className="px-5 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 transition"
                            >
                                Закрыть
                            </button>

                            <button
                                onClick={handleDecline}
                                disabled={declineMutation.isPending}
                                className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
                            >
                                {declineMutation.isPending ? "Отклонение..." : "Отклонить"}
                            </button>

                            <button
                                onClick={handleAccept}
                                disabled={acceptMutation.isPending}
                                className="px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-50"
                            >
                                {acceptMutation.isPending ? "Принятие..." : "Принять"}
                            </button>

                        </div>
                    </>
                )}
            </div>
        </div>
    );
};