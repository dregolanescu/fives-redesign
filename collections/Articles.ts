import type { CollectionConfig } from 'payload'
function slugify(t: string) {
  return t.toLowerCase().normalize('NFD').replace(/[^\w\s-]/g,'').trim().replace(/\s+/g,'-')
}
export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: { useAsTitle: 'title', defaultColumns: ['title','category','status','publishedDate'] },
  hooks: {
    beforeChange: [({ data }) => {
      if (!data.slug && data.title) data.slug = slugify(data.title)
      if (data.content) {
        const wc = JSON.stringify(data.content).split(/\s+/).length
        data.readTime = Math.max(1, Math.ceil(wc / 200))
      }
      return data
    }],
  },
  fields: [
    /* ── Shared fields (not language-specific) ── */
    { name: 'slug', type: 'text', label: 'Slug', index: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'status', type: 'select', label: 'Status', required: true, defaultValue: 'draft',
      options: [{ label: 'Draft', value: 'draft' },{ label: 'Publicat', value: 'published' }],
      admin: { position: 'sidebar' } },
    { name: 'publishedDate', type: 'date', label: 'Data publicarii', required: true, admin: { position: 'sidebar' } },
    { name: 'category', type: 'select', label: 'Categorie', required: true,
      options: [{ label: 'Festival', value: 'Festival' },{ label: 'Corporate', value: 'Corporate' },
                { label: 'Tehnologie', value: 'Tehnologie' },{ label: 'Companie', value: 'Companie' }] },
    { name: 'featuredImage', type: 'upload', relationTo: 'media', label: 'Imagine principala' },
    { name: 'readTime', type: 'number', label: 'Timp citire (min)', admin: { position: 'sidebar', readOnly: true } },

    /* ── Content — tabs per language ── */
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Romana',
          description: 'Continutul articolului in limba romana',
          fields: [
            { name: 'title', type: 'text', label: 'Titlu', required: true },
            { name: 'excerpt', type: 'textarea', label: 'Rezumat', required: true,
              admin: { description: 'Apare pe pagina de Noutati (lista) si in SEO.' } },
            { name: 'content', type: 'richText', label: 'Continut articol',
              admin: { description: 'Textul complet. Apasa "/" pentru optiuni de formatare.' } },
          ],
        },
        {
          label: 'English',
          description: 'Article content in English',
          fields: [
            { name: 'titleEn', type: 'text', label: 'Title',
              admin: { description: 'Leave empty to keep only the Romanian version.' } },
            { name: 'excerptEn', type: 'textarea', label: 'Excerpt',
              admin: { description: 'Shown on the News listing page and in SEO when language is English.' } },
            { name: 'contentEn', type: 'richText', label: 'Article content',
              admin: { description: 'Full article text in English. Press "/" for formatting options.' } },
          ],
        },
      ],
    },

    /* ── SEO — tabs per language ── */
    {
      type: 'collapsible',
      label: 'SEO',
      admin: { initCollapsed: true },
      fields: [
        { name: 'metaTitle', type: 'text', label: 'SEO — Titlu pagina (RO)', admin: { description: 'Titlul paginii in Google pentru romana.' } },
        { name: 'metaDescription', type: 'textarea', label: 'SEO — Meta descriere (RO)', admin: { description: 'Descrierea din Google pentru romana.' } },
        { name: 'metaTitleEn', type: 'text', label: 'SEO — Page title (EN)', admin: { description: 'Google page title for English.' } },
        { name: 'metaDescriptionEn', type: 'textarea', label: 'SEO — Meta description (EN)', admin: { description: 'Google meta description for English.' } },
      ],
    },
  ],
}
