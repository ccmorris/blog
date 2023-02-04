import Link from 'next/link'
import DateFormatter from './date-formatter'

type Props = {
  title: string
  date: string
  excerpt: string
  slug: string
}

const PostPreview = ({ title, date, excerpt, slug }: Props) => {
  return (
    <div>
      <h2 className="text-3xl mb-3 leading-snug font-bold tracking-tight md:tracking-tighter">
        <Link
          as={`/articles/${slug}`}
          href="/articles/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h2>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      {excerpt ? (
        <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      ) : null}
    </div>
  )
}

export default PostPreview
