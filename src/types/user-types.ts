import { userSchemas } from "@/schemas/user-schemas"
import { z } from "zod/v3"

export type UserRegisterSchemaInfer = z.infer<typeof userSchemas.register>
