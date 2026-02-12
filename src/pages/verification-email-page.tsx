import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useOTPStore } from "@/contexts/otp-context"
import { ROUTES } from "@/paths"
import { ChevronLeft } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import dayjs from "dayjs"
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTimer } from "react-timer-hook"

export const VerificationEmailPage = () => {
  const { email } = useOTPStore()
  const navigate = useNavigate()
  const expiryTimestamp = dayjs().add(15, "minutes").toDate()
  const { minutes, seconds } = useTimer({ expiryTimestamp })

  React.useEffect(() => {
    if (!email) {
      navigate(ROUTES.register)
    }
  }, [email, navigate])

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <main className="space-y-4 animate-slideInLeft">
        <div className="text-center space-y-1">
          <h1 className="text-2xl lg:text-3xl font-medium">Digite o código</h1>
          <div>
            <p className="text-sm lg:text-md text-stone-400">
              Por favor insira o código de 6 dígitos enviado para o email:
            </p>
            <span className="text-sm">{email}</span>
          </div>
          <span className="text-md lg:text-lg">
            {minutes}
            {minutes < 15 && ":"}
            {minutes < 15 && seconds} minutos restantes
          </span>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <InputOTP className="" maxLength={6}>
              <InputOTPGroup className="*:size-16">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <span className="block text-center text-sm">
              Não recebeu o código?{" "}
              <Button variant="link" size="lg">
                Clique para reenviar
              </Button>
            </span>
          </div>
          <Button className="w-full" size="lg">
            Confirmar cadastro
          </Button>
        </form>
        <Button size="lg" variant="secondary" className="w-full">
          <Link className="flex items-center gap-2 " to={ROUTES.register}>
            <HugeiconsIcon icon={ChevronLeft} />
            Voltar para o cadastro
          </Link>
        </Button>
      </main>
    </div>
  )
}
