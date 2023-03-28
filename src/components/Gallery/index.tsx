import Link from 'next/link'

import { PhotoCard, VideoCard } from 'components/Card'
import { Category } from 'constant'
import { Photo, Video } from 'types'

import styles from './Gallery.module.css'

interface Props {
  category: Category | string | string[]
  media: Photo[] & Video[]
  searchTerm: string | undefined
}

const Gallery = ({ category, media, searchTerm }: Props) => {
  const isPhotos = category === Category.photos
  const Card = isPhotos ? PhotoCard : VideoCard

  return (
    <div className={styles.gallery}>
      {!!media.length ? (
        <div className={styles.galleryWrapper}>
          {media.map((asset, index) => (
            <Card data={asset} key={asset.id} priority={!!(index <= 4)} />
          ))}
        </div>
      ) : (
        <>
          <h2 className={styles.galleryNoResults}>
            We couldn&apos;t find anything for{' '}
            <span className={styles.gallerySearchTerm}>{searchTerm}</span>.
            <span className={styles.galleryTryAgain}>
              Try to refine your search.
            </span>
          </h2>

          <Link href='/'>Go to the main page</Link>
        </>
      )}
    </div>
  )
}

export default Gallery
