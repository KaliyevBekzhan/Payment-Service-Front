import { useQuery } from "@tanstack/react-query";
import * as agent from "../api/agent";

export const usePingMe = () => {
    const query = useQuery({
        queryKey: ['ping-me'],
        queryFn: agent.Auth.me,
        retry: false,            // если 401 — не долбим сервер
        refetchOnWindowFocus: false
    });

    return {
        user: query.data ?? null,
        isAuthorized: !!query.data,
        isLoading: query.isLoading,
        isError: query.isError
    };
};
