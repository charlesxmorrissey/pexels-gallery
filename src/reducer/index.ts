import { MediaActionTypes, MediaActions, MediaState } from 'types'

export const mediaReducer = (state: MediaState, action: MediaActions) => {
  const { payload, type } = action

  switch (type) {
    case MediaActionTypes.MediaRequest:
      return {
        isLoading: true,
      }

    case MediaActionTypes.MediaSuccess:
      return {
        ...state,
        data: payload?.data,
        error: null,
        isLoading: false,
      }

    case MediaActionTypes.MediaError:
      return {
        error: payload?.error,
        isLoading: false,
      }

    default:
      return state
  }
}
