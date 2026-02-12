import { Logo } from "@/components/shared/logo"
import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen p-6">
      <div className="flex flex-col">
        <Logo />
        <Outlet />
      </div>
      <img
        className="hidden lg:block object-cover w-full min-h-full max-h-full rounded-md"
        src="./src/assets/auth_bg.jpg"
      />
    </div>
  )
}
