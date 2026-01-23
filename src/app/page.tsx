'use client'

import { useState, useEffect, useCallback } from 'react'
import { Language, Translation } from '@/types'
import { SUPPORTED_LANGUAGES } from '@/lib/constants'
import { useTranslation } from '@/hooks/useTranslation'
import { saveToHistory, getFavorites } from '@/lib/storage'
import { Header } from '@/components/Header'
import { LanguagePairSelector } from '@/components/LanguagePairSelector'
import { TranslationInput } from '@/components/TranslationInput'
import { TranslationOutput } from '@/components/TranslationOutput'
import { ToneSelector } from '@/components/ToneSelector'
import { Wand2, History, Heart } from 'lucide-react'

export default function Home() {
  // State management
  const [sourceLanguage, setSourceLanguage] = useState<Language | null>(SUPPORTED_LANGUAGES[0])
  const [targetLanguage, setTargetLanguage] = useState<Language | null>(SUPPORTED_LANGUAGES[1])
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [tone, setTone] = useState<'formal' | 'casual' | 'professional'>('casual')
  const [showHistory, setShowHistory] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [history, setHistory] = useState<Translation[]>([])
  const [favorites, setFavorites] = useState<Translation[]>([])

  // Hooks
  const { translate, isLoading, error, setError } = useTranslation()

  // Load history and favorites on mount
  useEffect(() => {
    setHistory([])
    setFavorites(getFavorites())
  }, [])

  // Handle translation
  const handleTranslate = useCallback(async () => {
    if (!inputText.trim() || !sourceLanguage || !targetLanguage) {
      setError('Please enter text and select languages')
      return
    }

    if (sourceLanguage.code === targetLanguage.code) {
      setError('Source and target languages cannot be the same')
      return
    }

    const result = await translate({
      text: inputText,
      sourceLang: sourceLanguage.code,
      targetLang: targetLanguage.code,
      tone,
    })

    if (result.success && result.translatedText) {
      setTranslatedText(result.translatedText)

      // Save to history
      const translation: Translation = {
        id: Date.now().toString(),
        text: inputText,
        sourceLang: sourceLanguage.code,
        targetLang: targetLanguage.code,
        translatedText: result.translatedText,
        tone,
        timestamp: Date.now(),
      }
      saveToHistory(translation)
    } else {
      setTranslatedText('')
      setError(result.error || 'Translation failed')
    }
  }, [inputText, sourceLanguage, targetLanguage, tone, translate, setError])

  // Swap languages
  const handleSwapLanguages = () => {
    const temp = sourceLanguage
    setSourceLanguage(targetLanguage)
    setTargetLanguage(temp)

    // Also swap texts
    const tempText = inputText
    setInputText(translatedText)
    setTranslatedText(tempText)
  }

  // Handle favorite
  const handleToggleFavorite = (translation: Translation) => {
    const isFavorite = favorites.some((fav) => fav.id === translation.id)
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== translation.id))
    } else {
      setFavorites([...favorites, translation])
    }
  }

  // Handle speak
  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = targetLanguage?.code || 'en'
    speechSynthesis.speak(utterance)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Translate. Communicate. Connect.</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Fast, accurate, and natural translations powered by AI. Break down language barriers instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 animate-slide-up">
            {/* Language Pair Selector */}
            <LanguagePairSelector
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              onSourceChange={setSourceLanguage}
              onTargetChange={setTargetLanguage}
              onSwap={handleSwapLanguages}
            />

            {/* Tone Selector */}
            <ToneSelector selectedTone={tone} onChange={setTone} />

            {/* Input & Output */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TranslationInput
                value={inputText}
                onChange={setInputText}
                onClear={() => setTranslatedText('')}
                isLoading={isLoading}
                error={error}
              />
              <TranslationOutput
                text={translatedText}
                isLoading={isLoading}
                onSpeak={() => handleSpeak(translatedText)}
              />
            </div>

            {/* Translate Button */}
            <button
              onClick={handleTranslate}
              disabled={isLoading || !inputText.trim()}
              className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-lg font-semibold"
            >
              <Wand2 className="w-5 h-5" />
              {isLoading ? 'Translating...' : 'Translate'}
            </button>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 animate-slide-up">
            {/* Quick Actions */}
            <div className="card p-4 space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-4">Quick Actions</h3>
              
              <button
                onClick={() => {
                  setShowHistory(!showHistory)
                  setShowFavorites(false)
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <History className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <div className="text-left">
                  <div className="font-medium text-sm">History</div>
                  <div className="text-xs text-slate-500">View recent translations</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowFavorites(!showFavorites)
                  setShowHistory(false)
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Heart className="w-5 h-5 text-red-500" />
                <div className="text-left">
                  <div className="font-medium text-sm">Favorites</div>
                  <div className="text-xs text-slate-500">{favorites.length} saved</div>
                </div>
              </button>
            </div>

            {/* Features */}
            <div className="card p-4 space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-50">Features</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 font-bold">✓</span>
                  <span>50+ Languages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 font-bold">✓</span>
                  <span>Tone Selection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 font-bold">✓</span>
                  <span>Text-to-Speech</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 font-bold">✓</span>
                  <span>Save Favorites</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 font-bold">✓</span>
                  <span>Dark Mode</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
