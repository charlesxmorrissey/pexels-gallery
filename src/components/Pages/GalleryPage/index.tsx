import type { NextPage } from 'next'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { GalleryTemplate } from 'components/PageTemplates/GalleryTemplate'
import { ApiBaseUrl, Category, MediaPerPage } from 'constant'
import { Params, Photos, Videos } from 'types'
import { fetchData, getPath } from 'utils'

interface Props {
  mediaData: Photos | Videos
}

export const GalleryPage: NextPage<Props> = ({ mediaData }) => (
  <GalleryTemplate fallbackData={mediaData} />
)

/**
  Server-side rendering (SSR) addresses the performance and search engine optimization issues of single-page JavaScript applications. In contrast to client-side rendering, it generates static content on the server before sending it over to the user’s browser.

  Server-side rendering improves site speed and results in better Core Web Vitals scores.
 */
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query: { category = Category.photos, query } = {} } = context
  const { path } = getPath(!!query)[Category[category as Category]]

  const params: Params = {
    per_page: MediaPerPage,
    ...(query && { query: query.toString() }),
  }

  const mediaData = await fetchData(`${ApiBaseUrl}${path}`, params)

  return {
    props: {
      mediaData,
    },
  }
}
