'use client'

import { Copy, Volume2, Loader } from 'lucide-react'
import { useState } from 'react'

interface TranslationOutputProps {
  text: string
  isLoading?: boolean
  onCopy?: () => void
  onSpeak?: () => void
}

export function TranslationOutput({
  text,
  isLoading = false,
  onCopy,
  onSpeak,
}: TranslationOutputProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (text && onCopy) {
      navigator.clipboard.writeText(text)
      setCopied(true)
      onCopy()
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Translation
        </label>
        <div className="flex items-center gap-2">
          {text && (
            <>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title="Copy translation"
                disabled={!text}
              >
                {copied ? (
                  <span className="text-xs text-green-500 font-medium">Copied!</span>
                ) : (
                  <Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                )}
              </button>
              <button
                onClick={onSpeak}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title="Speak translation"
                disabled={!text}
              >
                <Volume2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="min-h-[120px] bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
        {isLoading ? (
          <div className="flex items-center justify-center h-full gap-2 text-slate-500">
            <Loader className="w-4 h-4 animate-spin" />
            <span>Translating...</span>
          </div>
        ) : (
          <p className="text-slate-900 dark:text-slate-50 leading-relaxed whitespace-pre-wrap">
            {text || (
              <span className="text-slate-400 dark:text-slate-500">
                Translation will appear here...
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  )
}
