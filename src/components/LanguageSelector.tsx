'use client'

import { Language } from '@/types'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface LanguageSelectorProps {
  languages: Language[]
  selectedLanguage: Language | null
  onChange: (language: Language) => void
  label?: string
  showFlag?: boolean
}

export function LanguageSelector({
  languages,
  selectedLanguage,
  onChange,
  label,
  showFlag = true,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          {label}
        </label>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full input-base flex items-center justify-between"
      >
        <span className="flex items-center gap-2">
          {showFlag && selectedLanguage?.flag && (
            <span className="text-xl">{selectedLanguage.flag}</span>
          )}
          <span>{selectedLanguage?.name || 'Select language'}</span>
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onChange(lang)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                selectedLanguage?.code === lang.code
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : ''
              }`}
            >
              {showFlag && <span className="text-xl">{lang.flag}</span>}
              <div>
                <div className="font-medium">{lang.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{lang.nativeName}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
