import Link from 'next/link'
import { useCallback, useState } from 'react'

import { PhotoCard, VideoCard } from 'components/Molecules/Card'
import { Modal } from 'components/Molecules/Modal'
import ModalContent from 'components/Organisms/ModalContent'
import { Category } from 'constant'
import { useModal } from 'hooks'
import { Photo, Video } from 'types'

import styles from './Gallery.module.css'

interface Props {
  category: Category | string | string[]
  media: Photo[] & Video[]
  searchTerm: string | undefined
}

const Gallery = ({ category, media, searchTerm }: Props) => {
  const { hideModal, isVisible, showModal } = useModal()
  const [modalData, setModalData] = useState<any>()

  const isPhotos = category === Category.photos
  const Card = isPhotos ? PhotoCard : VideoCard

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

  return (
    <div className={styles.gallery}>
      {!!media.length ? (
        <div className={styles.galleryWrapper}>
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

      <Modal
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
