import type { CollectionConfig } from 'payload'
export const HeroSlides: CollectionConfig = {
  slug: 'hero-slides',
  admin: { useAsTitle: 'headline', defaultColumns: ['headline','type','order','active'] },
  fields: [
    { name: 'type', type: 'select', label: 'Tip', required: true, defaultValue: 'video',
      options: [{ label: 'Video', value: 'video' },{ label: 'Imagine', value: 'image' }] },
    { name: 'videoFile', type: 'upload', relationTo: 'media', label: 'Video MP4',
      admin: { condition: (d) => d?.type === 'video' } },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Imagine',
      admin: { condition: (d) => d?.type === 'image' } },
    { name: 'posterImage', type: 'upload', relationTo: 'media', label: 'Poster fallback',
      admin: { condition: (d) => d?.type === 'video' } },
    { name: 'subtitle', type: 'text', label: 'Subtitlu' },
    { name: 'headline', type: 'text', label: 'Titlu principal', required: true },
    { name: 'description', type: 'textarea', label: 'Descriere' },
    { name: 'ctaPrimaryText', type: 'text', label: 'CTA 1 — text' },
    { name: 'ctaPrimaryUrl', type: 'text', label: 'CTA 1 — link' },
    { name: 'ctaSecondaryText', type: 'text', label: 'CTA 2 — text' },
    { name: 'ctaSecondaryUrl', type: 'text', label: 'CTA 2 — link' },
    { name: 'order', type: 'number', label: 'Ordine', required: true, defaultValue: 1, admin: { position: 'sidebar' } },
    { name: 'active', type: 'checkbox', label: 'Activ', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
