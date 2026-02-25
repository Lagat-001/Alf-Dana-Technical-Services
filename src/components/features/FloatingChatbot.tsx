'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, X, Send, MessageSquare } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { chatbotData, findFAQAnswer } from '@/lib/chatbot-data'
import { getChatbotHandoffLink } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  text: string
  from: 'bot' | 'user'
  isHandoff?: boolean
  handoffLink?: string
}

interface FloatingChatbotProps {
  locale: string
}

export function FloatingChatbot({ locale }: FloatingChatbotProps) {
  const t = useTranslations('chatbot')
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [initialized, setInitialized] = useState(false)
  const [showIntroTooltip, setShowIntroTooltip] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const data = chatbotData[locale] || chatbotData.en

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Show intro tooltip after 2 s on first visit; remember dismissal
  useEffect(() => {
    if (localStorage.getItem('dana-intro-dismissed')) return
    const timer = setTimeout(() => setShowIntroTooltip(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const dismissIntroTooltip = () => {
    setShowIntroTooltip(false)
    localStorage.setItem('dana-intro-dismissed', 'true')
  }

  const openChat = () => {
    setShowIntroTooltip(false)
    setIsOpen(true)
    if (!initialized) {
      setInitialized(true)
      setTimeout(() => {
        addBotMessage(data.greeting)
      }, 300)
    }
    setTimeout(() => inputRef.current?.focus(), 400)
  }

  const addBotMessage = (text: string, isHandoff = false, handoffLink = '') => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        from: 'bot',
        isHandoff,
        handoffLink,
      },
    ])
  }

  const handleFAQClick = (faqId: string) => {
    const faq = data.faqs.find((f) => f.id === faqId)
    if (!faq) return

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: faq.question, from: 'user' },
    ])

    setTimeout(() => {
      addBotMessage(faq.answer)
    }, 400)
  }

  const handleSend = () => {
    const text = input.trim()
    if (!text) return

    setMessages((prev) => [...prev, { id: Date.now().toString(), text, from: 'user' }])
    setInput('')

    setTimeout(() => {
      const { answer, matched } = findFAQAnswer(locale, text)
      if (matched) {
        addBotMessage(answer)
      } else {
        addBotMessage(data.handoffMessage, true, getChatbotHandoffLink(text))
      }
    }, 500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="fixed bottom-24 end-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 max-w-[calc(100vw-3rem)] bg-white dark:bg-[#0d2a4a] rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-[#0A2540] text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FF6B00] flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm">{t('title')}</div>
                <div className="text-xs text-white/70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-72 min-h-40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'flex',
                  msg.from === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                    msg.from === 'user'
                      ? 'bg-[#FF6B00] text-white rounded-br-sm'
                      : 'bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white rounded-bl-sm'
                  )}
                >
                  {msg.text}
                  {msg.isHandoff && msg.handoffLink && (
                    <a
                      href={msg.handoffLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex items-center gap-2 bg-[#25D366] text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-[#22c55e] transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      {t('handoff_btn')}
                    </a>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* FAQ Quick Buttons (shown when no messages yet) */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {data.faqs.map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => handleFAQClick(faq.id)}
                  className="text-xs bg-[#0A2540]/10 dark:bg-white/10 text-[#0A2540] dark:text-white px-2.5 py-1 rounded-full hover:bg-[#FF6B00]/10 hover:text-[#FF6B00] transition-colors border border-[#0A2540]/20 dark:border-white/20"
                >
                  {faq.question}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('placeholder')}
              className="flex-1 text-sm bg-gray-50 dark:bg-white/5 border border-border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#FF6B00]/30 focus:border-[#FF6B00] transition-colors text-foreground placeholder:text-muted-foreground"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-9 h-9 bg-[#FF6B00] text-white rounded-xl flex items-center justify-center hover:bg-[#FF6B00]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button + intro tooltip in a row */}
      <div className="flex flex-row-reverse items-end gap-3">
        <button
          onClick={() => (isOpen ? setIsOpen(false) : openChat())}
          className="w-14 h-14 bg-[#0A2540] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 relative shrink-0"
          aria-label="Open chatbot"
        >
          <span className="absolute inset-0 rounded-full bg-[#0A2540] animate-pulse-ring opacity-40" />
          {isOpen ? (
            <X className="w-6 h-6 text-white relative z-10" />
          ) : (
            <Bot className="w-6 h-6 text-white relative z-10" />
          )}
          {/* Unread dot */}
          {!isOpen && (
            <span className="absolute top-1 end-1 w-3 h-3 bg-[#FF6B00] rounded-full border-2 border-white" />
          )}
        </button>

        {/* Dana intro tooltip — shown beside the button before chat opens */}
        {!isOpen && showIntroTooltip && (
          <div className="relative mb-1 max-w-[200px] bg-white dark:bg-[#0d2a4a] rounded-2xl rounded-bl-sm shadow-xl border border-border px-3.5 py-2.5 animate-slide-up">
            {/* Arrow pointing left toward the button */}
            <span className="absolute -end-2 bottom-4 w-0 h-0 border-y-[6px] border-y-transparent border-s-[8px] border-s-white dark:border-s-[#0d2a4a]" />
            {/* Dismiss X */}
            <button
              onClick={dismissIntroTooltip}
              className="absolute top-1.5 end-1.5 p-0.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-xs font-semibold text-[#0A2540] dark:text-white leading-snug pe-4">
              Hi, I&apos;m Dana! 👋
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
              Ask me anything about our services…
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
