import {TopUps} from "../api/agent.ts";
import {useQuery} from "@tanstack/react-query";
import type {ActionResponse} from "../responses/responses.ts";

export const useTopUps = () => {
  return useQuery<ActionResponse[]>({
      queryKey: ['top-ups'],
      queryFn: TopUps.list,
      staleTime: 1000 * 60 * 5
  })
};