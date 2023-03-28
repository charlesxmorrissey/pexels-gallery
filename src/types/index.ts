export interface Params {
  [key: string]: string | number | undefined
}

interface PaginationObject {
  next_page: string
  page: number
  per_page: number
  prev_page: string
  url?: string
}

export interface Photo {
  alt: string
  avg_color: string | null
  height: number
  id: number
  liked: boolean
  photographer: string
  photographer_id: number
  photographer_url: string
  src: {
    landscape: string
    large: string
    large2x: string
    medium: string
    original: string
    portrait: string
    small: string
    tiny: string
  }
  url: string
  width: number
}

export type Photos = PaginationObject & { photos: Photo[] }
