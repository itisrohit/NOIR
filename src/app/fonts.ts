import { Inter } from "next/font/google"

/* Exports a CSS variable – use it anywhere (e.g. `font-sans`) */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})
