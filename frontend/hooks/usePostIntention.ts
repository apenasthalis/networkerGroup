import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

interface IntentionData {
  name: string;
  business_name: string;
  email: string;
  reason_participation: string;
}

const postIntention = async (data: IntentionData) => {
  const response = await api.post("/intention", data);
  return response.data;
};

export const usePostIntention = () => {
  return useMutation({
    mutationFn: postIntention,
  });
};
