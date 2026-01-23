'use client'

import { TONE_OPTIONS } from '@/lib/constants'

interface ToneSelectorProps {
  selectedTone: 'formal' | 'casual' | 'professional'
  onChange: (tone: 'formal' | 'casual' | 'professional') => void
}

export function ToneSelector({ selectedTone, onChange }: ToneSelectorProps) {
  return (
    <div className="card p-4">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
        Tone of Translation
      </label>
      <div className="grid grid-cols-3 gap-3">
        {TONE_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id as 'formal' | 'casual' | 'professional')}
            className={`px-3 py-2 rounded-lg border transition-all text-sm font-medium ${
              selectedTone === option.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <span className="text-lg mr-1">{option.icon}</span>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
