'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { MessageCircle, MapPin, Clock, Phone, Paperclip, FileText, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { buildQuoteMessage, getQuoteWhatsAppLink } from '@/lib/whatsapp'
import { PushNotificationManager } from '@/components/features/PushNotificationManager'
import { AppStorage } from '@/lib/app-storage'

export function ContactForm() {
  const t = useTranslations('contact')
  const tServices = useTranslations('services')

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    area: '',
    message: '',
  })

  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [showPushPrompt, setShowPushPrompt] = useState(false)
  const [photoShareHint, setPhotoShareHint] = useState(false)

  const photoInputRef = useRef<HTMLInputElement>(null)

  const services = ['ac', 'plumbing', 'electrical', 'painting', 'carpentry', 'tiling', 'cleaning', 'maintenance']

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const removePhoto = () => {
    setPhotoFile(null)
    setPhotoPreview(null)
    if (photoInputRef.current) photoInputRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.service) return

    const fullFormData = { ...formData, photoFile }

    // If on mobile with Web Share API and a photo is attached, use native share
    if (
      photoFile &&
      typeof navigator !== 'undefined' &&
      'share' in navigator &&
      'canShare' in navigator
    ) {
      const shareData = {
        text: buildQuoteMessage(fullFormData),
        files: [photoFile],
      }
      if ((navigator as Navigator & { canShare: (data?: ShareData) => boolean }).canShare(shareData)) {
        try {
          await navigator.share(shareData)
          AppStorage.saveRequest({
            id: Date.now().toString(),
            service: formData.service,
            name: formData.name,
            phone: formData.phone,
            message: formData.message || undefined,
            date: new Date().toISOString(),
            status: 'Quote Sent',
          })
          setShowPushPrompt(true)
          return
        } catch {
          // User cancelled share or share failed — fall through to wa.me link
        }
      }
    }

    // Standard wa.me link (photo will be mentioned in message text)
    const link = getQuoteWhatsAppLink(fullFormData)
    window.open(link, '_blank', 'noopener,noreferrer')

    // If photo was attached but we couldn't use Web Share, show a hint
    if (photoFile) setPhotoShareHint(true)

    // Save request to localStorage for My Requests / Track Progress
    AppStorage.saveRequest({
      id: Date.now().toString(),
      service: formData.service,
      name: formData.name,
      phone: formData.phone,
      message: formData.message || undefined,
      date: new Date().toISOString(),
      status: 'Quote Sent',
    })

    // Trigger push notification prompt (only asks once, handled internally)
    setShowPushPrompt(true)
  }

  return (
    <section className="section-pad bg-background">
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] dark:text-white mb-4">
                {t('title')}
              </h2>
              <p className="text-muted-foreground text-lg">{t('subtitle')}</p>
            </div>

            <div className="space-y-5">
              <ContactItem
                icon={<Phone className="w-5 h-5 text-[#FF6B00]" />}
                label={t('whatsapp_label')}
                value="052 849 4331"
                href="https://wa.me/971528494331"
                bg="bg-[#FF6B00]/10"
              />
              <ContactItem
                icon={<MessageCircle className="w-5 h-5 text-[#25D366]" />}
                label="WhatsApp Chat"
                value="Start a conversation"
                href="https://wa.me/971528494331"
                bg="bg-[#25D366]/10"
              />
              <ContactItem
                icon={<MapPin className="w-5 h-5 text-[#0A2540] dark:text-[#00B4D8]" />}
                label={t('address')}
                value="Dubai, United Arab Emirates"
                bg="bg-[#0A2540]/10 dark:bg-[#00B4D8]/10"
              />
              <ContactItem
                icon={<Clock className="w-5 h-5 text-[#00B4D8]" />}
                label={t('hours')}
                value={t('hours_detail')}
                bg="bg-[#00B4D8]/10"
              />
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-border h-56 bg-gray-100 dark:bg-[#0d2a4a] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-[#FF6B00]" />
                <p className="text-sm font-medium">Dubai, UAE</p>
                <p className="text-xs">Serving All Emirates</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-[#0d2a4a] rounded-2xl p-8 shadow-sm border border-border">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">{t('name')} *</Label>
                  <Input
                    id="name"
                    required
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">{t('phone')} *</Label>
                  <Input
                    id="phone"
                    required
                    placeholder="+971 5X XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>{t('service')} *</Label>
                  <Select
                    required
                    onValueChange={(v) => setFormData({ ...formData, service: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('service')} />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s} value={tServices(`${s}.name`)}>
                          {tServices(`${s}.name`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="area">{t('area')}</Label>
                  <Input
                    id="area"
                    placeholder="Dubai Marina, JBR..."
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">{t('message')}</Label>
                <Textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your requirement..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Photo capture */}
              <div className="space-y-2">
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*,application/pdf,.pdf,.doc,.docx"
                  onChange={handlePhotoChange}
                  className="absolute w-px h-px opacity-0 overflow-hidden"
                  id="photo-input"
                  aria-label={t('photo_btn')}
                />

                {!photoPreview ? (
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-[#FF6B00]/40 text-[#FF6B00] hover:border-[#FF6B00] hover:bg-[#FF6B00]/5 transition-all text-sm font-medium"
                  >
                    <Paperclip className="w-4 h-4" />
                    {t('photo_btn')}
                  </button>
                ) : (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FF6B00]/5 border border-[#FF6B00]/20">
                    <div className="relative shrink-0">
                      {photoFile?.type.startsWith('image/') ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={photoPreview!}
                          alt="File preview"
                          className="w-20 h-20 rounded-lg object-cover border border-[#FF6B00]/30"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-lg border border-[#FF6B00]/30 bg-[#FF6B00]/5 flex items-center justify-center">
                          <FileText className="w-8 h-8 text-[#FF6B00]" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-600 transition-colors"
                        aria-label={t('photo_remove')}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#0A2540] dark:text-white truncate">
                        {photoFile?.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {t('photo_sending')}
                      </p>
                    </div>
                  </div>
                )}

                {!photoPreview && (
                  <p className="text-xs text-muted-foreground text-center">{t('photo_hint')}</p>
                )}

                {/* Hint when photo can't auto-attach on desktop */}
                {photoShareHint && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 text-center bg-amber-50 dark:bg-amber-900/20 rounded-lg px-3 py-2">
                    Please attach the photo manually in WhatsApp after it opens.
                  </p>
                )}
              </div>

              <Button type="submit" variant="whatsapp" size="lg" className="w-full gap-2 font-semibold">
                <MessageCircle className="w-5 h-5" />
                {t('submit')}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                {t('or')} &nbsp;
                <a
                  href="https://wa.me/971528494331"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] font-medium hover:underline"
                >
                  WhatsApp: 052 849 4331
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Push notification prompt — shown after form submission */}
      {showPushPrompt && (
        <PushNotificationManager
          userName={formData.name}
          phone={formData.phone}
          onDismiss={() => setShowPushPrompt(false)}
        />
      )}
    </section>
  )
}

function ContactItem({
  icon,
  label,
  value,
  href,
  bg,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
  bg: string
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div>
        <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
        <div className="text-sm font-medium text-[#0A2540] dark:text-white whitespace-pre-line">
          {value}
        </div>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity block">
        {content}
      </a>
    )
  }

  return <div>{content}</div>
}
