import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/config/routing'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingWhatsApp } from '@/components/features/FloatingWhatsApp'
import { FloatingChatbot } from '@/components/features/FloatingChatbot'
import { PWAInstallPrompt } from '@/components/features/PWAInstallPrompt'
import { AppInstallButton } from '@/components/features/AppInstallButton'
import '@/app/globals.css'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export const viewport: Viewport = {
  themeColor: '#0A2540',
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })

  return {
    title: t('title'),
    description: t('description'),
    manifest: '/manifest.json',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'ALF DANA',
    },
    icons: {
      icon: '/logo.png',
      apple: '/logo.png',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      siteName: 'ALF DANA TECHNICAL SERVICES',
      type: 'website',
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  const messages = await getMessages()
  const isRTL = locale === 'ar' || locale === 'ur'

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      className="font-sans"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          {/* Theme script — runs before hydration to avoid flash */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var theme = localStorage.getItem('theme');
                    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                      document.documentElement.classList.add('dark');
                    }
                  } catch(e) {}
                })();
              `,
            }}
          />
          <Header locale={locale} />
          <main>{children}</main>
          <AppInstallButton variant="banner" />
          <Footer locale={locale} />
          <FloatingWhatsApp />
          <FloatingChatbot locale={locale} />
          <PWAInstallPrompt locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
