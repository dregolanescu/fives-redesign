import type { CollectionConfig } from 'payload'

function slugify(t: string) {
  return t.toLowerCase().normalize('NFD').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-')
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'status'],
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data.slug && data.title) data.slug = slugify(data.title)
        return data
      },
    ],
  },
  fields: [
    /* ── Shared fields ── */
    { name: 'slug', type: 'text', label: 'Slug', index: true, unique: true, admin: { position: 'sidebar' } },
    {
      name: 'status', type: 'select', label: 'Status', defaultValue: 'draft',
      options: [{ label: 'Draft', value: 'draft' }, { label: 'Publicat', value: 'published' }],
      admin: { position: 'sidebar' },
    },
    {
      name: 'category', type: 'select', label: 'Categorie',
      options: [
        { label: 'Corporate', value: 'Corporate' },
        { label: 'Festival', value: 'Festival' },
        { label: 'Live', value: 'Live' },
        { label: 'Sportiv', value: 'Sportiv' },
        { label: 'Artistic', value: 'Artistic' },
        { label: 'Conferinta', value: 'Conferinta' },
      ],
    },
    { name: 'year', type: 'text', label: 'An', admin: { position: 'sidebar' } },
    { name: 'order', type: 'number', label: 'Ordine', defaultValue: 1, admin: { position: 'sidebar' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Imagine principala' },

    /* ── Content — tabs per language ── */
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Romana',
          description: 'Continutul proiectului in limba romana',
          fields: [
            { name: 'title', type: 'text', label: 'Titlu' },
            { name: 'description', type: 'textarea', label: 'Descriere scurta',
              admin: { description: 'Apare pe cardul din lista de proiecte.' } },
            { name: 'location', type: 'text', label: 'Locatie' },
            { name: 'context', type: 'textarea', label: 'Context',
              admin: { description: 'Contextul proiectului — ce a fost evenimentul.' } },
            { name: 'challenge', type: 'textarea', label: 'Provocare',
              admin: { description: 'Ce a fost dificil sau special la acest proiect.' } },
            { name: 'solution', type: 'textarea', label: 'Solutie',
              admin: { description: 'Cum a rezolvat FIVE\'S provocarea.' } },
          ],
        },
        {
          label: 'English',
          description: 'Project content in English',
          fields: [
            { name: 'titleEn', type: 'text', label: 'Title',
              admin: { description: 'Leave empty to keep only the Romanian version.' } },
            { name: 'descriptionEn', type: 'textarea', label: 'Short description',
              admin: { description: 'Shown on the project card in the listing page.' } },
            { name: 'locationEn', type: 'text', label: 'Location' },
            { name: 'contextEn', type: 'textarea', label: 'Context',
              admin: { description: 'Project context — what the event was about.' } },
            { name: 'challengeEn', type: 'textarea', label: 'Challenge',
              admin: { description: 'What was difficult or special about this project.' } },
            { name: 'solutionEn', type: 'textarea', label: 'Solution',
              admin: { description: 'How FIVE\'S solved the challenge.' } },
          ],
        },
      ],
    },

    /* ── Services ── */
    {
      name: 'services', type: 'select', label: 'Servicii',
      hasMany: true,
      admin: { description: 'Selecteaza serviciile furnizate pentru acest proiect.' },
      options: [
        { label: 'Sunet', value: 'sunet' },
        { label: 'Lumini', value: 'lumini' },
        { label: 'Video', value: 'video' },
        { label: 'Scenotehnica', value: 'scenotehnica' },
        { label: 'Efecte speciale', value: 'efecte-speciale' },
        { label: 'Pirotehnice', value: 'pirotehnice' },
        { label: 'Scena', value: 'scena' },
        { label: 'Productie eveniment', value: 'productie' },
        { label: 'Management tehnic', value: 'management-tehnic' },
      ],
    },

    /* ── Metrics ── */
    {
      name: 'metrics', type: 'array', label: 'Metrici',
      admin: { description: 'Cifrele cheie ale proiectului (ex: 50.000 participanti, 3 scene)' },
      fields: [
        { name: 'value', type: 'text', label: 'Valoare' },
        { name: 'label', type: 'text', label: 'Eticheta' },
        { name: 'labelEn', type: 'text', label: 'Label (EN)' },
      ],
    },

    /* ── Photo gallery ── */
    {
      name: 'gallery', type: 'array', label: 'Galerie foto',
      admin: { description: 'Fotografii din proiect. Se afiseaza intr-un slider cu lightbox.' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Fotografie' },
        { name: 'caption', type: 'text', label: 'Descriere (optional)' },
      ],
    },

    /* ── SEO ── */
    {
      type: 'collapsible',
      label: 'SEO',
      admin: { initCollapsed: true },
      fields: [
        { name: 'metaTitle', type: 'text', label: 'SEO — Titlu pagina (RO)' },
        { name: 'metaDescription', type: 'textarea', label: 'SEO — Meta descriere (RO)' },
        { name: 'metaTitleEn', type: 'text', label: 'SEO — Page title (EN)' },
        { name: 'metaDescriptionEn', type: 'textarea', label: 'SEO — Meta description (EN)' },
      ],
    },
  ],
}
