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
  })
  return result.docs
}

export async function getArticleBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
    limit: 1,
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
  })
  return result.docs
}

export async function getHeroConfig() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'hero-config' })
}
