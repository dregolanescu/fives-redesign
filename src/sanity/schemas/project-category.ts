import { defineType, defineField } from "sanity";

export const projectCategory = defineType({
  name: "projectCategory",
  title: "Project Category",
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
      options: { source: "title.ro", maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordine",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title.ro" },
  },
});
