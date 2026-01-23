'use client'

import { MAX_CHARACTER_LIMIT } from '@/lib/constants'

interface CharacterCounterProps {
  current: number
  limit?: number
}

export function CharacterCounter({ current, limit = MAX_CHARACTER_LIMIT }: CharacterCounterProps) {
  const percentage = (current / limit) * 100
  const isWarning = percentage > 80
  const isError = percentage > 100

  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-600 dark:text-slate-400">
        {current} / {limit} characters
      </span>
      <div className="flex-1 mx-4 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-200 ${
            isError ? 'bg-red-500' : isWarning ? 'bg-yellow-500' : 'bg-primary-500'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {isError && <span className="text-red-500 font-medium">Limit exceeded</span>}
    </div>
  )
}
