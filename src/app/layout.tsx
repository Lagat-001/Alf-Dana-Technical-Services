// Root layout — minimal pass-through.
// The actual <html> and <body> tags are set in [locale]/layout.tsx
// to support dynamic lang and dir attributes for RTL languages.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
