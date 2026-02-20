import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {Auth} from "../../api/agent.ts";

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: Auth.logout,
        onSuccess: () => {
            queryClient.clear();
            navigate("/login");
        },
        onError: () => {
            queryClient.clear();
            navigate("/login");
        }
    });
};