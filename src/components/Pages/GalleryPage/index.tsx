import type { NextPage } from 'next'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { GalleryTemplate } from 'components/PageTemplates/GalleryTemplate'
import { MediaProvider } from 'components/Providers/MediaProvider'
import { MediaPerPage } from 'constant'
import { Category, MediaType, Params } from 'types'
import { fetchData, getPath } from 'utils'

interface Props {
  mediaData: MediaType
}

export const GalleryPage: NextPage<Props> = ({ mediaData }) => (
  <MediaProvider>
    <GalleryTemplate fallbackData={mediaData} />
  </MediaProvider>
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

  const mediaData = await fetchData(path, params)

  return {
    props: {
      mediaData,
    },
  }
}
