import { Dispatch } from 'react'

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { payload?: M[Key]; type: Key }
}

interface MediaPayload {
  [MediaActionTypes.MediaError]: MediaState
  [MediaActionTypes.MediaRequest]: MediaState
  [MediaActionTypes.MediaSuccess]: MediaState
}

export enum Category {
  photos = 'photos',
  videos = 'videos',
}

export type CategoryType = Category | string | string[]

export enum MediaActionTypes {
  MediaError = 'MEDIA_ERROR',
  MediaRequest = 'MEDIA_REQUEST',
  MediaSuccess = 'MEDIA_SUCCESS',
}

export type MediaActions =
  ActionMap<MediaPayload>[keyof ActionMap<MediaPayload>]

export interface MediaContextType {
  dispatch: Dispatch<MediaActions>
  state: MediaState
}

export type MediaState = {
  data?: MediaType
  error?: string | null | unknown
  isLoading?: boolean
}

interface PaginationObject {
  next_page: string
  page: number
  per_page: number
  prev_page: string
  url?: string
}

export interface Params {
  [key: string]: string | number | undefined
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
  src: PhotoSource
  url: string
  width: number
}

export interface PhotoSource {
  landscape: string
  large: string
  large2x: string
  medium: string
  original: string
  portrait: string
  small: string
  tiny: string
}

export enum ResourcePath {
  curated = 'curated',
  popular = 'videos/popular',
  search = 'search',
  searchVideos = 'videos/search',
}

export interface Video {
  duration: number
  full_res: string | null
  height: number
  id: number
  image: string
  url: string
  user: VideoUser
  video_files: VideoFile[]
  video_pictures: VideoPicture[]
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

export interface VideoUser {
  id: number
  name: string
  url: string
}

export type Photos = PaginationObject & { [key: string]: Photo[] }
export type Videos = PaginationObject & { [key: string]: Video[] }
export type MediaType = Photos | Videos | { [key: string]: Photo[] & Video[] }
// | object
