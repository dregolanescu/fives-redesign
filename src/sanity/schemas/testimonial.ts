import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Citat",
      type: "object",
      fields: [
        { name: "ro", title: "Română", type: "text", rows: 4 },
        { name: "en", title: "English", type: "text", rows: 4 },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Nume",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Funcție",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Companie",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Fotografie",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Evidențiat pe homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Ordine",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "company", media: "image" },
  },
});
