import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Currencies } from "../../api/agent.ts";

export const useAdminCurrencyActions = () => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: Currencies.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminCurrencies"] });
        }
    });

    const update = useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) =>
            Currencies.update(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminCurrencies"] });
        }
    });

    const remove = useMutation({
        mutationFn: Currencies.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminCurrencies"] });
        }
    });

    return { create, update, remove };
};