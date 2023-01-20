import PostPreview from './post-preview'
import type Post from '../interfaces/post'

type Props = {
  posts: Post[]
}

const PostList = ({ posts }: Props) => {
  return (
    <section className="max-w-2xl mx-auto">
      {posts.map((post) => (
        <div className="mb-24">
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.date}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        </div>
      ))}
    </section>
  )
}

export default PostList
