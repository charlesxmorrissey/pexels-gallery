import { useRouter } from 'next/router'
import useSWR from 'swr'

import { ResourcePath, photoBaseUrl, photosPerPage } from 'constant'
import { Params, Photos } from 'types'
import { fetchData, stringifyParams } from 'utils'

const usePhotos = (fallbackData: Photos) => {
  const { query: { page, query } = {} } = useRouter()
  const path = !query ? ResourcePath.curated : ResourcePath.search
  const params: Params = {
    per_page: photosPerPage,
    ...(page && { page: page.toString() }),
    ...(query && { query: query.toString() }),
  }

  const { data, error, isLoading } = useSWR(
    `${photoBaseUrl}${path}?${stringifyParams(params || {})}`,
    () => fetchData(`${photoBaseUrl}${path}`, params),
    {
      fallbackData,
    }
  )

  const prevPageNum = data?.prev_page ? data.page - 1 : undefined
  const nextPageNum = data?.next_page ? data.page + 1 : undefined

  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 })
  }

  return {
    isError: error,
    isLoading,
    nextPageNum,
    photoData: data,
    prevPageNum,
  }
}

export default usePhotos
