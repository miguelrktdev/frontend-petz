import { userSchemas } from "@/schemas/user-schemas"
import { z } from "zod/v3"

export type UserRegisterSchemaInfer = z.infer<typeof userSchemas.register>
export type VerificationEmailSchemaInfer = z.infer<
    typeof userSchemas.verificationEmail
>
export type UserLoginSchemaInfer = z.infer<typeof userSchemas.login>
