import type { NextPage } from 'next'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { GalleryTemplate } from 'components/PageTemplates/GalleryTemplate'
import { ResourcePath, photoBaseUrl, photosPerPage } from 'constant'
import { Params, Photos } from 'types'
import { fetchData } from 'utils'

interface Props {
  photoData: Photos
}

export const GalleryPage: NextPage<Props> = ({ photoData }) => (
  <GalleryTemplate fallbackData={photoData} />
)

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query: { page, query } = {} } = context
  const currPage = Number(page) || 1
  const path = !query ? ResourcePath.curated : ResourcePath.search

  const params: Params = {
    per_page: photosPerPage,
    ...(page && { page: currPage }),
    ...(query && { query: query.toString() }),
  }

  const photoData = await fetchData(`${photoBaseUrl}${path}`, params)

  return {
    props: {
      photoData,
    },
  }
}
