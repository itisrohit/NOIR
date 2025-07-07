"use client"

import { useState } from "react"
import { Search, Plus, Command, Save, Menu, X, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ThemeSelector } from "@/components/theme-selector"
import { MarkdownEditor } from "@/components/markdown-editor"
import { BacklinksPanel } from "@/components/backlinks-panel"
import { CommandPalette } from "@/components/command-palette"

interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

const sampleNotes: Note[] = [
  {
    id: "1",
    title: "Getting Started with PKM",
    content: `# Getting Started with Personal Knowledge Management

Personal Knowledge Management (PKM) is the practice of collecting, organizing, and utilizing information to enhance learning and productivity.

## Key Principles

- **Capture everything**: Don't trust your memory
- **Connect ideas**: Use [[backlinks]] to create relationships
- **Review regularly**: Knowledge compounds over time

## Tools and Techniques

- Use #productivity tags to categorize notes
- Create [[Daily Notes]] for journaling
- Build a [[Zettelkasten]] system for research

## Resources

- [[Building a Second Brain]] by Tiago Forte
- [[How to Take Smart Notes]] by Sönke Ahrens`,
    tags: ["productivity", "learning", "pkm"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Daily Notes Template",
    content: `# Daily Notes - {{date}}

## Today's Focus
- [ ] 

## Notes
- 

## Reflections
- 

## Links
- [[Yesterday's Note]]
- [[Tomorrow's Planning]]

#daily #template`,
    tags: ["daily", "template"],
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
  },
  {
    id: "3",
    title: "Zettelkasten Method",
    content: `# Zettelkasten Method

The Zettelkasten method is a knowledge management system that emphasizes connecting ideas through a network of notes.

## Core Concepts

1. **Atomic Notes**: Each note should contain one idea
2. **Unique Identifiers**: Every note has a unique ID
3. **Linking**: Connect related notes with [[backlinks]]

## Benefits

- Encourages deep thinking
- Reveals unexpected connections
- Builds a personal knowledge graph

See also: [[Getting Started with PKM]]

#zettelkasten #knowledge-management`,
    tags: ["zettelkasten", "knowledge-management"],
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
  },
]

const allTags = [
  "productivity",
  "learning",
  "pkm",
  "daily",
  "template",
  "zettelkasten",
  "knowledge-management",
  "research",
  "writing",
  "ideas",
]

export function NoteTakingApp() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
  const [currentNote, setCurrentNote] = useState<Note>(sampleNotes[0])
  const [notes] = useState<Note[]>(sampleNotes)
  const [searchQuery, setSearchQuery] = useState("")
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            className="h-8 w-8 p-0"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <span className="font-semibold text-sm">Notes</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCommandPaletteOpen(true)}
            className="h-8 px-3 text-xs font-mono"
          >
            <Command className="h-3 w-3 mr-1" />
            ⌘P
          </Button>
          <ThemeSelector />
        </div>
      </div>

      <div className="flex h-[calc(100vh-49px)]">
        {/* Left Sidebar */}
        {leftSidebarOpen && (
          <div className="w-64 border-r border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="p-4 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-9 bg-background/50 border-border/50 focus:border-accent"
                />
              </div>

              {/* New Note Button */}
              <Button className="w-full justify-start h-9 bg-accent hover:bg-accent/80">
                <Plus className="h-4 w-4 mr-2" />
                New Note
              </Button>

              {/* Recent Notes */}
              <div>
                <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Recent Notes</h3>
                <ScrollArea className="h-64">
                  <div className="space-y-1">
                    {filteredNotes.map((note) => (
                      <Button
                        key={note.id}
                        variant={currentNote.id === note.id ? "secondary" : "ghost"}
                        className="w-full justify-start h-auto p-2 text-left"
                        onClick={() => setCurrentNote(note)}
                      >
                        <div className="truncate">
                          <div className="font-medium text-sm truncate">{note.title}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {note.content.split("\n")[0].replace(/^#+ /, "")}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <Separator />

              {/* Tags */}
              <div>
                <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Tags</h3>
                <div className="flex flex-wrap gap-1">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs cursor-pointer hover:bg-accent/80 transition-colors"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex">
          <MarkdownEditor note={currentNote} />
        </div>

        {/* Right Sidebar */}
        {rightSidebarOpen && (
          <div className="w-80 border-l border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Backlinks & Graph</h3>
                <Button variant="ghost" size="sm" onClick={() => setRightSidebarOpen(false)} className="h-6 w-6 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <BacklinksPanel currentNote={currentNote} notes={notes} />
            </div>
          </div>
        )}

        {/* Right Sidebar Toggle (when closed) */}
        {!rightSidebarOpen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setRightSidebarOpen(true)}
            className="absolute right-2 top-16 h-8 w-8 p-0 bg-card/80 backdrop-blur-sm border border-border/50"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Floating Save Button */}
      <Button size="sm" className="fixed bottom-6 right-6 shadow-lg bg-accent hover:bg-accent/80">
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>

      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
        notes={notes}
        onSelectNote={setCurrentNote}
      />
    </div>
  )
}
