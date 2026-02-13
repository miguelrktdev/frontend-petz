import { ROUTES } from "@/paths"
import { api } from "@/services/axios"
import type {
    UserLoginSchemaInfer,
    UserRegisterSchemaInfer,
    VerificationEmailSchemaInfer,
} from "@/types/user-types"
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
interface UserLoginResponse {
    accessToken: string
}

export function useRegister() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (
            payload: UserRegisterSchemaInfer,
        ): Promise<UserRegisterResponse> => {
            const { data } = await api.post("users/register", payload)
            return data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
            toast.success(data.message, {
                position: "top-center",
                className: "w-fit",
            })
            navigate(ROUTES.verificationEmail)
        },
        onError: (error: AxiosError<{ message: string }>) => {
            const errorMessage = error.response?.data.message
            toast.error(errorMessage, {
                position: "top-center",
                className: "w-fit",
            })
        },
    })
}

export function useVerificationEmail() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async (
            payload: VerificationEmailSchemaInfer,
        ): Promise<VerificationEmailResponse> => {
            const { data } = await api.post("auth/verify-otp", payload)
            return data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
            toast.success(data.message, {
                position: "top-center",
                className: "w-fit",
            })
            navigate(ROUTES.login)
        },
        onError: (error: AxiosError<{ message: string }>) => {
            const errorMessage = error.response?.data.message
            toast.error(errorMessage, {
                position: "top-center",
                className: "w-fit",
            })
        },
    })
}

export function useLogin() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async (
            payload: UserLoginSchemaInfer,
        ): Promise<UserLoginResponse> => {
            const { data } = await api.post("auth/login", payload)
            return data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
            window.localStorage.setItem("accessToken", data.accessToken)
            toast.success("Usuário autenticado com sucesso!", {
                position: "top-center",
                className: "w-fit",
            })
            navigate(ROUTES.home)
        },
        onError: (error: AxiosError<{ message: string }>) => {
            const errorMessage = error.response?.data.message
            toast.error(errorMessage, {
                position: "top-center",
                className: "w-fit",
            })
        },
    })
}
