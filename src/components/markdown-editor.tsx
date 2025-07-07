"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Edit3, Eye, FileText, Calendar, Columns2, MoreVertical, Share2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import EditorTabMenu from "@/components/editor-tab-menu"

interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

interface MarkdownEditorProps {
  note: Note
  onShare?: () => void
  sidebarOpen?: boolean
}

type ViewMode = "edit" | "preview" | "split"

export function MarkdownEditor({ note, onShare, sidebarOpen = true }: MarkdownEditorProps) {
  const [content, setContent] = useState(note.content)
  const [viewMode, setViewMode] = useState<ViewMode>("edit")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // Don't automatically change view mode on desktop
      if (mobile && viewMode === "split") {
        setViewMode("edit")
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [viewMode])

  useEffect(() => {
    setContent(note.content)
  }, [note.content])

  const processMarkdown = (text: string) => {
    return (
      text
        // Headers
        .replace(
          /^### (.*$)/gim,
          '<h3 class="text-lg sm:text-xl font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4 text-app-text leading-tight">$1</h3>',
        )
        .replace(
          /^## (.*$)/gim,
          '<h2 class="text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-4 sm:mb-6 text-app-text leading-tight">$1</h2>',
        )
        .replace(
          /^# (.*$)/gim,
          '<h1 class="text-2xl sm:text-3xl font-bold mt-8 sm:mt-12 mb-6 sm:mb-8 text-app-text leading-tight">$1</h1>',
        )

        // Backlinks with enhanced styling
        .replace(
          /\[\[(.*?)\]\]/g,
          '<span class="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium bg-app-accent/15 text-app-accent border border-app-accent/20 hover:bg-app-accent/25 hover:border-app-accent/40 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-soft">$1</span>',
        )

        // Tags with enhanced styling
        .replace(
          /#(\w+)/g,
          '<span class="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-app-tag text-app-tag-text hover:bg-app-tag-hover cursor-pointer transition-all duration-200 hover:scale-105 shadow-soft">#$1</span>',
        )

        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-app-text">$1</strong>')

        // Italic
        .replace(/\*(.*?)\*/g, '<em class="italic text-app-text/90">$1</em>')

        // Code blocks
        .replace(
          /```([\s\S]*?)```/g,
          '<pre class="bg-app-code-bg border border-app-border rounded-xl sm:rounded-2xl p-4 sm:p-6 my-4 sm:my-6 overflow-x-auto shadow-soft"><code class="text-xs sm:text-sm font-mono text-app-code-text leading-relaxed">$1</code></pre>',
        )

        // Inline code
        .replace(
          /`(.*?)`/g,
          '<code class="bg-app-code-bg border border-app-border rounded-md sm:rounded-lg px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-xs sm:text-sm font-mono text-app-code-text">$1</code>',
        )

        // Lists with enhanced styling
        .replace(
          /^- (.*$)/gim,
          "<li class=\"ml-4 sm:ml-6 mb-2 sm:mb-3 text-app-text/90 relative before:content-['•'] before:absolute before:-left-3 sm:before:-left-4 before:text-app-accent before:font-bold\">$1</li>",
        )
        .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 sm:ml-6 mb-2 sm:mb-3 text-app-text/90 list-decimal">$1</li>')

        // Checkboxes
        .replace(
          /^- \[ \] (.*$)/gim,
          '<li class="ml-4 sm:ml-6 mb-2 sm:mb-3 text-app-text/90 flex items-center"><input type="checkbox" class="mr-2 sm:mr-3 rounded-md border-app-border bg-app-input" /> $1</li>',
        )
        .replace(
          /^- \[x\] (.*$)/gim,
          '<li class="ml-4 sm:ml-6 mb-2 sm:mb-3 text-app-text/90 flex items-center"><input type="checkbox" checked class="mr-2 sm:mr-3 rounded-md border-app-border bg-app-input" /> $1</li>',
        )

        // Line breaks
        .replace(/\n/g, "<br />")
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Editor Header */}
      <header className={`flex flex-row items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-app-border bg-app-surface/30 backdrop-blur-xl flex-shrink-0 gap-4 w-full min-w-0 overflow-hidden`}>
        <div className={`flex items-center gap-3 sm:gap-4 min-w-0 flex-1 w-full ${!sidebarOpen && !isMobile ? 'ml-14' : ''}`}>
          <div className="min-w-0 flex-1">
            <h1 className="text-base xl:text-lg font-semibold text-app-text truncate">{note.title}</h1>
            <div className="flex items-center gap-2 text-xs xl:text-sm text-app-text-muted">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">Last updated {note.updatedAt.toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Tab bar: always horizontal, Split tab hidden on mobile */}
        <div className="flex items-center bg-app-surface/50 rounded-xl p-1 border border-app-border flex-shrink-0 gap-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("edit")}
            className={`h-8 px-4 rounded-lg transition-all duration-200 text-xs xl:text-sm ${
              viewMode === "edit"
                ? "bg-app-accent text-app-accent-text shadow-soft"
                : "text-app-text-muted hover:text-app-text hover:bg-app-hover"
            }`}
          >
            <Edit3 className="h-3 w-3 xl:mr-2" />
            <span className="ml-1 xl:ml-0">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("preview")}
            className={`h-8 px-4 rounded-lg transition-all duration-200 text-xs xl:text-sm ${
              viewMode === "preview"
                ? "bg-app-accent text-app-accent-text shadow-soft"
                : "text-app-text-muted hover:text-app-text hover:bg-app-hover"
            }`}
          >
            <Eye className="h-3 w-3 xl:mr-2" />
            <span className="ml-1 xl:ml-0">Preview</span>
          </Button>
          <div className={isMobile ? "hidden" : "block"}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("split")}
              className={`h-8 px-4 rounded-lg transition-all duration-200 text-sm ${
                viewMode === "split"
                  ? "bg-app-accent text-app-accent-text shadow-soft"
                  : "text-app-text-muted hover:text-app-text hover:bg-app-hover"
              }`}
            >
              <Columns2 className="h-3 w-3 mr-2" />
              Split
            </Button>
          </div>
          <EditorTabMenu onShare={onShare} />
        </div>
      </header>

      {/* Editor Content */}
      <div className={`flex-1 flex min-h-0 ${isMobile ? "pb-20" : ""}`}>
        {/* Editor */}
        {(viewMode === "edit" || viewMode === "split") && (
          <div className={`${viewMode === "split" ? "flex-1 border-r border-app-border" : "flex-1"} flex flex-col`}>
            <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-hidden">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-full bg-transparent border-none outline-none resize-none font-mono text-sm sm:text-base leading-relaxed text-app-text placeholder:text-app-text-muted overflow-y-auto focus:border-none focus:ring-0 focus:outline-none"
                placeholder="Start writing your note..."
                style={{
                  fontFamily: "JetBrains Mono, Monaco, Consolas, monospace",
                  lineHeight: "1.8",
                }}
              />
            </div>
          </div>
        )}

        {/* Preview */}
        {(viewMode === "preview" || viewMode === "split") && (
          <div className={`${viewMode === "split" ? "flex-1" : "flex-1"} bg-app-surface/20 flex flex-col`}>
            <ScrollArea className="flex-1">
              <div
                className="p-4 sm:p-6 lg:p-8 prose prose-sm sm:prose-base lg:prose-lg max-w-none"
                style={{ lineHeight: "1.8" }}
                dangerouslySetInnerHTML={{ __html: processMarkdown(content) }}
              />
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  )
}
