import { PhotoCard } from './Photo'
import { VideoCard } from './Video'

export interface CardProps {
  onClickOpenModal: (id: number) => void
  priority?: boolean
}

export { PhotoCard, VideoCard }
