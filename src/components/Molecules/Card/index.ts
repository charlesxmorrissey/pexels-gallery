import { PhotoCard } from './Photo'
import { TextCard } from './Text'
import { VideoCard } from './Video'

export interface CardProps {
  onClickOpenModal: (id: number) => void
  priority?: boolean
}

export { PhotoCard, TextCard, VideoCard }
