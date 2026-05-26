import { project } from "./project";
import { projectCategory } from "./project-category";
import { newsArticle } from "./news-article";
import { author } from "./author";
import { testimonial } from "./testimonial";
import { globalSettings } from "./global-settings";

export const schemaTypes = [
  // Documents
  project,
  projectCategory,
  newsArticle,
  author,
  testimonial,

  // Singletons
  globalSettings,
];
