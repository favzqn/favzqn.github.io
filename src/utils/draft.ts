import { getCollection, type CollectionEntry } from 'astro:content'

export async function getSortedFilteredPosts() {
  const posts = await getCollection('posts')
  const filtered = posts.filter((post: CollectionEntry<'posts'>) => !post.id.startsWith('_'))
  return filtered.sort(
    (a: CollectionEntry<'posts'>, b: CollectionEntry<'posts'>) =>
      b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  )
}
