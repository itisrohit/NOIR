import { useState } from "react"
import { MoreVertical, Share2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface EditorTabMenuProps {
  onShare?: () => void
}

export default function EditorTabMenu({ onShare }: EditorTabMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleShare = () => {
    setIsOpen(false) // Close the popover immediately
    onShare?.() // Then call the share function
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className="ml-2 p-2 rounded-full hover:bg-app-hover focus:outline-none focus:ring-0 focus:border-none text-app-text-muted transition-colors"
          tabIndex={0}
          aria-label="More options"
          type="button"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent 
        side="bottom" 
        align="end" 
        className="w-40 p-1 bg-app-surface border border-app-border/30 rounded-xl shadow-lg"
        sideOffset={8}
        alignOffset={0}
      >
        <button
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-app-hover text-app-text text-sm transition-colors"
          type="button"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </PopoverContent>
    </Popover>
  )
} 