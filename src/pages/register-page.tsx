import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ROUTES } from "@/paths"
import { Link } from "react-router-dom"

export const RegisterPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <main className="max-w-80 space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl lg:text-3xl font-medium">Crie sua conta!</h1>
          <p className="text-md lg:text-lg text-stone-400">
            Crie sua conta para começar a explorar o mundo dos pets
          </p>
        </div>
        <form className="space-y-6">
          <div className="space-y-3">
            <Input placeholder="Digite seu nome..." />
            <Input placeholder="Digite seu nome de usuário..." />
            <Input placeholder="Digite seu email..." />
            <Input placeholder="Digite sua senha..." />
            <Textarea
              className="h-42"
              placeholder="Nos conte um pouco sobre você..."
            />
          </div>
          <Button className={"w-full"} size={"lg"}>
            Cadastrar
          </Button>
        </form>
        <Separator />
        <span className="block text-center">
          Já possui uma conta?{" "}
          <Button variant={"link"} className={"text-base"}>
            <Link to={ROUTES.login}>Faça login</Link>
          </Button>
        </span>
      </main>
    </div>
  )
}
