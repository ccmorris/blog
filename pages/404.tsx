import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-row items-center mb-5">
        <h1 className="text-4xl mr-4">404</h1>
        <p>This page could not be found.</p>
      </div>
      <p>
        <Link href="/">Go Home</Link>
      </p>
    </div>
  )
}
