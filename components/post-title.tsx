import DateFormatter from './date-formatter'

type Props = {
  title: string
  date: string
}

const PostTitle = ({ title, date }: Props) => {
  return (
    <>
      <h1 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
        {title}
      </h1>
      <div className="mb-6 text-lg">
        <DateFormatter dateString={date} />
      </div>
      <hr />
    </>
  )
}

export default PostTitle
