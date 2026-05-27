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
    { name: 'title', type: 'text', label: 'Titlu', required: true },
    { name: 'slug', type: 'text', label: 'Slug', index: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'status', type: 'select', label: 'Status', required: true, defaultValue: 'draft',
      options: [{ label: 'Draft', value: 'draft' },{ label: 'Publicat', value: 'published' }],
      admin: { position: 'sidebar' } },
    { name: 'publishedDate', type: 'date', label: 'Data publicarii', required: true, admin: { position: 'sidebar' } },
    { name: 'category', type: 'select', label: 'Categorie', required: true,
      options: [{ label: 'Festival', value: 'Festival' },{ label: 'Corporate', value: 'Corporate' },
                { label: 'Tehnologie', value: 'Tehnologie' },{ label: 'Companie', value: 'Companie' }] },
    { name: 'featuredImage', type: 'upload', relationTo: 'media', label: 'Imagine principala' },
    { name: 'excerpt', type: 'textarea', label: 'Rezumat', required: true,
      admin: { description: 'Apare doar pe pagina de Noutati (lista articolelor) si in SEO. Nu este afisat in articolul deschis.' } },
    { name: 'content', type: 'richText', label: 'Continut articol',
      admin: { description: 'Textul complet al articolului. Scrie direct sau apasa "/" pentru optiuni de formatare (titluri, separatoare etc.).' } },
    { name: 'readTime', type: 'number', label: 'Timp citire (min)', admin: { position: 'sidebar', readOnly: true } },
    { name: 'metaTitle', type: 'text', label: 'SEO — Titlu pagina', admin: { position: 'sidebar' } },
    { name: 'metaDescription', type: 'textarea', label: 'SEO — Meta descriere', admin: { position: 'sidebar' } },
  ],
}
