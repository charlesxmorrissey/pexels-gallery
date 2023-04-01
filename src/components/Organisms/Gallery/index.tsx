import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect, useState } from 'react'

import { PhotoCard, TextCard, VideoCard } from 'components/Molecules/Card'
import { Modal } from 'components/Molecules/Modal'
import { ModalContent } from 'components/Organisms/ModalContent'
import { useModal } from 'hooks'
import { CategoryType, Photo, Video } from 'types'
import { isPhotos } from 'utils'

import styles from './Gallery.module.css'

interface Props {
  category: CategoryType
  media: Photo[] & Video[]
  searchTerm: string | undefined
}

const MemoizedModal = memo(Modal)
const MemoizedPhotoCard = memo(PhotoCard)
const MemoizedVideoCard = memo(VideoCard)

const Gallery = ({ category, media, searchTerm }: Props) => {
  const { hideModal, isVisible, showModal } = useModal()
  const [modalData, setModalData] = useState<any>()
  const { events } = useRouter()

  const Card = isPhotos(category) ? MemoizedPhotoCard : MemoizedVideoCard

  const getModalData = useCallback(
    (id: number) => media.find((item) => id === item.id),
    [media]
  )

  const handleClickOpenModal = useCallback(
    (id: number) => {
      const detail = getModalData(id)

      setModalData(detail)
      showModal()
    },
    [getModalData, showModal]
  )

  // If the modal is open, close it when changing routes.
  useEffect(() => {
    if (isVisible) {
      events.on('routeChangeStart', hideModal)

      return () => events.off('routeChangeStart', hideModal)
    }
  }, [events, hideModal, isVisible])

  return (
    <div className={styles.gallery}>
      {!!media.length ? (
        <div className={styles.galleryWrapper}>
          <div className={styles.galleryTextCard}>
            <TextCard category={category} searchTerm={searchTerm} />
          </div>

          {media.map((asset, index) => (
            <Card
              data={asset}
              key={asset.id}
              onClickOpenModal={handleClickOpenModal}
              priority={!!(index <= 4)}
            />
          ))}
        </div>
      ) : (
        <>
          <h2 className={styles.galleryNoResults}>
            We couldn&apos;t find anything for{' '}
            <span className={styles.gallerySearchTerm}>{searchTerm}</span>
            <span className={styles.galleryTryAgain}>
              Try to refine your search.
            </span>
          </h2>

          <Link href='/'>Go to the main page</Link>
        </>
      )}

      <MemoizedModal
        className={styles.galleryModal}
        isVisible={isVisible}
        modalContent={
          <ModalContent
            category={category}
            data={modalData}
            onDismiss={hideModal}
          />
        }
        toggleVisibility={hideModal}
      />
    </div>
  )
}

export default Gallery
