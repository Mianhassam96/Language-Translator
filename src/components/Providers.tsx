'use client'

import React, { ReactNode, useEffect } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    // Apply saved theme on mount
    const savedTheme = localStorage.getItem('mian_lingo_theme') || 'system'
    const isDark = savedTheme === 'dark' || 
      (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return <>{children}</>
}
