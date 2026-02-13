import { userSchemas } from "@/schemas/user-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod/v3"

type VerificationEmailFormData = z.infer<typeof userSchemas.verificationEmail>

export function useValidateOTP() {
    const form = useForm<VerificationEmailFormData>({
        resolver: zodResolver(userSchemas.verificationEmail),
        defaultValues: {
            code: "",
        },
    })

    return form
}
