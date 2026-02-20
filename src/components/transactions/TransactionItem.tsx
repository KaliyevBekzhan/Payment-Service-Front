import {useState} from "react";
import type {ActionResponse} from "../../responses/responses.ts";
import {StatusBadge} from "../ui/StatusBadge.tsx";
import {TransactionDetailsModal} from "./TransactionDetailModal.tsx";
import {Payments, TopUps} from "../../api/agent.ts";

interface Props {
    transaction: ActionResponse;
    type: 'payment' | 'topup';
}

export const TransactionItem = ({ transaction }: Props) => {

    const [details, setDetails] = useState<ActionResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const handleDetails = async () => {
        setLoading(true);

        try {
            const result =
                transaction.transType === "Payment"
                    ? await Payments.info(transaction.id)
                    : await TopUps.info(transaction.id);

            setDetails(result);

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-center">

                <div>
                    <div className="font-bold">
                        {transaction.amountInTenge.toLocaleString()} ₸
                    </div>
                    <div className="text-xs text-slate-400">
                        {transaction.comment}
                    </div>
                </div>

                <div className="flex gap-4 items-center">
                    <StatusBadge status={transaction.status} />

                    <button
                        onClick={handleDetails}
                        disabled={loading}
                        className="
                            px-4 py-2 text-sm font-bold rounded-xl
                            bg-blue-50 text-blue-600
                            hover:bg-blue-100
                            transition-all duration-200
                            active:scale-95
                            disabled:opacity-50
                        "
                    >
                        {loading ? "..." : "Подробнее"}
                    </button>
                </div>
            </div>

            {details && (
                <TransactionDetailsModal
                    details={details}
                    onClose={() => setDetails(null)}
                />
            )}
        </>
    );
};