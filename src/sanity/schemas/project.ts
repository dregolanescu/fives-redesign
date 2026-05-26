import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
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
      name: "category",
      title: "Categorie",
      type: "reference",
      to: [{ type: "projectCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Imagine principală",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Data evenimentului",
      type: "date",
    }),
    defineField({
      name: "location",
      title: "Locație",
      type: "string",
    }),
    defineField({
      name: "context",
      title: "Context",
      type: "object",
      fields: [
        { name: "ro", title: "Română", type: "text", rows: 4 },
        { name: "en", title: "English", type: "text", rows: 4 },
      ],
    }),
    defineField({
      name: "challenge",
      title: "Provocarea",
      type: "object",
      fields: [
        { name: "ro", title: "Română", type: "text", rows: 4 },
        { name: "en", title: "English", type: "text", rows: 4 },
      ],
    }),
    defineField({
      name: "solution",
      title: "Soluția tehnică",
      type: "object",
      fields: [
        { name: "ro", title: "Română", type: "text", rows: 4 },
        { name: "en", title: "English", type: "text", rows: 4 },
      ],
    }),
    defineField({
      name: "services",
      title: "Servicii",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Sunet", value: "sunet" },
          { title: "Lumini", value: "lumini" },
          { title: "Video", value: "video" },
          { title: "Scenotehnică", value: "scenotehnica" },
        ],
      },
    }),
    defineField({
      name: "metrics",
      title: "Cifre cheie",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Valoare", type: "string" },
            { name: "label", title: "Etichetă", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "featured",
      title: "Proiect evidențiat",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Ordine afișare",
      type: "number",
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
      title: "Data evenimentului",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Ordine manuală",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title.ro",
      subtitle: "category.title.ro",
      media: "coverImage",
    },
  },
});
