'use client'

import { ArrowRightLeft } from 'lucide-react'
import { Language } from '@/types'
import { LanguageSelector } from './LanguageSelector'
import { SUPPORTED_LANGUAGES } from '@/lib/constants'

interface LanguagePairSelectorProps {
  sourceLanguage: Language | null
  targetLanguage: Language | null
  onSourceChange: (lang: Language) => void
  onTargetChange: (lang: Language) => void
  onSwap: () => void
}

export function LanguagePairSelector({
  sourceLanguage,
  targetLanguage,
  onSourceChange,
  onTargetChange,
  onSwap,
}: LanguagePairSelectorProps) {
  return (
    <div className="card p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <div>
          <LanguageSelector
            languages={SUPPORTED_LANGUAGES}
            selectedLanguage={sourceLanguage}
            onChange={onSourceChange}
            label="From"
            showFlag={true}
          />
        </div>

        {/* Swap Button */}
        <div className="flex items-end justify-center">
          <button
            onClick={onSwap}
            className="p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mb-2 sm:mb-0"
            title="Swap languages"
            aria-label="Swap source and target languages"
          >
            <ArrowRightLeft className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </button>
        </div>

        <div>
          <LanguageSelector
            languages={SUPPORTED_LANGUAGES}
            selectedLanguage={targetLanguage}
            onChange={onTargetChange}
            label="To"
            showFlag={true}
          />
        </div>
      </div>
    </div>
  )
}
