import { NotFoundPage } from "@/pages/not-found-page"
import { Route, Routes } from "react-router-dom"
import { AuthLayout } from "./layouts/auth-layout"
import { FeedPage } from "./pages/feed-page"
import { LoginPage } from "./pages/login-page"
import { RegisterPage } from "./pages/register-page"
import { VerificationEmailPage } from "./pages/verification-email-page"

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="verification-email" element={<VerificationEmailPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}
