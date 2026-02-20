import {useQuery} from "@tanstack/react-query";
import {Roles} from "../../api/agent.ts";

export const useAdminRoles = () => {
    return useQuery({
        queryKey: ['adminRoles'],
        queryFn: Roles.list
    })
}