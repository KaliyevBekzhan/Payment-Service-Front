import { useQuery } from "@tanstack/react-query";
import type { Currency } from "../models/models";
import { Currencies } from "../api/agent";

export const useCurrencies = () => {
    return useQuery<Currency[]>({
        queryKey: ['currencies'],
        queryFn: Currencies.listForAdmin,
        staleTime: 1000 * 60 * 5 // 5 минут кэш
    });
};
