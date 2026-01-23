import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'MianLingoTranslate - AI-Powered Language Translation',
  description: 'Fast, accurate, and natural translations. For students, developers, freelancers, and businesses.',
  keywords: 'translation, language, AI, multilingual',
  authors: [{ name: 'MultiMian' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mianlingotranslate.com',
    siteName: 'MianLingoTranslate',
    title: 'MianLingoTranslate - AI Translation',
    description: 'Smarter. Speak Globally.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
