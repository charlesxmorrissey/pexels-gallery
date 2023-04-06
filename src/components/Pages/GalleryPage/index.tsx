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
