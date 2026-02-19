import { useQuery } from "@tanstack/react-query";
import type { MyCabinetResponse } from "../responses/responses";
import * as agent from "../api/agent";

export const useMyCabinet = () => {
    return useQuery<MyCabinetResponse>({
        queryKey: ['my-cabinet'],
        queryFn: agent.User.myCabinet,
        staleTime: 1000 * 30,
        retry: 1
    });
};
