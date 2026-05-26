import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemas";

export default defineConfig({
  name: "fives-studio",
  title: "FIVE'S Studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Conținut")
          .items([
            // Projects
            S.listItem()
              .title("Proiecte")
              .child(
                S.list()
                  .title("Proiecte")
                  .items([
                    S.listItem()
                      .title("Toate proiectele")
                      .child(S.documentTypeList("project").title("Proiecte")),
                    S.listItem()
                      .title("Categorii")
                      .child(
                        S.documentTypeList("projectCategory").title("Categorii")
                      ),
                  ])
              ),
            S.divider(),

            // News
            S.listItem()
              .title("Noutăți")
              .child(S.documentTypeList("newsArticle").title("Articole")),

            // Testimonials
            S.listItem()
              .title("Testimoniale")
              .child(
                S.documentTypeList("testimonial").title("Testimoniale")
              ),

            S.divider(),

            // Authors
            S.listItem()
              .title("Autori")
              .child(S.documentTypeList("author").title("Autori")),

            S.divider(),

            // Settings (singleton)
            S.listItem()
              .title("Setări globale")
              .child(
                S.document()
                  .schemaType("globalSettings")
                  .documentId("globalSettings")
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
