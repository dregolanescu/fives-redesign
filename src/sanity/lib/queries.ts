import { groq } from "next-sanity";

// Projects
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, date desc) {
    _id,
    title,
    slug,
    coverImage,
    category->{title, slug},
    date,
    location,
    services,
    featured,
    seo
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    coverImage,
    category->{title, slug},
    date,
    location,
    context,
    challenge,
    solution,
    services,
    metrics,
    gallery,
    seo
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc) [0...4] {
    _id,
    title,
    slug,
    coverImage,
    category->{title, slug}
  }
`;

// News
export const newsArticlesQuery = groq`
  *[_type == "newsArticle"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    coverImage,
    category,
    publishedAt,
    excerpt,
    featured,
    author->{name, role, image}
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "newsArticle" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    coverImage,
    category,
    publishedAt,
    body,
    gallery,
    author->{name, role, image},
    seo
  }
`;

// Testimonials
export const testimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(order asc) {
    _id,
    quote,
    name,
    role,
    company,
    image
  }
`;

// Project Categories
export const projectCategoriesQuery = groq`
  *[_type == "projectCategory"] | order(order asc) {
    _id,
    title,
    slug
  }
`;

// Global Settings
export const globalSettingsQuery = groq`
  *[_type == "globalSettings"][0] {
    siteName,
    siteDescription,
    ogImage,
    contact,
    social,
    stats,
    footerLinks
  }
`;
