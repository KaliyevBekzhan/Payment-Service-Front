import {Payments} from "../api/agent.ts";
import {useQuery} from "@tanstack/react-query";
import type {ActionResponse} from "../responses/responses.ts";

export const usePayments = () => {
    return useQuery<ActionResponse[]>({
        queryKey: ['payments'],
        queryFn: () =>
            Payments.list({
                pageNumber: 1,
                pageSize: 50
            }),
        staleTime: 1000 * 60 * 5
    })
};