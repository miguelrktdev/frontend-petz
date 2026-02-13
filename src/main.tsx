import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { App } from "./app.tsx"
import "./index.css"

import { Toaster } from "@/components/ui/sonner"
import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router } from "react-router-dom"
import { queryClient } from "./services/query-client.ts"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Router>
            <QueryClientProvider client={queryClient}>
                <Toaster />
                <App />
            </QueryClientProvider>
        </Router>
    </StrictMode>,
)
