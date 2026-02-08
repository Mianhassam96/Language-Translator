export type Language = {
  code: string
  name: string
  nativeName: string
  flag: string
}

export type Translation = {
  id: string
  text: string
  sourceLang: string
  targetLang: string
  translatedText: string
  tone: 'formal' | 'casual' | 'professional'
  timestamp: number
  isFavorite?: boolean
}

export type TranslationRequest = {
  text: string
  sourceLang: string
  targetLang: string
  tone?: 'formal' | 'casual' | 'professional'
}

export type TranslationResponse = {
  success: boolean
  translatedText?: string
  error?: string
}

export type HistoryItem = Translation & {
  isFavorite: boolean
}
