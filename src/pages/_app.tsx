import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'

import { PageLayout } from 'components/Atoms/PageLayout'

import 'assets/styles/app.css'

/**
  next/font includes built-in automatic self-hosting for any font file. This means you can optimally load web fonts with zero layout shift, thanks to the underlying CSS size-adjust property used.

  This new font system also allows you to conveniently use all Google Fonts with performance and privacy in mind. CSS and font files are downloaded at build time and self-hosted with the rest of your static assets. No requests are sent to Google by the browser.
 */
const inter = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Code challenge using the Pexels api</title>
      <meta content='Code challenge using the Pexels api' name='description' />
      <meta content='width=device-width, initial-scale=1' name='viewport' />
      <link href='/favicon.ico' rel='icon' />
      {/*
        Effect on Largest Contentful Paint (LCP)

        Using dns-prefetch and preconnect allows sites to reduce the amount of time it takes to connect to another origin. The ultimate aim is that the time to load a resource from another origin should be minimized as much as possible.
      */}

      {/*
        Establish network connections early to improve perceived page speed.

        Adding rel=preconnect to a <link> informs the browser that your page intends to establish a connection to another domain, and that you'd like the process to start as soon as possible. Resources will load more quickly because the setup process has already been completed by the time the browser requests them.
      */}
      <link href='https://api.pexels.com' rel='preconnect' />
      <link href='https://player.vimeo.com' rel='preconnect' />

      {/*
        Gives a hint to the browser to perform a DNS lookup in the background to improve performance.
      */}
      <link href='https://api.pexels.com' rel='dns-prefetch' />
      <link href='https://player.vimeo.com' rel='dns-prefetch' />
    </Head>

    {/*
      Store the font in a CSS variable so that it's easily accessible on all pages and components.
    */}
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
