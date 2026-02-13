import { z } from "zod/v3"

const requiredError = "A senha é obrigatória"
const minLengthError = "A senha deve ter no mínimo 8 caracteres"
const uppercaseError = "A senha deve conter pelo menos uma letra maiúscula"
const lowercaseError = "A senha deve conter pelo menos uma letra minúscula"
const numberError = "A senha deve conter pelo menos um número"
const specialCharError = "A senha deve conter pelo menos um caractere especial"

const passwordSchema = z
    .string()
    .min(1, { message: requiredError })
    .min(8, { message: minLengthError })
    .regex(/[A-Z]/, { message: uppercaseError })
    .regex(/[a-z]/, { message: lowercaseError })
    .regex(/[0-9]/, { message: numberError })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: specialCharError })

const userRegisterSchema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório" }).max(100),
    email: z
        .string()
        .min(1, { message: "E-mail obrigatório" })
        .email({ message: "Email inválido" }),
    username: z
        .string()
        .min(1, { message: "Nome de usuário é obrigatório" })
        .min(3, { message: "Nome de usuário deve ter no mínimo 3 caracteres" })
        .max(30, {
            message: "Nome de usuário deve ter no máximo 30 caracteres",
        }),
    password: passwordSchema,
    bio: z.string().min(1, { message: "Bio é obrigatória" }).max(160),
})

const userLoginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "E-mail obrigatório" })
        .email({ message: "Email inválido" }),
})

const verificationEmailSchema = z.object({
    code: z
        .string()
        .min(1, { message: "Código OTP obrigatório" })
        .regex(/^\d{6}$/, {
            message: "O código OTP deve conter exatamente 6 dígitos",
        }),
})

export const userSchemas = {
    register: userRegisterSchema,
    verificationEmail: verificationEmailSchema,
}
