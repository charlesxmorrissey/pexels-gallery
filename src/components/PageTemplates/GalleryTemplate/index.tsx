import classNames from 'classnames'
import { useRouter } from 'next/router'

import Gallery from 'components/Organisms/Gallery'
import { Category } from 'constant'
import { useMedia } from 'hooks'
import { Photos, Videos } from 'types'

import styles from './GalleryTemplate.module.css'

interface Props {
  fallbackData: Photos | Videos
}

export const GalleryTemplate = ({ fallbackData }: Props) => {
  const { isLoading, mediaData } = useMedia(fallbackData)
  const router = useRouter()

  const { query: { category = Category.photos, query } = {} } = router

  const renderGalleryOrError = () => {
    if (!mediaData.status) {
      return (
        <Gallery
          category={category}
          media={mediaData[category.toString()]}
          searchTerm={query?.toString()}
        />
      )
    }

    return (
      <h2 className={styles.galleryErrorMessage}>
        <div className={styles.galleryErrorEmoji}>¯\_(ツ)_/¯</div>
        {mediaData.status}: {mediaData.code}
      </h2>
    )
  }

  return (
    <div className={styles.gallery}>
      <div
        className={classNames({
          [styles.galleryListShim]: isLoading,
        })}
      >
        {!isLoading && renderGalleryOrError()}
      </div>
    </div>
  )
}
