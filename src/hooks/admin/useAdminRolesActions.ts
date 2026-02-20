import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Roles} from "../../api/agent.ts";

export const useAdminRolesActions = () => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: Roles.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminRoles"] });
        }
    });

    const update = useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) =>
            Roles.update(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminRoles"] });
        }
    })

    const remove = useMutation({
        mutationFn: Roles.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminRoles"] });
        }
    })

    return { create, update, remove };
}