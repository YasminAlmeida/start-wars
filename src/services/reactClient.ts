import { QueryClient } from "@tanstack/react-query";
import { api } from "./api";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: async ({ queryKey }) => {
                const url = `https://swapi.dev/api${queryKey[0]}`;
                const response = await api.get(url);
                return response.data;
            },
        },
    },
});