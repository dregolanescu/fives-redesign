import { getPayload } from 'payload'
import configPromise from '../../payload.config'

export async function getPayloadClient() {
  return getPayload({ config: configPromise })
}

export async function getPublishedArticles() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'articles',
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
    limit: 20,
    depth: 2,
  })
  return result.docs
}

export async function getArticleBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return result.docs[0] || null
}

export async function getHeroSlides() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'hero-slides',
    where: { active: { equals: true } },
    sort: 'order',
    limit: 10,
    depth: 2,
  })
  return result.docs
}

export async function getHeroConfig() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'hero-config', depth: 2 })
}

export async function getPublishedProjects() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    where: { status: { equals: 'published' } },
    sort: 'order',
    limit: 50,
    depth: 1, // heroImage populates at depth 1; list cards don't need gallery/metrics
    select: {
      slug: true, category: true, year: true, order: true, status: true,
      heroImage: true, title: true, titleEn: true, description: true, descriptionEn: true,
    },
  })
  return result.docs
}

export async function getProjectBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return result.docs[0] || null
}

export async function getFeaturedProjects() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    where: { status: { equals: 'published' }, featuredHome: { equals: true } },
    sort: 'order',
    limit: 4,
    depth: 1,
    select: {
      slug: true, category: true, year: true, order: true, status: true, featuredHome: true,
      heroImage: true, title: true, titleEn: true, description: true, descriptionEn: true,
    },
  })
  return result.docs
}
