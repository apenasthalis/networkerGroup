import { api } from "@/services/api";
import { queryOptions } from "@tanstack/react-query";

export const useQueryIntention = () => {
    return queryOptions({
        queryKey: ["intention"],
        queryFn: getIntention,
    });
}

const getIntention = async () => {
    api.get("/intentions");
}