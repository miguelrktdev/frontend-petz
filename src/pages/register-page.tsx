import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupButton } from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useRegister } from "@/hooks/use-user"
import { ROUTES } from "@/paths"
import { userSchemas } from "@/schemas/user-schemas"
import type { UserRegisterSchemaInfer } from "@/types/user-types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loading01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import React from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Link } from "react-router-dom"

export const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserRegisterSchemaInfer>({
        resolver: zodResolver(userSchemas.register),
    })
    const { mutate, isPending } = useRegister()
    const [showPassword, setShowPassword] = React.useState(false)

    const handleRegisterUser: SubmitHandler<UserRegisterSchemaInfer> = (
        data: UserRegisterSchemaInfer,
    ) => {
        window.localStorage.setItem("email", data.email)
        mutate(data)
    }

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <main className="max-w-80 space-y-6 animate-slideInLeft">
                <div className="space-y-1 text-center">
                    <h1 className="text-2xl lg:text-3xl font-medium">
                        Crie sua conta! 🐶
                    </h1>
                    <p className="text-md lg:text-lg text-stone-400">
                        Crie sua conta para começar a explorar o mundo dos pets
                    </p>
                </div>
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(handleRegisterUser)}
                >
                    <div className="space-y-3">
                        <Input
                            placeholder="Digite seu nome..."
                            {...register("name")}
                        />
                        <Input
                            placeholder="Digite seu nome de usuário..."
                            {...register("username")}
                        />
                        <Input
                            placeholder="Digite seu email..."
                            {...register("email")}
                        />
                        <InputGroup>
                            <Input
                                placeholder="Digite sua senha..."
                                {...register("password")}
                                type={showPassword ? "text" : "password"}
                            />
                            <InputGroupButton
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? "Esconder" : "Mostrar"}
                            </InputGroupButton>
                        </InputGroup>
                        <Textarea
                            className="h-42"
                            placeholder="Nos conte um pouco sobre você..."
                            {...register("bio")}
                        />
                    </div>
                    <Button type="submit" className={"w-full"} size={"lg"}>
                        {isPending ? (
                            <HugeiconsIcon
                                icon={Loading01Icon}
                                className="animate-spin"
                            />
                        ) : (
                            "Cadastrar"
                        )}
                    </Button>
                </form>
                {Object.keys(errors).length > 0 && (
                    <div className="space-y-1">
                        {Object.entries(errors).map(([field, error]) => (
                            <p key={field} className="text-sm text-red-500">
                                {error.message}
                            </p>
                        ))}
                    </div>
                )}
                <Separator />
                <Button size={"lg"} variant={"secondary"} className={"w-full"}>
                    <Link to={ROUTES.login}>Já tenho uma conta</Link>
                </Button>
            </main>
        </div>
    )
}
