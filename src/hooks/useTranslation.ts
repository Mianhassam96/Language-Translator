'use client'

import { useCallback, useState } from 'react'
import { TranslationRequest, TranslationResponse } from '@/types'
import { translateText, detectLanguage } from '@/lib/api'

export function useTranslation() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const translate = useCallback(
    async (request: TranslationRequest): Promise<TranslationResponse> => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await translateText(request)
        
        if (!result.success) {
          setError(result.error || 'Translation failed')
        }

        return result
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
        return {
          success: false,
          error: errorMessage,
        }
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const detect = useCallback(async (text: string): Promise<string> => {
    try {
      return await detectLanguage(text)
    } catch (err) {
      console.error('Detection error:', err)
      return 'en'
    }
  }, [])

  return { translate, detect, isLoading, error, setError }
}
