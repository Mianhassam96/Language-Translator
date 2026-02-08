'use client'

import { useEffect, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Get saved theme or system preference
    const savedTheme = localStorage.getItem('mian_lingo_theme') as 'light' | 'dark' | 'system' | null
    const theme = savedTheme || 'system'
    setTheme(theme)
    
    // Resolve theme
    const isDark = theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    
    setResolvedTheme(isDark ? 'dark' : 'light')
    updateDOMTheme(isDark)
  }, [])

  const toggleTheme = () => {
    const newTheme: 'light' | 'dark' = resolvedTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    setResolvedTheme(newTheme)
    localStorage.setItem('mian_lingo_theme', newTheme)
    updateDOMTheme(newTheme === 'dark')
  }

  const updateDOMTheme = (isDark: boolean) => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  return { theme, resolvedTheme, toggleTheme, mounted }
}
