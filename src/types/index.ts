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

export interface VideoFile {
  file_type: string
  fps: number
  height: number
  id: number
  link: string
  quality: string
  width: number
}

export interface VideoPicture {
  id: number
  nr: number
  picture: string
}

export interface Video {
  duration: number
  full_res: string | null
  height: number
  id: number
  image: string
  url: string
  user: {
    id: number
    name: string
    url: string
  }
  video_files: VideoFile[]
  video_pictures: VideoPicture[]
  width: number
}

export type Photos = PaginationObject & { photos: Photo[] }
export type Videos = PaginationObject & { videos: Video[] }
