"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, ExternalLink, Hash } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

interface BacklinksPanelProps {
  currentNote: Note
  notes: Note[]
  onOpenGraphView?: () => void
}

export function BacklinksPanel({ currentNote, notes, onOpenGraphView }: BacklinksPanelProps) {
  // Find notes that link to the current note
  const backlinks = notes.filter(
    (note) => note.id !== currentNote.id && note.content.includes(`[[${currentNote.title}]]`),
  )

  // Find notes with similar tags
  const relatedNotes = notes
    .filter((note) => note.id !== currentNote.id && note.tags.some((tag) => currentNote.tags.includes(tag)))
    .slice(0, 3)

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Backlinks */}
      <div className="space-y-3 sm:space-y-4">
        <h4 className="text-xs sm:text-sm font-semibold text-app-text-muted uppercase tracking-wider">
          Backlinks ({backlinks.length})
        </h4>
        {backlinks.length > 0 ? (
          <div className="space-y-2 sm:space-y-3 max-h-64 overflow-y-auto scrollbar-thin">
            {backlinks.map((note) => (
              <div
                key={note.id}
                className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-app-border/20 bg-app-surface/50 hover:bg-app-surface/80 hover:border-app-border/40 transition-all duration-200 cursor-pointer shadow-soft hover:shadow-medium group"
              >
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <h5 className="font-semibold text-app-text truncate flex-1 text-sm">{note.title}</h5>
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 text-app-text-muted group-hover:text-app-accent transition-colors duration-200 flex-shrink-0 ml-2" />
                </div>
                <p className="text-xs sm:text-sm text-app-text-muted line-clamp-2 leading-relaxed mb-2 sm:mb-3">
                  {note.content.split("\n").find((line) => line.includes(`[[${currentNote.title}]]`)) ||
                    note.content.substring(0, 100) + "..."}
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {note.tags.slice(0, 2).map((tag) => (
                    <Badge
                      key={tag}
                      className="text-xs bg-app-tag text-app-tag-text border-0 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1"
                    >
                      <Hash className="h-2 w-2 sm:h-2.5 sm:w-2.5 mr-0.5 sm:mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 sm:p-6 text-center text-app-text-muted bg-app-surface/30 rounded-xl sm:rounded-2xl border border-app-border/10">
            <p className="text-xs sm:text-sm italic">No backlinks found</p>
          </div>
        )}
      </div>

      {/* Related Notes */}
      <div className="space-y-3 sm:space-y-4">
        <h4 className="text-xs sm:text-sm font-semibold text-app-text-muted uppercase tracking-wider">Related Notes</h4>
        {relatedNotes.length > 0 ? (
          <div className="space-y-2">
            {relatedNotes.map((note) => (
              <div
                key={note.id}
                className="p-3 rounded-xl border border-app-border/20 bg-app-surface/50 hover:bg-app-surface/80 hover:border-app-border/40 transition-all duration-200 cursor-pointer"
              >
                <h5 className="font-medium text-app-text truncate mb-2 text-sm">{note.title}</h5>
                <div className="flex flex-wrap gap-1">
                  {note.tags
                    .filter((tag) => currentNote.tags.includes(tag))
                    .map((tag) => (
                      <Badge
                        key={tag}
                        className="text-xs bg-app-accent/10 text-app-accent border border-app-accent/20 rounded-full px-2 py-0.5"
                      >
                        #{tag}
                      </Badge>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3 sm:p-4 text-center text-app-text-muted bg-app-surface/30 rounded-xl sm:rounded-2xl border border-app-border/10">
            <p className="text-xs sm:text-sm italic">No related notes found</p>
          </div>
        )}
      </div>

      {/* Current Note Tags */}
      <div className="space-y-3 sm:space-y-4">
        <h4 className="text-xs sm:text-sm font-semibold text-app-text-muted uppercase tracking-wider">Tags</h4>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {currentNote.tags.map((tag) => (
            <Badge
              key={tag}
              className="text-xs sm:text-sm bg-app-accent/15 text-app-accent border border-app-accent/20 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 cursor-pointer hover:bg-app-accent/25 hover:border-app-accent/40 transition-all duration-200 font-medium"
            >
              <Hash className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
