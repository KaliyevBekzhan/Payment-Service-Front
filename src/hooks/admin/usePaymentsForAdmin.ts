import {useQuery} from "@tanstack/react-query";
import type {PaymentsForAdminResponse} from "../../responses/responses.ts";
import {Payments} from "../../api/agent.ts";

export const usePaymentsForAdmin = () => {
    return useQuery<PaymentsForAdminResponse[]>({
        queryKey: ['paymentsForAdmin'],
        queryFn: () => Payments.listForAdmin(),
        staleTime: 1000 * 60 * 5
    })
}