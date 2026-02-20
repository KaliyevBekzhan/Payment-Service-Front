import type {PaymentsForAdminResponse} from "../../responses/responses.ts";
import {CurrencySymbol} from "../ui/CurrencySymbol.tsx";
import {RoleBadge} from "./RoleBadge.tsx";

interface Props {
    payment: PaymentsForAdminResponse;
    onOpen: (payment: PaymentsForAdminResponse) => void;
}

export const PaymentRow = ({ payment, onOpen }: Props) => {
    return (
        <tr className="border-b hover:bg-slate-50 transition">
            <td className="px-4 py-3 font-medium">
                #{payment.paymentId}
            </td>

            <td className="px-4 py-3">
                {payment.userName}
            </td>

            <td className="px-4 py-3">
                <RoleBadge role={payment.role} />
            </td>

            <td className="px-4 py-3 font-semibold text-green-600">
                {payment.originalAmount.toLocaleString()} {CurrencySymbol(payment.currency)}
            </td>

            <td className="px-4 py-3 font-semibold text-green-600">
                {payment.amountInTenge.toLocaleString()} ₸
            </td>

            <td className="px-4 py-3">
                {payment.account.toLocaleString()}
            </td>

            <td className="px-4 py-3 text-slate-500">
                {payment.walletNumber}
            </td>

            <td className="px-4 py-3 text-slate-500">
                {new Date(payment.createdAt).toLocaleString()}
            </td>

            <td className="px-4 py-4 text-right">
                <button
                    onClick={() => onOpen(payment)}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition"
                >
                    Open
                </button>
            </td>
        </tr>
    );
};