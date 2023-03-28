import Link from 'next/link'

import { Photo } from 'types'

import styles from './GalleryList.module.css'
import GalleryListItem from './GalleryListItem'

interface Props {
  photos: Photo[]
  searchTerm: string | undefined
}

const GalleryList = ({ photos, searchTerm }: Props) => (
  <div className={styles.galleryList}>
    {!!photos.length ? (
      <div className={styles.galleryListWrapper}>
        {photos.map((photo, index) => (
          <GalleryListItem
            key={photo.id}
            photoData={photo}
            priority={!!(index <= 4)}
          />
        ))}
      </div>
    ) : (
      <>
        <h2 className={styles.galleryListNoResults}>
          We couldn&apos;t find anything for{' '}
          <span className={styles.galleryListSearchTerm}>{searchTerm}</span>.
          <span className={styles.galleryListTryAgain}>
            Try to refine your search.
          </span>
        </h2>

        <Link href='/'>Go to the main page</Link>
      </>
    )}
  </div>
)

export default GalleryList
