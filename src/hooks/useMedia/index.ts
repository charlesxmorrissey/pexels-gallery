import { useRouter } from 'next/router'
import useSWR from 'swr'

import { ApiBaseUrl, Category, MediaPerPage } from 'constant'
import { Params, Photos, Videos } from 'types'
import { fetchData, getPath, stringifyParams } from 'utils'

export const useMedia = (fallbackData: Photos | Videos) => {
  const { query: { category = Category.photos, query } = {} } = useRouter()
  const { path } = getPath(!!query)[Category[category as Category]]

  const params: Params = {
    per_page: MediaPerPage,
    ...(query && { query: query.toString() }),
  }

  /**
   SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.
   */
  const { data, error, isLoading } = useSWR(
    `${ApiBaseUrl}${path}?${stringifyParams(params || {})}`,
    () => fetchData(`${ApiBaseUrl}${path}`, params),
    {
      fallbackData,
    }
  )

  if (typeof window !== 'undefined') {
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }

  return {
    isError: error,
    isLoading,
    mediaData: data,
  }
}
