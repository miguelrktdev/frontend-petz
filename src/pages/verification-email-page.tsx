import { Button } from "@/components/ui/button"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useVerificationEmail } from "@/hooks/use-user"
import { useValidateOTP } from "@/hooks/use-validate-otp"
import { ROUTES } from "@/paths"
import { ChevronLeft, Loading01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import dayjs from "dayjs"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import React from "react"
import { Controller } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useTimer } from "react-timer-hook"

const EXPIRES_TIME_KEY = "expires_time_key"

export const VerificationEmailPage = () => {
    const { mutate, isPending } = useVerificationEmail()
    const email = window.localStorage.getItem("email")

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useValidateOTP()
    const [initialExpiryTimestamp, setInitialTimestamp] = React.useState(
        new Date(),
    )
    const { minutes, seconds, restart } = useTimer({
        expiryTimestamp: initialExpiryTimestamp,
    })
    const [isReady, setIsReady] = React.useState(false)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!email) {
            navigate(ROUTES.register)
        }
    }, [email, navigate])

    React.useEffect(() => {
        setInitialTimestamp(dayjs().add(15, "minutes").toDate())
    }, [])

    React.useEffect(() => {
        const handleLocalStorageTimer = () => {
            const localExpiresTime =
                window.localStorage.getItem(EXPIRES_TIME_KEY)

            let expireDate: Date

            if (localExpiresTime) {
                const parsedDate = new Date(localExpiresTime)

                if (parsedDate > new Date()) {
                    expireDate = parsedDate
                } else {
                    expireDate = dayjs().add(15, "minutes").toDate()
                    window.localStorage.setItem(
                        EXPIRES_TIME_KEY,
                        expireDate.toISOString(),
                    )
                }
            } else {
                expireDate = dayjs().add(15, "minutes").toDate()
                window.localStorage.setItem(
                    EXPIRES_TIME_KEY,
                    expireDate.toISOString(),
                )
            }

            restart(expireDate)
            setIsReady(true)
        }

        handleLocalStorageTimer()
    }, [restart])

    const onSubmit = ({ code }: { code: string }) => {
        window.localStorage.removeItem("email")
        mutate({ code })
    }

    const handleResetTimer = () => {
        const newTimer = dayjs().add(15, "minutes").toDate()
        restart(newTimer)
        window.localStorage.removeItem(EXPIRES_TIME_KEY)
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <main className="space-y-4 animate-slideInLeft">
                <div className="text-center space-y-1">
                    <h1 className="text-2xl lg:text-3xl font-medium">
                        Digite o código
                    </h1>
                    <div>
                        <p className="text-sm lg:text-md text-stone-400">
                            Por favor insira o código de 6 dígitos enviado para
                            o email:
                        </p>
                        <span className="text-sm">{email}</span>
                    </div>
                    {isReady && (
                        <span>
                            {minutes}:{seconds.toString().padStart(2, "0")}{" "}
                            minutos restantes
                        </span>
                    )}
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Controller
                            name="code"
                            control={control}
                            render={({ field }) => (
                                <InputOTP
                                    pattern={REGEXP_ONLY_DIGITS}
                                    maxLength={6}
                                    value={field.value}
                                    onChange={field.onChange}
                                >
                                    <InputOTPGroup className="*:size-16">
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            )}
                        />
                        {errors.code && (
                            <span className="block text-center text-sm text-red-500">
                                {errors.code.message}
                            </span>
                        )}
                        <span className="block text-center text-sm">
                            Não recebeu o código?{" "}
                            <Button type="button" variant="link" size="lg">
                                Clique para reenviar
                            </Button>
                        </span>
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                        {isPending ? (
                            <HugeiconsIcon icon={Loading01Icon} />
                        ) : (
                            "Confirmar cadastro"
                        )}
                    </Button>
                </form>
                <Button
                    onClick={handleResetTimer}
                    size="lg"
                    variant="secondary"
                    className="w-full"
                >
                    <Link
                        className="flex items-center gap-2"
                        to={ROUTES.register}
                    >
                        <HugeiconsIcon icon={ChevronLeft} />
                        Voltar para o cadastro
                    </Link>
                </Button>
            </main>
        </div>
    )
}
