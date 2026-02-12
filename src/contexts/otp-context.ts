import { create } from "zustand"

interface OTPState {
  email: string | null
  saveEmail(email: string): void
}

export const useOTPStore = create<OTPState>((set) => ({
  email: null,
  saveEmail(newEmail) {
    set({ email: newEmail })
  },
}))