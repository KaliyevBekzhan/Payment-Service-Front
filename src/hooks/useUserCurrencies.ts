import { useQuery } from "@tanstack/react-query";
import type { Currency } from "../models/models";
import { Currencies } from "../api/agent";

export const useUserCurrencies = () => {
    return useQuery<Currency[]>({
        queryKey: ['user-currencies'],
        queryFn: Currencies.listForUser,
        staleTime: 1000 * 60 * 10
    });
};
