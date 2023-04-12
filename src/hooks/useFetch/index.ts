import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import { MediaPerPage } from 'constant'
import { useIsFirstRender, useMediaContext } from 'hooks'
import { Category, MediaActionTypes, MediaType, Params } from 'types'
import { fetchData, getPath } from 'utils'

export const useFetch = ({
  fallbackData = {},
  params = {},
}: {
  fallbackData?: MediaType
  params?: Params
}) => {
  const isFirstRender = useIsFirstRender()

  const { dispatch, state } = useMediaContext()
  const { query: { category = Category.photos, query } = {} } = useRouter()
  const { path } = getPath(!!query)[Category[category as Category]]

  const [currentCategory, setCurrentCategory] = useState(category)

  const defaultParams: Params = useMemo(
    () => ({
      per_page: MediaPerPage,
      ...(query && { query: query.toString() }),
    }),
    [query]
  )

  const fetchMedia = async () => {
    dispatch({ type: MediaActionTypes.MediaRequest })

    try {
      const results = await fetchData(path, { ...defaultParams, ...params })

      dispatch({
        payload: { data: results },
        type: MediaActionTypes.MediaSuccess,
      })
    } catch (error) {
      console.error('Error::', error)

      dispatch({
        payload: { error },
        type: MediaActionTypes.MediaError,
      })
    }
  }

  useEffect(() => {
    if (isFirstRender) {
      setCurrentCategory(category)

      dispatch({
        payload: { data: fallbackData },
        type: MediaActionTypes.MediaSuccess,
      })
    }
  }, [category, dispatch, fallbackData, isFirstRender])

  useEffect(() => {
    if (currentCategory !== category || !!query) {
      fetchMedia()
      setCurrentCategory(category)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, currentCategory, query])

  return {
    data: state.data,
    error: state.error,
    isLoading: state.isLoading,
  }
}
