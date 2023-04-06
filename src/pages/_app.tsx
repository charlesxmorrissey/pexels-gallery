import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'

import { PageLayout } from 'components/Atoms/PageLayout'

import 'assets/styles/app.css'

const inter = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Code challenge using the Pexels api</title>
      <meta content='Code challenge using the Pexels api' name='description' />
      <meta content='width=device-width, initial-scale=1' name='viewport' />
      <link href='/favicon.ico' rel='icon' />
      <link href='https://api.pexels.com' rel='preconnect' />
      <link href='https://player.vimeo.com' rel='preconnect' />
      <link href='https://api.pexels.com' rel='dns-prefetch' />
      <link href='https://player.vimeo.com' rel='dns-prefetch' />
    </Head>

    <style global jsx>{`
      :root {
        --font-inter: ${inter.style.fontFamily};
      }
    `}</style>

    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  </>
)

export default App
