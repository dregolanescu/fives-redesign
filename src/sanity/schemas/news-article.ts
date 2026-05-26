import { defineType, defineField } from "sanity";

export const newsArticle = defineType({
  name: "newsArticle",
  title: "News Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titlu",
      type: "object",
      fields: [
        { name: "ro", title: "Română", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.ro", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Imagine cover",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: [
          { title: "Eveniment", value: "eveniment" },
          { title: "Tehnologie", value: "tehnologie" },
          { title: "Echipă", value: "echipa" },
          { title: "Industrie", value: "industrie" },
        ],
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Data publicării",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Rezumat",
      type: "object",
      fields: [
        { name: "ro", title: "Română", type: "text", rows: 3 },
        { name: "en", title: "English", type: "text", rows: 3 },
      ],
    }),
    defineField({
      name: "body",
      title: "Conținut",
      type: "object",
      fields: [
        {
          name: "ro",
          title: "Română",
          type: "array",
          of: [
            { type: "block" },
            { type: "image", options: { hotspot: true } },
          ],
        },
        {
          name: "en",
          title: "English",
          type: "array",
          of: [
            { type: "block" },
            { type: "image", options: { hotspot: true } },
          ],
        },
      ],
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "featured",
      title: "Articol evidențiat",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "metaTitle", title: "Meta Title", type: "string" },
        { name: "metaDescription", title: "Meta Description", type: "text", rows: 3 },
        { name: "ogImage", title: "Open Graph Image", type: "image" },
      ],
    }),
  ],
  orderings: [
    {
      title: "Data publicării",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title.ro",
      subtitle: "category",
      media: "coverImage",
    },
  },
});
