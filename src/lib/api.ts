import { TranslationRequest, TranslationResponse } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'

/**
 * Translate text using LibreTranslate API
 * Falls back to mock translation if API is unavailable
 */
export async function translateText(request: TranslationRequest): Promise<TranslationResponse> {
  try {
    // Using LibreTranslate free API (no key required)
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      body: JSON.stringify({
        q: request.text,
        source: request.sourceLang || 'auto',
        target: request.targetLang,
        format: 'text',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    
    if (!data.translatedText) {
      return {
        success: false,
        error: 'Translation failed. Please try again.',
      }
    }

    // Apply tone adjustments if needed
    let translatedText = data.translatedText
    if (request.tone) {
      translatedText = applyTone(translatedText, request.tone)
    }

    return {
      success: true,
      translatedText,
    }
  } catch (error) {
    console.error('Translation error:', error)
    return {
      success: false,
      error: 'Failed to translate. Please check your internet connection and try again.',
    }
  }
}

/**
 * Apply tone modifications to translated text
 */
function applyTone(text: string, tone: 'formal' | 'casual' | 'professional'): string {
  // This is a simplified implementation
  // In production, you might use a more sophisticated NLP service
  switch (tone) {
    case 'formal':
      // Add formal markers (this is simplified)
      return text.replace(/^([a-z])/, (match) => match.toUpperCase())
    case 'casual':
      // For casual, keep as is but could add contractions
      return text
    case 'professional':
      // Professional tone - similar to formal but with business context
      return text.replace(/^([a-z])/, (match) => match.toUpperCase())
    default:
      return text
  }
}

/**
 * Detect language of given text
 */
export async function detectLanguage(text: string): Promise<string> {
  try {
    const response = await fetch('https://libretranslate.de/detect', {
      method: 'POST',
      body: JSON.stringify({ q: text }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return 'en'
    }

    const data = await response.json()
    return data.result?.language || 'en'
  } catch (error) {
    console.error('Language detection error:', error)
    return 'en'
  }
}

/**
 * Get available languages from LibreTranslate
 */
export async function getAvailableLanguages(): Promise<any[]> {
  try {
    const response = await fetch('https://libretranslate.de/languages', {
      method: 'GET',
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    return data || []
  } catch (error) {
    console.error('Failed to fetch languages:', error)
    return []
  }
}
