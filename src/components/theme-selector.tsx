"use client"

import { Check, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

const themes = [
  { id: "noir", name: "Noir (Dark)", description: "Deep black with subtle grays" },
  { id: "aurora", name: "Aurora", description: "Deep purple sophistication" },
  { id: "glacier-blue", name: "Glacier Blue", description: "Cool blue tones" },
  { id: "monokai-midnight", name: "Monokai Midnight", description: "Rich purple and green" },
  { id: "forest-green", name: "Forest Green", description: "Natural green palette" },
] as const

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 rounded-xl hover:bg-app-hover transition-all duration-200"
        >
          <Palette className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 bg-app-surface/95 backdrop-blur-xl border border-app-border/30 rounded-2xl shadow-large p-2"
      >
        {themes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.id}
            onClick={() => setTheme(themeOption.id as any)}
            className="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-app-hover transition-all duration-200"
          >
            <div>
              <div className="font-medium text-app-text">{themeOption.name}</div>
              <div className="text-xs text-app-text-muted">{themeOption.description}</div>
            </div>
            {theme === themeOption.id && (
              <div className="w-5 h-5 rounded-full bg-app-accent flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
