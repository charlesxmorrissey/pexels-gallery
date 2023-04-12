import classNames from 'classnames'
import { useRouter } from 'next/router'

import Gallery from 'components/Organisms/Gallery'
import { useFetch } from 'hooks'
import { Category, MediaType, Photo, Video } from 'types'

import styles from './GalleryTemplate.module.css'

interface Props {
  fallbackData: MediaType
}

export const GalleryTemplate = ({ fallbackData }: Props) => {
  const { data, isLoading } = useFetch({ fallbackData })
  const router = useRouter()

  const { query: { category = Category.photos, query } = {} } = router

  // const renderGalleryOrError = () => {
  //   if (!data?.status) {
  //   return (
  //     <Gallery
  //       category={category}
  //       media={data?.[category.toString()]}
  //       searchTerm={query?.toString()}
  //     />
  //   )
  //   }

  //   return (
  //     <h2 className={styles.galleryErrorMessage}>
  //       <div className={styles.galleryErrorEmoji}>¯\_(ツ)_/¯</div>
  //       {data?.status}: {data?.code}
  //     </h2>
  //   )
  // }

  return (
    <div className={styles.gallery}>
      <div
        className={classNames({
          [styles.galleryListShim]: isLoading,
        })}
      >
        {!isLoading && data && data?.[category.toString()] && (
          <Gallery
            category={category}
            media={data[category.toString()] as (Photo & Video)[]}
            searchTerm={query?.toString()}
          />
        )}
      </div>
    </div>
  )
}
