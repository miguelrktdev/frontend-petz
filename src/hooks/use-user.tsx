import { ROUTES } from "@/paths"
import { api } from "@/services/axios"
import type { UserRegisterSchemaInfer } from "@/types/user-types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

interface UserRegisterResponse {
  message: string
}

export function useRegister() {
  const querClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (payload: UserRegisterSchemaInfer): Promise<UserRegisterResponse> => {
      const { data } = await api.post("users/register", payload)
      return data
    },
    onSuccess: (data) => {
      console.log(data.message)
      querClient.invalidateQueries({ queryKey: ["user"] })
      toast.success(data.message, { position: "top-left", className: "w-fit" })
      navigate(ROUTES.verificationEmail)
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data.message
      console.error(errorMessage)
      toast.error(errorMessage, { position: "top-left", className: "w-fit" })
    },
  })
}
