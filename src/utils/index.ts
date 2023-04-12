import { ApiBaseUrl } from 'constant'
import { Category, CategoryType, Params, ResourcePath } from 'types'

/**
 * Wrapper for fetch to accept query params as options.
 *
 * @param path The api path.
 * @param params Query string key-value pairs.
 * @returns A asynchronous fetch function.
 */
export const fetchData = async (path: string, params: Params) => {
  try {
    const response = await fetch(
      `${ApiBaseUrl}${path}?${stringifyParams(params || {})}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY ?? '',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }
    )
    const result = await response.json()

    return result
  } catch (error) {
    console.error('There has been a problem::', error)
  }
}

/**
 * Determine if the current category is 'photos'.
 *
 * @param category The current category.
 * @returns A boolean.
 */
export const isPhotos = (category: CategoryType): boolean =>
  category === Category.photos

/**
 * Construct a query string from an object containing key-value pairs.
 *
 * @param params Query string key-value pairs.
 * @returns A querystring.
 */
export const stringifyParams = <T extends Params>(params: T) =>
  Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&')

/**
 * Determine the api's resource path based on category.
 *
 * @param params Query string key-value pairs.
 * @returns The resource path.
 */
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
