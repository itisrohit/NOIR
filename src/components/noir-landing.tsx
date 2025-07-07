"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  ExternalLink,
  Edit3,
  Link2,
  Palette,
  ArrowRight,
  Twitter,
  FileText,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const themes = [
  {
    name: "Noir",
    colors: ["#0a0a0b", "#1a1a1d", "#6366f1"],
    description: "Deep elegance",
  },
  {
    name: "Glacier",
    colors: ["#0f172a", "#1e293b", "#0ea5e9"],
    description: "Cool precision",
  },
  {
    name: "Aurora",
    colors: ["#1a1a2e", "#16213e", "#8b5cf6"],
    description: "Deep purple sophistication",
  },
  {
    name: "Monokai",
    colors: ["#272822", "#3e3d32", "#a6e22e"],
    description: "Rich contrast",
  },
  {
    name: "Forest",
    colors: ["#0f1419", "#1a2332", "#22c55e"],
    description: "Natural focus",
  },
]

export function NoirLanding() {
  const [currentTheme, setCurrentTheme] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTheme((prev) => (prev + 1) % themes.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const nextTheme = () => {
    setCurrentTheme((prev) => (prev + 1) % themes.length)
  }

  const prevTheme = () => {
    setCurrentTheme((prev) => (prev - 1 + themes.length) % themes.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">Noir</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-slate-400 hover:text-white transition-colors text-sm font-medium px-1.5 py-0.5 rounded hover:bg-slate-800/30">
                Features
              </a>
              <a href="#themes" className="text-slate-400 hover:text-white transition-colors text-sm font-medium px-1.5 py-0.5 rounded hover:bg-slate-800/30">
                Themes
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-slate-800/30"
              >
                GitHub <ExternalLink className="h-3 w-3" />
              </a>
              <Button
                className="group bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white px-8 py-2 rounded-full text-base font-medium shadow-md transition-all duration-200 flex items-center gap-2 focus:outline-none border-0"
                style={{ boxShadow: '0 2px 16px 0 rgba(80, 80, 255, 0.10)' }}
              >
                Try Noir
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Badge className="mb-6 bg-violet-500/10 text-violet-200 border-violet-500/20 px-4 py-1.5 rounded-full text-xs font-medium shadow-none">
              <Zap className="h-3 w-3 mr-1" />
              Now with AI-powered organization
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight">
              Structure your mind
              <br />
              <span className="text-violet-400">beautifully</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
              A fast, elegant markdown note system with backlinks, themes, and flow.<br className="hidden md:block" />
              Built for people who think clearly, creatively, and systematically.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
              <Button
                variant="outline"
                className="border-slate-700 text-slate-200 hover:bg-slate-800 px-7 py-2 rounded-lg text-base font-medium transition-all duration-200 bg-transparent shadow-none"
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </div>
          </div>

          {/* App Mockup */}
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-blue-500/10 blur-2xl rounded-2xl"></div>
              <div className="relative bg-slate-900/70 backdrop-blur border border-slate-700/30 rounded-2xl p-6 shadow-md">
                <div className="bg-slate-950/90 rounded-xl border border-slate-800/30 overflow-hidden">
                  {/* Mock app interface */}
                  <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-800/30 bg-slate-900/50">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-base text-slate-300 font-medium">Getting Started with PKM</span>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-64 bg-slate-900/20 border-r border-slate-800/30 p-5">
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-700/30 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-800/30 rounded w-full"></div>
                        <div className="h-3 bg-slate-800/30 rounded w-2/3"></div>
                        <div className="mt-5 space-y-1.5">
                          <div className="h-7 bg-violet-500/10 rounded border border-violet-500/20"></div>
                          <div className="h-7 bg-slate-800/20 rounded"></div>
                          <div className="h-7 bg-slate-800/20 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-5">
                      <div className="space-y-3">
                        <div className="h-7 bg-slate-700/20 rounded w-2/3"></div>
                        <div className="space-y-1.5">
                          <div className="h-3 bg-slate-800/30 rounded w-full"></div>
                          <div className="h-3 bg-slate-800/30 rounded w-5/6"></div>
                          <div className="h-3 bg-slate-800/30 rounded w-4/5"></div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <div className="px-3 py-1 bg-violet-500/10 text-violet-200 rounded-full text-xs border border-violet-500/20">
                            #productivity
                          </div>
                          <div className="px-3 py-1 bg-blue-500/10 text-blue-200 rounded-full text-xs border border-blue-500/20">
                            #learning
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <Edit3 className="h-6 w-6 text-violet-400" />
                </div>
                <h3 className="text-3xl font-bold text-slate-100">Write in Markdown, elegantly</h3>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed mb-6">
                Split-view editor with instant formatting and live preview. Your thoughts, styled instantly. Focus on
                writing while Noir handles the beautiful presentation.
              </p>
              <div className="flex gap-2">
                <Badge className="bg-slate-800/50 text-slate-300 border-slate-700">Live Preview</Badge>
                <Badge className="bg-slate-800/50 text-slate-300 border-slate-700">Split View</Badge>
                <Badge className="bg-slate-800/50 text-slate-300 border-slate-700">Syntax Highlighting</Badge>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-blue-500/10 blur-2xl rounded-3xl"></div>
              <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl">
                <div className="bg-slate-950/80 rounded-xl border border-slate-800/50 p-4">
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <div className="text-xs text-slate-500 mb-2">EDITOR</div>
                      <div className="space-y-2 text-sm font-mono">
                        <div className="text-violet-400"># Getting Started</div>
                        <div className="text-slate-300">Welcome to **Noir**</div>
                        <div className="text-slate-300">- [ ] First task</div>
                      </div>
                    </div>
                    <div className="w-px bg-slate-700"></div>
                    <div className="flex-1">
                      <div className="text-xs text-slate-500 mb-2">PREVIEW</div>
                      <div className="space-y-2">
                        <div className="text-lg font-bold text-slate-100">Getting Started</div>
                        <div className="text-slate-300">
                          Welcome to <strong>Noir</strong>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <div className="w-3 h-3 border border-slate-500 rounded-sm"></div>
                          <span>First task</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div className="md:order-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Link2 className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold text-slate-100">Link your thoughts</h3>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed mb-6">
                Noir helps you link, reference, and connect notes effortlessly with [[wikilinks]] and tags. Organize your thoughts with backlinks and smart tags.
              </p>
              <div className="flex gap-2">
                <Badge className="bg-slate-800/50 text-slate-300 border-slate-700">Backlinks</Badge>
                <Badge className="bg-slate-800/50 text-slate-300 border-slate-700">Smart Tags</Badge>
              </div>
            </div>
            <div className="md:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-2xl rounded-3xl"></div>
              <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl">
                <div className="bg-slate-950/80 rounded-xl border border-slate-800/50 p-4">
                  <div className="space-y-3">
                    <div className="text-sm text-slate-400">Connected Notes</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span className="text-sm text-slate-200">[[Daily Notes Template]]</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-violet-500/10 rounded-lg border border-violet-500/20">
                        <div className="w-2 h-2 rounded-full bg-violet-400"></div>
                        <span className="text-sm text-slate-200">[[Zettelkasten Method]]</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <span className="text-sm text-slate-200">[[Building a Second Brain]]</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3 - Themes */}
          <div id="themes" className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Palette className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-3xl font-bold text-slate-100">Make it yours</h3>
            </div>
            <p className="text-lg text-slate-400 leading-relaxed mb-12 max-w-2xl mx-auto">
              Choose from carefully crafted themes that match your mood and workflow. Each theme is designed for optimal
              readability and aesthetic appeal.
            </p>

            {/* Theme Carousel */}
            <div className="relative max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-8">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevTheme}
                  className="w-10 h-10 rounded-full border border-slate-700 hover:bg-slate-800"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-blue-500/20 blur-2xl rounded-3xl"></div>
                    <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl">
                      <div
                        className="h-48 rounded-xl border border-slate-700/50 p-4 transition-all duration-500"
                        style={{
                          backgroundColor: themes[currentTheme].colors[0],
                          borderColor: themes[currentTheme].colors[2] + "40",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div
                            className="h-3 rounded w-3/4"
                            style={{ backgroundColor: themes[currentTheme].colors[1] }}
                          ></div>
                          <div
                            className="h-2 rounded w-full opacity-60"
                            style={{ backgroundColor: themes[currentTheme].colors[1] }}
                          ></div>
                          <div
                            className="h-2 rounded w-2/3 opacity-60"
                            style={{ backgroundColor: themes[currentTheme].colors[1] }}
                          ></div>
                          <div className="flex gap-2 mt-4">
                            <div
                              className="px-2 py-1 rounded-full text-xs"
                              style={{
                                backgroundColor: themes[currentTheme].colors[2] + "20",
                                color: themes[currentTheme].colors[2],
                              }}
                            >
                              #tag
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <h4 className="text-lg font-semibold text-slate-100 mb-1">{themes[currentTheme].name}</h4>
                        <p className="text-sm text-slate-400">{themes[currentTheme].description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextTheme}
                  className="w-10 h-10 rounded-full border border-slate-700 hover:bg-slate-800"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Theme indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {themes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTheme(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentTheme ? "bg-violet-400" : "bg-slate-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6 leading-tight">
            Built for people who think
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              clearly, creatively, systematically
            </span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button
              className="group bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white px-8 py-2 rounded-full text-base font-medium shadow-md transition-all duration-200 flex items-center gap-2 focus:outline-none border-0"
              style={{ boxShadow: '0 2px 16px 0 rgba(80, 80, 255, 0.10)' }}
            >
              Try Noir
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight className="h-5 w-5" />
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight">Noir</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-400 hover:text-slate-100 transition-colors flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-100 transition-colors flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Docs
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-100 transition-colors flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                Twitter
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800/50 text-center text-slate-500 text-sm">
            <p>© 2024 Noir. Crafted with care for thoughtful minds.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
