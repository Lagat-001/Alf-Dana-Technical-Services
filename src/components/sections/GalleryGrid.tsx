'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const GALLERY_ITEMS = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    category: 'indoor',
    title: 'Modern Kitchen Renovation',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    category: 'indoor',
    title: 'Bathroom Tiling',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800&q=80',
    category: 'indoor',
    title: 'Interior Painting',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1558002038-1055e2dae1d7?w=800&q=80',
    category: 'indoor',
    title: 'AC Installation',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
    category: 'indoor',
    title: 'Living Room Renovation',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80',
    category: 'outdoor',
    title: 'Villa Exterior',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    category: 'outdoor',
    title: 'Building Maintenance',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    category: 'commercial',
    title: 'Office Renovation',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
    category: 'commercial',
    title: 'Commercial Interior',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    category: 'indoor',
    title: 'Master Bedroom',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80',
    category: 'indoor',
    title: 'Deep Cleaning Service',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80',
    category: 'outdoor',
    title: 'Pool Area',
  },
]

type Filter = 'all' | 'indoor' | 'outdoor' | 'commercial'

export function GalleryGrid() {
  const t = useTranslations('gallery')
  const [filter, setFilter] = useState<Filter>('all')
  const [lightbox, setLightbox] = useState<(typeof GALLERY_ITEMS)[0] | null>(null)

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t('filter_all') },
    { key: 'indoor', label: t('filter_indoor') },
    { key: 'outdoor', label: t('filter_outdoor') },
    { key: 'commercial', label: t('filter_commercial') },
  ]

  const filtered =
    filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === filter)

  return (
    <section className="section-pad bg-background">
      <div className="container-brand">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] dark:text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-muted-foreground text-lg">{t('subtitle')}</p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-colors',
                filter === f.key
                  ? 'bg-[#0A2540] text-white dark:bg-[#FF6B00]'
                  : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/70 hover:bg-[#0A2540]/10 dark:hover:bg-white/20'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
              onClick={() => setLightbox(item)}
            >
              <div className="relative">
                <Image
                  src={item.src}
                  alt={item.title}
                  width={800}
                  height={600}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#0A2540]/0 group-hover:bg-[#0A2540]/50 transition-colors duration-300 flex items-end">
                  <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm font-semibold">{item.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 end-4 text-white/80 hover:text-white p-2"
            onClick={() => setLightbox(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.src}
              alt={lightbox.title}
              width={1200}
              height={900}
              className="object-contain max-h-[85vh] rounded-lg"
            />
            <p className="text-white text-center mt-3 text-sm font-medium">{lightbox.title}</p>
          </div>
        </div>
      )}
    </section>
  )
}
