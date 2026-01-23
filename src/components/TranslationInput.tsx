'use client'

import { Copy, Volume2, Loader, X, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { MAX_CHARACTER_LIMIT } from '@/lib/constants'
import { CharacterCounter } from './CharacterCounter'

interface TranslationInputProps {
  value: string
  onChange: (value: string) => void
  onClear?: () => void
  isLoading?: boolean
  error?: string | null
}

export function TranslationInput({
  value,
  onChange,
  onClear,
  isLoading = false,
  error,
}: TranslationInputProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClear = () => {
    onChange('')
    onClear?.()
  }

  const handleSpeak = () => {
    if (!value) return

    const utterance = new SpeechSynthesisUtterance(value)
    speechSynthesis.speak(utterance)
  }

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Text to translate
        </label>
        {value && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              title="Copy text"
              disabled={isLoading}
            >
              {copied ? (
                <span className="text-xs text-green-500 font-medium">Copied!</span>
              ) : (
                <Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              )}
            </button>
            <button
              onClick={handleSpeak}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              title="Speak text"
              disabled={isLoading}
            >
              <Volume2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>
            <button
              onClick={handleClear}
              className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Clear text"
              disabled={isLoading}
            >
              <X className="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>
          </div>
        )}
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARACTER_LIMIT))}
        placeholder="Enter text to translate..."
        maxLength={MAX_CHARACTER_LIMIT}
        disabled={isLoading}
        className="input-base min-h-[120px] resize-none"
      />

      {error && (
        <div className="mt-3 flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      <div className="mt-3">
        <CharacterCounter current={value.length} limit={MAX_CHARACTER_LIMIT} />
      </div>
    </div>
  )
}
