'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { getGenericWhatsAppLink } from '@/lib/whatsapp'

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="fixed bottom-6 end-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="bg-white dark:bg-[#0d2a4a] text-sm text-gray-700 dark:text-white px-3 py-2 rounded-lg shadow-lg border border-border whitespace-nowrap animate-fade-in">
          Chat on WhatsApp
          <div className="absolute -bottom-1.5 end-5 w-3 h-3 rotate-45 bg-white dark:bg-[#0d2a4a] border-e border-b border-border" />
        </div>
      )}

      {/* Button */}
      <a
        href={getGenericWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring opacity-60" />
        <MessageCircle className="w-7 h-7 text-white relative z-10" />
      </a>
    </div>
  )
}
