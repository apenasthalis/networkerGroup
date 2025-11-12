import { api } from "@/services/api";
import { queryOptions } from "@tanstack/react-query";

type Intencao = {
  id: string;
  public_id: string;
  business_name: string;
  email: string;
  reason_participation: string;
  status: "pendente" | "aceita" | "recusada";
  is_confirmed: boolean;
  created_at: string;
};

const getIntention = async () => {
  const response = await api.get("/intention");
  return response.data;
};

export const useQueryIntention = () => {
  return queryOptions<Intencao[]>({
    queryKey: ["intentions"],
    queryFn: getIntention,
  });
};
