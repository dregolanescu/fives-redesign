import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * /robots.txt
 *
 * Indexing of the preview domain is blocked separately, by the
 * `X-Robots-Tag: noindex` header that vercel.json adds only for
 * fives-preview.advanguard.ro. Crawling stays allowed here on purpose:
 * a crawler has to fetch a page to see its noindex header.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // Images are served from /api/media/file/… — keep them crawlable (image search),
      // everything else under /api and the CMS admin stays out.
      allow: ["/", "/api/media/file/"],
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
