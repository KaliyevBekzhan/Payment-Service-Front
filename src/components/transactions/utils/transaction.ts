export type TransactionType = "Payment" | "TopUp";

export const getTransactionVisual = (type: TransactionType) => {

    const config = {
        TopUp: {
            amountColor: "text-emerald-600",
            bgColor: "bg-emerald-50",
            arrowDirection: "up"
        },
        Payment: {
            amountColor: "text-red-600",
            bgColor: "bg-red-50",
            arrowDirection: "down"
        }
    };

    return config[type];
};