import Link from 'next/link'
import PostType from '../interfaces/post'
import DateFormatter from './date-formatter'

type PostFooterProps = {
  relatedPosts?: Array<{ tag: string; posts: PostType[] }>
}

const PostFooter = (props: PostFooterProps) => {
  return (
    <section className="mt-12 text-sm">
      {props.relatedPosts?.map(({ tag, posts }) => (
        <div key={tag}>
          <h3>More articles about {tag}:</h3>
          <ul className="ml-5 mb-5">
            {posts.map((post) => (
              <li key={post.slug} className="mb-2">
                <Link as={`/articles/${post.slug}`} href="/articles/[slug]">
                  {post.title}
                </Link>
                <div className="text-xs">
                  <DateFormatter dateString={post.date} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default PostFooter
