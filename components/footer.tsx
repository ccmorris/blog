import { GITHUB_URL, TWITTER_URL } from '../lib/constants'
import Container from './container'

const Footer = () => {
  return (
    <footer className="bg-slate-200 shadow-inner">
      <Container>
        <div className="py-16 flex flex-col lg:flex-row items-center">
          <div className="lg:pr-4 lg:w-1/2 text-center lg:text-left">
            <h3 className="text-3xl font-bold tracking-tighter leading-tight lg:text-left mb-4">
              Say hi on Twitter
            </h3>
            <a href={TWITTER_URL} className="hover:underline">
              @chrismorris
            </a>
          </div>
          <div className="mt-10 flex flex-col lg:flex-row justify-end items-center lg:pl-4 lg:w-1/2">
            <a href={GITHUB_URL} className="mx-3 font-bold hover:underline">
              <img src="/assets/github.svg" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
