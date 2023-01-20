import Link from 'next/link'
import { SITE_NAME } from '../lib/constants'
import Container from './container'

const Header = () => {
  return (
    <header
      className="py-16 bg-blue-900 mb-16 text-center text-white relative"
      style={{
        background: 'linear-gradient(180deg, #263793, #0e2c66)',
      }}
    >
      <Container>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight md:tracking-tighter leading-tight mb-4">
          <Link href="/">/* {SITE_NAME} */</Link>
        </h1>
        <p>Software dev who writes about tech life 💻 and curling 🥌</p>
      </Container>
      <div
        className="absolute bottom-0 left-0 right-0 h-5"
        style={{
          background:
            'linear-gradient(to top left, rgb(241 245 249) 50%, transparent calc(50% + 1px))',
        }}
      ></div>
    </header>
  )
}

export default Header
