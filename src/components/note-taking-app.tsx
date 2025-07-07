"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Command, Menu, X, Share2, MoreVertical, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MarkdownEditor } from "@/components/markdown-editor"
import { BacklinksPanel } from "@/components/backlinks-panel"
import { CommandPalette } from "@/components/command-palette"
import SettingsModal from "@/components/settings-modal"

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
- [[How to Take Smart Notes]] by Sönke Ahrens
- [[Knowledge Management]] best practices`,
    tags: ["productivity", "learning", "pkm"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Daily Notes Template",
    content: `# Daily Notes - {{date}}

## Today's Focus
- [ ] Complete project proposal
- [ ] Review team feedback
- [ ] Plan tomorrow's priorities

## Notes
- Had a great discussion about [[Knowledge Management]]
- Need to explore #automation tools
- Consider implementing [[Zettelkasten Method]]

## Reflections
- Focus on deep work sessions
- Minimize context switching

## Links
- [[Yesterday's Note]]
- [[Tomorrow's Planning]]

#daily #template #reflection`,
    tags: ["daily", "template", "reflection"],
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

## Implementation

Start with [[Getting Started with PKM]] and create your first [[Daily Notes]].

Use #zettelkasten #knowledge-management tags for organization.

See also: [[Building a Second Brain]]`,
    tags: ["zettelkasten", "knowledge-management", "method"],
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
  },
  {
    id: "4",
    title: "Building a Second Brain",
    content: `# Building a Second Brain

A methodology for creating a personal knowledge management system that acts as an extension of your thinking.

## The CODE Method

- **Capture**: Save valuable information
- **Organize**: Structure for actionability  
- **Distill**: Extract key insights
- **Express**: Share your knowledge

## Key Insights

Connected to [[Getting Started with PKM]] and builds on [[Zettelkasten Method]] principles.

Use #productivity and #learning tags to track progress.

## Implementation Notes

- Start small with [[Daily Notes Template]]
- Focus on [[Knowledge Management]] fundamentals
- Build connections through consistent practice`,
    tags: ["productivity", "learning", "method"],
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "5",
    title: "Knowledge Management",
    content: `# Knowledge Management

The systematic approach to capturing, distributing, and effectively using knowledge.

## Types of Knowledge

- **Explicit**: Documented, codified knowledge
- **Tacit**: Personal, experiential knowledge  
- **Implicit**: Knowledge that can be inferred

## Best Practices

Referenced in [[Getting Started with PKM]] and [[Building a Second Brain]].

Essential for implementing [[Zettelkasten Method]] effectively.

Use with [[Daily Notes Template]] for consistent capture.

#knowledge-management #learning #productivity`,
    tags: ["knowledge-management", "learning", "productivity"],
    createdAt: new Date("2024-01-11"),
    updatedAt: new Date("2024-01-11"),
  },
  {
    id: "6",
    title: "How to Take Smart Notes",
    content: `# How to Take Smart Notes

By Sönke Ahrens - A guide to the [[Zettelkasten Method]] for students, academics, and knowledge workers.

## Core Principles

- One idea per note
- Connect everything
- Think on paper

## Connection to Other Ideas

Complements [[Building a Second Brain]] methodology.
Essential reading for [[Getting Started with PKM]].
Works well with [[Daily Notes Template]] workflow.

Perfect foundation for [[Knowledge Management]] practices.

#zettelkasten #learning #method #research`,
    tags: ["zettelkasten", "learning", "method", "research"],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
]

const allTags = [
  "productivity",
  "learning",
  "pkm",
  "daily",
  "template",
  "reflection",
  "zettelkasten",
  "knowledge-management",
  "method",
  "research",
  "writing",
  "ideas",
]

export function NoteTakingApp() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
  const [currentNote, setCurrentNote] = useState<Note>(sampleNotes[0])
  const [notes] = useState<Note[]>(sampleNotes)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [noteTemplatesOpen, setNoteTemplatesOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setLeftSidebarOpen(false)
        // setRightSidebarOpen(false) // Do not force open on desktop
      } else {
        setLeftSidebarOpen(true)
        // setRightSidebarOpen(true) // Do not force open on desktop
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const filteredNotes = notes

  const handleNoteSelect = (note: Note) => {
    setCurrentNote(note)
    if (isMobile) {
      setLeftSidebarOpen(false)
      setRightSidebarOpen(false)
    }
  }

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-app-bg text-app-text transition-all duration-300 ease-out flex">
        {/* Left Sidebar */}
        <aside
          className={`${
            leftSidebarOpen ? "w-full sm:w-60 md:w-56 lg:w-60 xl:w-72" : "w-0"
          } transition-all duration-300 ease-out bg-app-surface/30 backdrop-blur-xl border-r border-app-border shadow-soft overflow-hidden flex-shrink-0 ${
            isMobile ? (leftSidebarOpen ? "fixed inset-y-0 left-0 z-40" : "hidden") : "relative"
          }`}
        >
        <div className="h-full flex flex-col">
          {/* Sidebar Header with Menu Button */}
          <div className="flex-shrink-0 p-3 sm:p-4 lg:p-6 pb-2 sm:pb-3 lg:pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-app-accent/20 to-app-accent/10 border border-app-accent/20 flex items-center justify-center">
                  <span className="text-sm sm:text-base font-semibold text-app-accent">RK</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-app-text text-sm sm:text-base">Rohit Kumar</span>
                  <span className="text-xs text-app-text-muted">Premium User</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                className="h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-xl hover:bg-app-hover transition-all duration-200 flex-shrink-0 text-app-text hover:text-app-text"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 pt-2 sm:pt-3 lg:pt-4">
            <div className="space-y-3 sm:space-y-4">
              {/* Mobile Close Button */}
              {isMobile && (
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-app-text">Navigation</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLeftSidebarOpen(false)}
                    className="h-8 w-8 p-0 rounded-xl hover:bg-app-hover text-app-text hover:text-app-text"
                    aria-label="Close sidebar"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Command Palette Button */}
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 justify-start h-9 sm:h-10 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-app-surface/80 border border-app-border/30 text-app-text hover:bg-app-hover transition-all duration-200 font-normal mb-2 text-sm"
                onClick={() => setCommandPaletteOpen(true)}
                aria-label="Open Command Palette"
              >
                <Command className="h-4 w-4 text-app-text-muted" />
                <span className="text-sm">Command Palette</span>
              </Button>

              {/* New Note Button */}
              <Button className="w-full h-9 sm:h-10 bg-app-accent hover:bg-app-accent-hover text-app-accent-text rounded-lg sm:rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 font-normal text-sm">
                <Plus className="h-4 w-4 mr-2" />
                New Note
              </Button>

              {/* Recent Notes (show up to 3, not scrollable) */}
              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-xs sm:text-sm font-semibold text-app-text-muted uppercase tracking-wider px-1">
                  Recent Notes
                </h3>
                <div className="space-y-2">
                  {filteredNotes.slice(0, 3).map((note) => (
                    <div
                      key={note.id}
                      className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200 group border flex flex-col ${
                        currentNote.id === note.id
                          ? "bg-app-accent/10 border-app-accent/30 shadow-soft"
                          : "hover:bg-app-hover border-transparent hover:border-app-border"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1 sm:mb-2 w-full">
                        <h4
                          className="font-medium text-app-text truncate flex-1 text-xs sm:text-sm"
                          onClick={() => handleNoteSelect(note)}
                        >
                          {note.title}
                        </h4>
                        <button
                          className="ml-1 p-1 rounded-full hover:bg-app-hover focus:outline-none focus:ring-0 focus:border-none text-app-text-muted opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200"
                          tabIndex={0}
                          aria-label="More options"
                          type="button"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                      <p
                        className="text-xs text-app-text-muted line-clamp-2 leading-relaxed mb-1 sm:mb-2"
                        onClick={() => handleNoteSelect(note)}
                      >
                        {note.content
                          .split("\n")
                          .find((line) => line.trim() && !line.startsWith("#"))
                          ?.substring(0, 80) + "..."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note Templates Card */}
              <div
                className="mt-3 mb-2 p-3 rounded-xl bg-app-surface/80 border border-app-border/30 shadow-soft hover:shadow-medium cursor-pointer flex items-center gap-2 transition-all duration-200 group"
                onClick={() => setNoteTemplatesOpen(true)}
                role="button"
                tabIndex={0}
                aria-label="Open Note Templates"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-app-accent/15 text-app-accent">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2"/><path d="M8 8h8v8H8z" fill="currentColor" opacity=".15"/></svg>
                </span>
                <div>
                  <div className="font-semibold text-app-text text-base">Note Templates</div>
                  <div className="text-xs text-app-text-muted">Create & use templates</div>
                </div>
              </div>

              {/* Trash Button (theme-consistent) */}
              <button
                className="mb-2 w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-app-surface/80 border border-app-border/30 hover:text-red-500 transition-all duration-200 cursor-pointer group focus:outline-none"
                aria-label="Open Trash"
                type="button"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-app-surface text-red-400 group-hover:text-red-500 transition-colors">
                  <Trash className="h-5 w-5" />
                </span>
                <span className="font-medium text-sm group-hover:text-red-500 transition-colors">Trash</span>
              </button>

              {/* Settings Shortcut (distinct style) */}
              <button
                className="mb-1 flex items-center gap-2 bg-transparent hover:bg-app-hover/40 rounded-lg p-1 transition-colors duration-150 cursor-pointer group focus:outline-none"
                onClick={() => setSettingsOpen(true)}
                aria-label="Open Settings"
                type="button"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-app-text-muted group-hover:text-app-accent transition-colors">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.427-1.64 2.923-1.64 3.35 0a1.724 1.724 0 0 0 2.573 1.01c1.453-.83 3.098.814 2.268 2.268a1.724 1.724 0 0 0 1.01 2.572c1.64.428 1.64 2.924 0 3.352a1.724 1.724 0 0 0-1.01 2.572c.83 1.454-.815 3.099-2.268 2.269a1.724 1.724 0 0 0-2.573 1.01c-.427 1.64-2.923 1.64-3.35 0a1.724 1.724 0 0 0-2.573-1.01c-1.453.83-3.098-.815-2.268-2.269a1.724 1.724 0 0 0-1.01-2.572c-1.64-.428-1.64-2.924 0-3.352a1.724 1.724 0 0 0 1.01-2.572c-.83-1.454.815-3.098 2.268-2.268a1.724 1.724 0 0 0 2.573-1.01ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
                </span>
                <div className="flex flex-col items-start">
                  <span className="font-medium text-app-text text-sm">Settings</span>
                  <span className="text-xs text-app-text-muted">Customize your app</span>
                </div>
              </button>

              {/* Add extra margin at the bottom for spacing */}
              <div className="mb-1" />
            </div>
            </div>
          </div>
        </aside>

      {/* Floating Menu Button (when sidebar is closed) */}
      {!leftSidebarOpen && !isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLeftSidebarOpen(true)}
            className="h-10 w-10 p-0 rounded-xl hover:bg-app-hover/80 bg-app-surface/80 backdrop-blur-xl border border-app-border/30 shadow-soft transition-all duration-200 text-app-text hover:text-app-text"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col bg-app-bg min-w-0 relative">
        <MarkdownEditor 
          note={currentNote} 
          onShare={() => setRightSidebarOpen(true)}
          sidebarOpen={leftSidebarOpen}
        />
        </main>

        {/* Right Sidebar */}
        <aside
          className={`${
            rightSidebarOpen ? "w-full sm:w-80 md:w-72 lg:w-80 xl:w-96" : "w-0"
          } transition-all duration-300 ease-out bg-app-surface/30 backdrop-blur-xl border-l border-app-border shadow-soft overflow-hidden flex-shrink-0 ${
            isMobile ? (rightSidebarOpen ? "fixed inset-y-0 right-0 z-40" : "hidden") : "relative"
          }`}
        >
          <div className="h-full overflow-y-auto scrollbar-thin">
            <div className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-xs sm:text-sm font-semibold text-app-text-muted uppercase tracking-wider">
                  Connections
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRightSidebarOpen(false)}
                  className="h-7 w-7 sm:h-8 sm:w-8 p-0 rounded-xl hover:bg-app-hover transition-all duration-200 text-app-text hover:text-app-text"
                  aria-label="Close connections panel"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            <BacklinksPanel 
              currentNote={currentNote} 
              notes={notes} 
            />
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {isMobile && (leftSidebarOpen || rightSidebarOpen) && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            onClick={() => {
              setLeftSidebarOpen(false)
              setRightSidebarOpen(false)
            }}
          />
        )}

      {/* Command Palette */}
      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
        notes={notes}
        onSelectNote={handleNoteSelect}
      />

      {/* Settings Modal */}
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  )
}
