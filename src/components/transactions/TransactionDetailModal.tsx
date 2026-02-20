import type { ActionResponse } from "../../responses/responses";

interface Props {
    details: ActionResponse;
    onClose: () => void;
}

export const TransactionDetailsModal = ({ details, onClose }: Props) => {

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
            onClick={onClose} // 👈 клик по overlay
        >

            <div
                className="bg-white p-8 rounded-2xl w-[420px] shadow-2xl animate-scaleIn"
                onClick={(e) => e.stopPropagation()} // 👈 блокируем всплытие
            >
                <h2 className="font-black text-lg mb-6">
                    Детали операции
                </h2>

                <div className="space-y-3 text-sm">

                    <DetailRow label="ID">
                        {details.id}
                    </DetailRow>

                    <DetailRow label="Сумма">
                        {details.originalAmount} {details.currency}
                    </DetailRow>

                    <DetailRow label="В тенге">
                        {details.amountInTenge.toLocaleString()} ₸
                    </DetailRow>

                    <DetailRow label="Статус">
                        {details.status}
                    </DetailRow>

                    {details.createdAt && (
                        <DetailRow label="Дата">
                            {new Date(details.createdAt).toLocaleString()}
                        </DetailRow>
                    )}

                </div>
            </div>
        </div>
    );
};

const DetailRow = ({
                       label,
                       children
                   }: {
    label: string;
    children: React.ReactNode;
}) => (
    <div className="flex justify-between border-b pb-2">
        <span className="text-slate-400">{label}</span>
        <span className="font-semibold">{children}</span>
    </div>
);