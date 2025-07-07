import { X, Palette, Bell, Shield, Database, Monitor, Globe, User, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { ReactNode } from "react"

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface SettingsItem {
  label: string
  value: string
  badge?: string
  customComponent?: ReactNode
}

const themes = [
  { id: "noir", name: "Noir (Dark)", description: "Deep black with subtle grays" },
  { id: "aurora", name: "Aurora", description: "Deep purple sophistication" },
  { id: "glacier-blue", name: "Glacier Blue", description: "Cool blue tones" },
  { id: "monokai-midnight", name: "Monokai Midnight", description: "Rich purple and green" },
  { id: "forest-green", name: "Forest Green", description: "Natural green palette" },
] as const

export default function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { theme, setTheme } = useTheme()

  const currentTheme = themes.find(t => t.id === theme) || themes[1] // Default to Aurora

  const settingsSections = [
    {
      title: "Appearance",
      icon: Palette,
      description: "Customize your workspace",
      items: [
        { 
          label: "Theme", 
          value: currentTheme.name, 
          customComponent: (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm border-app-border/30 hover:bg-app-hover/50 hover:border-app-border/50 rounded-xl px-3 sm:px-4 py-2 bg-app-surface/50 text-app-text hover:text-app-text"
                >
                  {currentTheme.name}
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
        },
        { label: "Font Size", value: "Medium" },
        { label: "Compact Mode", value: "Off" },
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      description: "Manage your alerts",
      items: [
        { label: "Desktop Notifications", value: "On" },
        { label: "Sound Alerts", value: "Off" },
        { label: "Reminder Frequency", value: "Daily" },
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      description: "Control your data",
      items: [
        { label: "Auto-save", value: "Every 30s" },
        { label: "Data Encryption", value: "Enabled" },
        { label: "Backup Frequency", value: "Daily" },
      ]
    },
    {
      title: "Storage",
      icon: Database,
      description: "Manage your storage",
      items: [
        { label: "Used Space", value: "2.4 GB" },
        { label: "Total Space", value: "10 GB" },
        { label: "Auto-cleanup", value: "Enabled" },
      ]
    },
    {
      title: "Display",
      icon: Monitor,
      description: "Screen preferences",
      items: [
        { label: "Sidebar Width", value: "Compact" },
        { label: "Editor Font", value: "JetBrains Mono" },
        { label: "Line Height", value: "1.8" },
      ]
    },
    {
      title: "Language",
      icon: Globe,
      description: "Regional settings",
      items: [
        { label: "Interface Language", value: "English" },
        { label: "Date Format", value: "MM/DD/YYYY" },
        { label: "Time Zone", value: "UTC-5" },
      ]
    }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[92vw] sm:max-w-3xl h-[85vh] sm:h-[85vh] p-0 bg-app-surface/98 backdrop-blur-xl border border-app-border/20 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden mx-auto">
        <DialogHeader className="flex-shrink-0 p-4 sm:p-8 pb-4 sm:pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-app-accent/20 to-app-accent/10 text-app-accent border border-app-accent/20">
                <User className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <DialogTitle className="text-lg sm:text-2xl font-bold text-app-text">Settings</DialogTitle>
                <p className="text-xs sm:text-sm text-app-text-muted mt-1">Customize your experience</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-xl sm:rounded-2xl hover:bg-app-hover/50 text-app-text-muted hover:text-app-text transition-all duration-200"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-4 sm:pb-8">
          <div className="grid gap-6 sm:gap-8">
          {settingsSections.map((section, index) => (
              <div key={index} className="space-y-4 sm:space-y-5">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-app-surface/60 text-app-accent border border-app-border/10">
                    <section.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                    <h3 className="text-base sm:text-lg font-semibold text-app-text">{section.title}</h3>
                    <p className="text-xs sm:text-sm text-app-text-muted">{section.description}</p>
                </div>
              </div>
              
                <div className="space-y-2 sm:space-y-3 ml-12 sm:ml-16">
                {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-app-surface/30 border border-app-border/10 hover:bg-app-surface/50 hover:border-app-border/20 transition-all duration-200 group">
                      <span className="text-xs sm:text-sm font-medium text-app-text">{item.label}</span>
                      <div className="flex items-center gap-2 sm:gap-3">
                      {item.badge && (
                          <Badge className="text-xs bg-gradient-to-r from-app-accent/20 to-app-accent/10 text-app-accent border border-app-accent/20 px-2 py-1">
                          {item.badge}
                        </Badge>
                      )}
                        {item.customComponent ? (
                          item.customComponent
                        ) : (
                          <span className="text-xs sm:text-sm text-app-text-muted font-medium">{item.value}</span>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>

        <div className="flex-shrink-0 p-4 sm:p-8 pt-4 sm:pt-6 border-t border-app-border/10 bg-gradient-to-r from-app-surface/50 to-app-surface/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="text-xs text-app-text-muted font-medium">
              Version 1.0.0 • Made with ❤️
            </div>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs sm:text-sm border-app-border/20 hover:bg-app-hover/50 hover:border-app-border/30 rounded-xl px-3 sm:px-4 py-2 flex-1 sm:flex-none"
              >
                Reset
              </Button>
              <Button 
                size="sm" 
                className="text-xs sm:text-sm bg-gradient-to-r from-app-accent to-app-accent/90 hover:from-app-accent-hover hover:to-app-accent text-app-accent-text rounded-xl px-3 sm:px-4 py-2 shadow-lg flex-1 sm:flex-none"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 