import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos - dados considerados frescos
      gcTime: 1000 * 60 * 10, // 10 minutos - tempo para garbage collection
      retry: 3, // Tentativas automáticas em erro
      refetchOnWindowFocus: false, // Evita refetch desnecessário
    },
  }
})