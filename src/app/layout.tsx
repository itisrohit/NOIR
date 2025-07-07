import "./globals.css"
import type { ReactNode } from "react"
import { inter } from "@/app/fonts"

export const metadata = {
  title: "Noir – Minimal Markdown Notes",
  description: "A premium, modern markdown note-taking experience.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans antialiased`}>
      <body>{children}</body>
    </html>
  )
}
