import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

import CloseIcon from 'assets/icons/close.svg'
import { Category } from 'constant'

import styles from './ModalContent.module.css'

interface Props {
  category: Category | string | string[]
  data?: any
  onDismiss: () => void
}

const ModalContent = ({ category, data, onDismiss }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)
  const isPhoto = category === Category.photos

  // console.log('ModalContent::', data)
  // console.log('ModalContent::', category)

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
          {isPhoto ? data?.photographer : data?.user?.name}
        </h4>
      </header>

      <div className={styles.modalContentWrapper}>
        {isPhoto && (
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

        {!isPhoto && <p>Video here</p>}
      </div>
    </div>
  )
}

export default ModalContent
