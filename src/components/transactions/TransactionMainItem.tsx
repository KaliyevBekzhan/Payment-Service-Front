import { ArrowUp, ArrowDown } from "lucide-react";
import type { ActionResponse } from "../../responses/responses";
import { getTransactionVisual } from "./utils/transaction.ts";

interface Props {
    transaction: ActionResponse;
}

export const TransactionMainItem = ({ transaction }: Props) => {

    console.log("TRANS TYPE:", transaction.transType);
    const { amountColor, bgColor, arrowDirection } =
        getTransactionVisual(transaction.transType);

    const formattedAmount =
        Math.abs(transaction.amountInTenge).toLocaleString();

    return (
        <div className={`flex justify-between items-center p-4 rounded-xl ${bgColor}`}>

            <div className="flex flex-col">
                <span className="font-semibold text-sm">
                    {transaction.comment}
                </span>

                <span className="text-xs text-slate-400">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                </span>
            </div>

            <div className={`flex items-center gap-2 font-bold ${amountColor}`}>

                {arrowDirection === "up"
                    ? <ArrowUp size={16} />
                    : <ArrowDown size={16} />
                }

                {formattedAmount} ₸
            </div>
            console.log(transaction.transType, transaction.amountInTenge);
        </div>
    );
};