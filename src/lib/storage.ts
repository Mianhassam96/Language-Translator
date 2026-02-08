import { Translation, HistoryItem } from '@/types'

const STORAGE_KEYS = {
  HISTORY: 'mian_lingo_history',
  FAVORITES: 'mian_lingo_favorites',
  THEME: 'mian_lingo_theme',
}

/**
 * Get translation history from localStorage
 */
export function getTranslationHistory(): Translation[] {
  if (typeof window === 'undefined') return []
  
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading history:', error)
    return []
  }
}

/**
 * Save translation to history
 */
export function saveToHistory(translation: Translation): void {
  if (typeof window === 'undefined') return

  try {
    const history = getTranslationHistory()
    const newHistory = [translation, ...history].slice(0, 100) // Keep last 100
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(newHistory))
  } catch (error) {
    console.error('Error saving to history:', error)
  }
}

/**
 * Clear all history
 */
export function clearHistory(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY)
  } catch (error) {
    console.error('Error clearing history:', error)
  }
}

/**
 * Get favorite translations
 */
export function getFavorites(): Translation[] {
  if (typeof window === 'undefined') return []
  
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading favorites:', error)
    return []
  }
}

/**
 * Add translation to favorites
 */
export function addToFavorites(translation: Translation): void {
  if (typeof window === 'undefined') return

  try {
    const favorites = getFavorites()
    if (!favorites.find((fav) => fav.id === translation.id)) {
      const newFavorites = [translation, ...favorites]
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites))
    }
  } catch (error) {
    console.error('Error adding to favorites:', error)
  }
}

/**
 * Remove translation from favorites
 */
export function removeFromFavorites(translationId: string): void {
  if (typeof window === 'undefined') return

  try {
    const favorites = getFavorites()
    const newFavorites = favorites.filter((fav) => fav.id !== translationId)
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites))
  } catch (error) {
    console.error('Error removing from favorites:', error)
  }
}

/**
 * Get saved theme
 */
export function getSavedTheme(): 'light' | 'dark' | 'system' {
  if (typeof window === 'undefined') return 'system'
  
  try {
    const data = localStorage.getItem(STORAGE_KEYS.THEME)
    return (data as 'light' | 'dark' | 'system') || 'system'
  } catch (error) {
    console.error('Error reading theme:', error)
    return 'system'
  }
}

/**
 * Save theme preference
 */
export function saveTheme(theme: 'light' | 'dark' | 'system'): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme)
  } catch (error) {
    console.error('Error saving theme:', error)
  }
}
