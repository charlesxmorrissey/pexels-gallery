import { Category, ResourcePath } from 'constant'
import { Params } from 'types'

export const fetchData = async (url: string, params: Params) => {
  try {
    const response = await fetch(`${url}?${stringifyParams(params || {})}`, {
      headers: {
        Accept: 'application/json',
        Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY ?? '',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
    const result = await response.json()

    return result
  } catch (error) {
    console.error('There has been a problem::', error)
  }
}

export const stringifyParams = <T extends Params>(params: T) =>
  Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&')

export const getPath = (
  query: boolean
): Record<string, { path: ResourcePath }> => ({
  [Category.videos]: {
    path: query ? ResourcePath.searchVideos : ResourcePath.popular,
  },
  [Category.photos]: {
    path: query ? ResourcePath.search : ResourcePath.curated,
  },
})
