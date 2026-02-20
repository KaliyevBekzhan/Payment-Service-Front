import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Payments } from "../../api/agent.ts";

export const useAdminPaymentActions = () => {
    const queryClient = useQueryClient();

    const acceptMutation = useMutation({
        mutationFn: (id: number) => Payments.accept(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["paymentsForAdmin"] });
        }
    });

    const declineMutation = useMutation({
        mutationFn: (id: number) => Payments.decline(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["paymentsForAdmin"] });
        }
    });

    return {
        acceptMutation,
        declineMutation
    };
};