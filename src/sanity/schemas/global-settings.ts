import { defineType, defineField } from "sanity";

export const globalSettings = defineType({
  name: "globalSettings",
  title: "Global Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Nume site",
      type: "string",
      initialValue: "FIVE'S Production",
    }),
    defineField({
      name: "siteDescription",
      title: "Descriere site",
      type: "object",
      fields: [
        { name: "ro", title: "Română", type: "text", rows: 3 },
        { name: "en", title: "English", type: "text", rows: 3 },
      ],
    }),
    defineField({
      name: "ogImage",
      title: "Default OG Image",
      type: "image",
    }),
    defineField({
      name: "contact",
      title: "Informații contact",
      type: "object",
      fields: [
        { name: "email", title: "Email", type: "string" },
        { name: "phone", title: "Telefon", type: "string" },
        { name: "address", title: "Adresă", type: "text", rows: 2 },
      ],
    }),
    defineField({
      name: "social",
      title: "Social Media",
      type: "object",
      fields: [
        { name: "facebook", title: "Facebook", type: "url" },
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "youtube", title: "YouTube", type: "url" },
      ],
    }),
    defineField({
      name: "stats",
      title: "Cifre companie",
      type: "object",
      fields: [
        { name: "years", title: "Ani experiență", type: "string" },
        { name: "events", title: "Evenimente / an", type: "string" },
        { name: "equipment", title: "Investiție echipamente", type: "string" },
        { name: "specialists", title: "Specialiști", type: "string" },
        { name: "countries", title: "Țări", type: "string" },
      ],
    }),
    defineField({
      name: "footerLinks",
      title: "Link-uri footer",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Etichetă", type: "string" },
            { name: "url", title: "URL", type: "string" },
            { name: "external", title: "Link extern", type: "boolean" },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Setări globale" }),
  },
});
