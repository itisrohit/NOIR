"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, FileText, Hash, Plus, MoreVertical } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  notes: Note[]
  onSelectNote: (note: Note) => void
}

export function CommandPalette({ open, onOpenChange, notes, onSelectNote }: CommandPaletteProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const commands = [
    { id: "new-note", title: "New Note", icon: Plus, action: () => console.log("New note") },
    { id: "search", title: "Search Notes", icon: Search, action: () => console.log("Search") },
  ]

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
  )

  const allItems = [
    ...commands.map((cmd) => ({ ...cmd, type: "command" as const })),
    ...filteredNotes.map((note) => ({ ...note, type: "note" as const })),
  ]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, allItems.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        const selectedItem = allItems[selectedIndex]
        if (selectedItem) {
          if (selectedItem.type === "command") {
            selectedItem.action()
          } else {
            onSelectNote(selectedItem)
          }
          onOpenChange(false)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, selectedIndex, onSelectNote, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`
          ${
            isMobile
              ? "w-[96vw] max-w-sm h-auto max-h-[90vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl min-w-0"
              : "max-w-2xl w-full max-h-[90vh] top-[5vh] left-[50%] translate-x-[-50%] translate-y-0"
          } p-0 gap-0 bg-app-surface/95 backdrop-blur-xl border border-app-border/30 rounded-2xl sm:rounded-3xl shadow-2xl min-w-0`}
      >
        <DialogTitle className="sr-only">Search Notes</DialogTitle>
        <div className={`flex items-center border-b border-app-border/20 ${isMobile ? 'px-3' : 'px-2 sm:px-4 lg:px-6'} py-2 sm:py-4 flex-shrink-0 w-full min-w-0`}>
          <Search className="h-4 w-4 text-app-text-muted mr-2 sm:mr-3 flex-shrink-0" />
          <Input
            placeholder="Search notes or run a command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`border-0 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base bg-transparent text-app-text placeholder:text-app-text-muted/60 flex-1 min-w-0 w-full ${isMobile ? 'h-9' : 'h-10 sm:h-12'}`}
            autoFocus
          />
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="ml-auto flex items-center justify-center rounded-full p-2 hover:bg-app-hover focus:outline-none focus:ring-2 focus:ring-app-accent"
            aria-label="Close command palette"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-app-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <ScrollArea className="flex-1 w-full min-w-0">
          <div className="p-2 flex justify-center">
            <div className="w-full max-w-2xl px-2 sm:px-4 lg:px-6">
              {allItems.length === 0 ? (
                <div className="px-2 sm:px-4 lg:px-6 py-6 sm:py-8 text-center text-sm sm:text-base text-app-text-muted">No results found</div>
              ) : (
                allItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-2 sm:gap-3 lg:gap-4 px-2 sm:px-4 lg:px-6 py-3 sm:py-3 mx-0 sm:mx-2 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200 w-full min-w-0 ${
                      index === selectedIndex ? "bg-app-accent/10 border border-app-accent/20" : "hover:bg-app-hover"
                    }`}
                    style={{ maxWidth: '100%' }}
                    onClick={() => {
                      if (item.type === "command") {
                        item.action()
                      } else {
                        onSelectNote(item)
                      }
                      onOpenChange(false)
                    }}
                  >
                    {item.type === "command" ? (
                      <item.icon className="h-4 w-4 text-app-text-muted flex-shrink-0" />
                    ) : (
                      <FileText className="h-4 w-4 text-app-text-muted flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0 w-0">
                      <div className="font-medium text-sm sm:text-base truncate text-app-text leading-tight w-full min-w-0">
                        {item.title}
                      </div>
                      {item.type === "note" && (
                        <div className="text-xs sm:text-sm text-app-text-muted truncate mt-1 sm:mt-0.5 leading-relaxed w-full min-w-0">
                          {item.content.split("\n")[0].replace(/^#+ /, "")}
                        </div>
                      )}
                    </div>
                    {item.type === "note" && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 flex-shrink-0 max-w-full">
                        {item.tags.slice(0, isMobile ? 1 : 2).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-1.5 sm:px-2 py-1 sm:py-0.5 rounded-full text-xs bg-app-tag text-app-tag-text max-w-[7rem] truncate"
                          >
                            <Hash className="h-2 w-2 mr-0.5" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.type === "note" && (
                      <button
                        className="ml-2 p-1 rounded-full hover:bg-app-hover focus:outline-none focus:ring-0 focus:border-none text-app-text-muted"
                        tabIndex={0}
                        aria-label="More options"
                        type="button"
                        onClick={e => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
