import { ROUTES } from "@/paths"
import { api } from "@/services/axios"
import type { UserRegisterSchemaInfer, VerificationEmailSchemaInfer } from "@/types/user-types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

interface UserRegisterResponse {
    message: string
}
interface VerificationEmailResponse {
    message: string
}

export function useRegister() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (payload: UserRegisterSchemaInfer): Promise<UserRegisterResponse> => {
            const { data } = await api.post("users/register", payload)
            return data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
            toast.success(data.message, { position: "top-left", className: "w-fit" })
            navigate(ROUTES.verificationEmail)
        },
        onError: (error: AxiosError<{ message: string }>) => {
            const errorMessage = error.response?.data.message
            toast.error(errorMessage, { position: "top-left", className: "w-fit" })
        },
    })
}

export function useVerificationEmail() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async (payload: VerificationEmailSchemaInfer): Promise<VerificationEmailResponse> => {
            const { data } = await api.post("auth/verify-otp", payload)
            return data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
            toast.success(data.message, { position: "top-left", className: "w-fit" })
            navigate(ROUTES.login)
        },
        onError: (error: AxiosError<{ message: string }>) => {
            const errorMessage = error.response?.data.message
            toast.error(errorMessage, { position: "top-left", className: "w-fit" })
        },
    })
}
