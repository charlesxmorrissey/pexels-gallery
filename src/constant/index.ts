export const ApiBaseUrl = 'https://api.pexels.com/v1/'

export enum Category {
  photos = 'photos',
  videos = 'videos',
}

export const MediaPerPage = 10

export enum ResourcePath {
  curated = 'curated',
  popular = 'videos/popular',
  search = 'search',
  searchVideos = 'videos/search',
}
