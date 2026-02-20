import { useQuery } from "@tanstack/react-query";
import { Payments } from "../../api/agent.ts";

export const usePaymentForAdmin = (id: number | null) => {
    return useQuery({
        queryKey: ["adminPayment", id],
        queryFn: () => Payments.infoForAdmin(id!),
        enabled: !!id, // ← запрос только если id есть
    });
};