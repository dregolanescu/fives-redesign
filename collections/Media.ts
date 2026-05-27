import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/jpeg','image/png','image/webp','image/avif','video/mp4'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, fit: 'inside' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Text alternativ',
      admin: {
        description: 'Descrie imaginea în câteva cuvinte — apare când imaginea nu se încarcă și ajută la accesibilitate (SEO). Ex: „Sala FIVE\'S pregătită pentru eveniment"',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Legendă',
      admin: {
        description: 'Text opțional afișat sub imagine pe site. Util pentru credite foto sau context suplimentar.',
      },
    },
  ],
}
