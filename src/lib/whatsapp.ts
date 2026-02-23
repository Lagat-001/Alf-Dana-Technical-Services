const PHONE = '971528494331'

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
}

export function getGenericWhatsAppLink(): string {
  return getWhatsAppLink("Hello! I'm interested in your technical services. Can you please help me?")
}

export interface QuoteFormData {
  name: string
  phone: string
  email: string
  service: string
  area: string
  message: string
}

export function getQuoteWhatsAppLink(formData: QuoteFormData): string {
  const msg = [
    'Hello ALF DANA! I would like to request a quote.',
    `Name: ${formData.name}`,
    `Phone: ${formData.phone}`,
    formData.email ? `Email: ${formData.email}` : '',
    `Service: ${formData.service}`,
    `Area: ${formData.area}`,
    formData.message ? `Details: ${formData.message}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  return getWhatsAppLink(msg)
}

export function getServiceWhatsAppLink(serviceName: string): string {
  return getWhatsAppLink(
    `Hello! I'm interested in your ${serviceName} service. Could you please provide a quote?`
  )
}

export function getChatbotHandoffLink(userQuestion: string): string {
  return getWhatsAppLink(
    `Hello ALF DANA! I was chatting with your assistant and have a question: "${userQuestion}"`
  )
}
