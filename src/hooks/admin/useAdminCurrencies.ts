import { useQuery } from "@tanstack/react-query";
import { Currencies } from "../../api/agent.ts";

export const useAdminCurrencies = () => {
    return useQuery({
        queryKey: ["adminCurrencies"],
        queryFn: Currencies.listForAdmin
    });
};