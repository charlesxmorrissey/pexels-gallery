import React from 'react'

import { MediaContext } from 'components/Providers/MediaProvider'
import { MediaContextType } from 'types'

export const useMediaContext = (): MediaContextType =>
  React.useContext(MediaContext)
