import React, { createContext, useReducer } from 'react'

import { mediaReducer } from 'reducer'
import { MediaActions, MediaContextType, MediaState } from 'types'

const initialState = {
  data: {},
  error: null,
  isLoading: false,
}

export const MediaContext = createContext<MediaContextType>({
  dispatch: () => null,
  state: initialState,
})

interface Props {
  children: React.ReactNode
}

const rootReducer = (state: MediaState, action: MediaActions) =>
  mediaReducer(state, action)

export const MediaProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  return (
    <MediaContext.Provider value={{ dispatch, state }}>
      {children}
    </MediaContext.Provider>
  )
}
