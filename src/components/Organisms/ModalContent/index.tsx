import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

import CloseIcon from 'assets/icons/close.svg'
import { CategoryType } from 'types'
import { isPhotos } from 'utils'

import styles from './ModalContent.module.css'

interface Props {
  category: CategoryType
  data?: any
  onDismiss: () => void
}

export const ModalContent = ({ category, data, onDismiss }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)

  return (
    <div className={styles.modalContent}>
      <header className={styles.modalContentHeader}>
        <button
          aria-label='Close detail'
          className={styles.modalContentCloseBtn}
          onClick={onDismiss}
          type='button'
        >
          <CloseIcon className={styles.modalContentCloseIcon} />
        </button>

        <h4 className={styles.modalContentHeaderTitle}>
          {isPhotos(category) ? data?.photographer : data?.user?.name}
        </h4>
      </header>

      <div className={styles.modalContentWrapper}>
        {isPhotos(category) && (
          <Image
            alt={data?.alt}
            className={classNames(styles.modalContentImage, {
              [styles.modalContentImageLoaded]: isImageLoaded,
            })}
            fill
            onLoadingComplete={() => setIsImageLoaded(true)}
            priority
            sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
            src={data?.src.large}
            style={{ backgroundColor: `${data?.avg_color}3F` }}
          />
        )}

        {!isPhotos(category) && (
          <video
            className={styles.modalContentVideo}
            controls
            height={data?.video_files[2].height}
            poster={data?.image}
            src={data?.video_files[2].link}
            style={{
              aspectRatio: `${data?.video_files[2].width}/${data?.video_files[2].height}`,
            }}
            width={data?.video_files[2].width}
          />
        )}
      </div>
    </div>
  )
}
