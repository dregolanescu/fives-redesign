import type { CollectionConfig } from 'payload'
export const HeroSlides: CollectionConfig = {
  slug: 'hero-slides',
  admin: { useAsTitle: 'headline', defaultColumns: ['headline','type','order','active'] },
  fields: [
    /* ── Media & overlay (shared, not language-specific) ── */
    { name: 'type', type: 'select', label: 'Tip media', defaultValue: 'video',
      options: [{ label: 'Video', value: 'video' },{ label: 'Imagine', value: 'image' }] },
    { name: 'videoFile', type: 'upload', relationTo: 'media', label: 'Video MP4',
      admin: { condition: (d) => d?.type === 'video' } },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Imagine',
      admin: { condition: (d) => d?.type === 'image' } },
    { name: 'posterImage', type: 'upload', relationTo: 'media', label: 'Poster fallback',
      admin: { condition: (d) => d?.type === 'video' } },
    { name: 'overlayStrength', type: 'select', label: 'Intensitate overlay',
      defaultValue: 'medium',
      options: [
        { label: 'Fara overlay', value: 'none' },
        { label: 'Usor', value: 'light' },
        { label: 'Mediu', value: 'medium' },
        { label: 'Puternic', value: 'strong' },
      ],
      admin: { description: 'Cat de intunecata e suprapunerea peste imagine/video.' } },

    /* ── Text content — tabs per language ── */
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Romana',
          description: 'Textele afisate cand site-ul e pe romana',
          fields: [
            { name: 'subtitle', type: 'text', label: 'Subtitlu',
              admin: { description: 'Textul mic de deasupra titlului. Ex: „Productie tehnica de evenimente"' } },
            { name: 'headline', type: 'text', label: 'Titlu principal',
              admin: { description: 'Titlul mare din hero. Scurt si de impact.' } },
            { name: 'description', type: 'textarea', label: 'Descriere',
              admin: { description: 'Textul explicativ de sub titlu (optional).' } },
            { name: 'ctaPrimaryText', type: 'text', label: 'Buton principal — text',
              admin: { description: 'Ex: „Solicita oferta"' } },
            { name: 'ctaSecondaryText', type: 'text', label: 'Buton secundar — text',
              admin: { description: 'Ex: „Vezi proiecte"' } },
          ],
        },
        {
          label: 'English',
          description: 'Text shown when the site language is English',
          fields: [
            { name: 'subtitleEn', type: 'text', label: 'Subtitle',
              admin: { description: 'Small text above the headline. E.g. "Technical Event Production"' } },
            { name: 'headlineEn', type: 'text', label: 'Headline',
              admin: { description: 'Main hero title in English. Keep it short and impactful.' } },
            { name: 'descriptionEn', type: 'textarea', label: 'Description',
              admin: { description: 'Explanatory text below the headline (optional).' } },
            { name: 'ctaPrimaryTextEn', type: 'text', label: 'Primary button — text',
              admin: { description: 'E.g. "Get a Quote"' } },
            { name: 'ctaSecondaryTextEn', type: 'text', label: 'Secondary button — text',
              admin: { description: 'E.g. "View Projects"' } },
          ],
        },
      ],
    },

    /* ── CTA links (shared — same pages for both languages) ── */
    { name: 'ctaPrimaryUrl', type: 'text', label: 'Buton principal — link',
      admin: { placeholder: '/contact', description: 'Link-ul butonului principal. Cale relativa, ex: /contact' } },
    { name: 'ctaSecondaryUrl', type: 'text', label: 'Buton secundar — link',
      admin: { placeholder: '/proiecte', description: 'Link-ul butonului secundar. Cale relativa, ex: /proiecte' } },

    /* ── Sidebar controls ── */
    { name: 'order', type: 'number', label: 'Ordine', defaultValue: 1, admin: { position: 'sidebar' } },
    { name: 'active', type: 'checkbox', label: 'Activ', defaultValue: true,
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/admin/ActiveToggle',
          Cell: '@/components/admin/ActiveCell',
        },
      },
    },
  ],
}
