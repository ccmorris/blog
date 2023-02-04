import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import Layout from '../../components/layout'
import { getAllPosts, getPostBySlug } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'
import type PostType from '../../interfaces/post'
import PostTitle from '../../components/post-title'
import PostFooter from '../../components/post-footer'
import Container from '../../components/container'

type Props = {
  post: PostType
  relatedPosts: Array<{ tag: string; posts: PostType[] }>
  preview?: boolean
}

export default function Post({ post, relatedPosts, preview }: Props) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Head>
        <title>{`${post.title} | Chris Morris' Blog`}</title>
        <meta name="keywords" content={post.tags?.join(', ')} />
      </Head>
      <Header />
      <Container>
        <article className="mb-24 max-w-2xl mx-auto">
          <PostTitle title={post.title} date={post.date} />
          <PostBody content={post.content} />
          <PostFooter relatedPosts={relatedPosts} />
        </article>
      </Container>
    </Layout>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = await getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
    'tags',
  ])
  const content = await markdownToHtml(post.content)

  const relatedPosts = await getRelatedPosts(post)

  return {
    props: {
      post: {
        ...post,
        content,
      },
      relatedPosts,
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

const getRelatedPosts = async (post: Record<string, unknown>) => {
  if (!Array.isArray(post.tags)) {
    return []
  }

  const tags: string[] = post.tags
  if (!tags.length) return []
  const allPosts = await getAllPosts([
    'title',
    'date',
    'slug',
    'content',
    'tags',
  ])
  return tags
    .map((tag) => {
      const postsWithTag = allPosts.filter(
        (p) => p.tags.includes(tag) && p.slug !== post.slug
      )
      if (!postsWithTag.length) return undefined
      return { tag, posts: postsWithTag.slice(0, 3) }
    })
    .filter((tag) => Boolean(tag))
}
