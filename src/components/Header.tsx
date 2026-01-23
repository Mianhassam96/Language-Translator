'use client'

import { useTheme } from '@/hooks/useTheme'
import { Sun, Moon } from 'lucide-react'

export function Header() {
  const { resolvedTheme, toggleTheme, mounted } = useTheme()

  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-lg">
            🌐
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              MianLingo
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Smarter. Speak Globally.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
            title={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
          >
            {resolvedTheme === 'light' ? (
              <Moon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            ) : (
              <Sun className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            )}
          </button>

          {/* GitHub Link */}
          <a
            href="#"
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          >
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  )
}
