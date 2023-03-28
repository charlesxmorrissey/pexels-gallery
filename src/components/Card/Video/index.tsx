import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

import LinkIcon from 'assets/icons/link.svg'
import styles from 'components/Card/Card.module.css'
import { Photo, Video } from 'types'

interface Props {
  data: Video | Photo
  priority?: boolean
}

export const VideoCard = ({ data, priority = false }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)

  const {
    image,
    user: { name, url },
  } = data as Video

  return (
    <div className={styles.card}>
      <div
        className={classNames(
          styles.cardImageWrapper,
          styles.cardImageWrapperFill
        )}
      >
        <Image
          alt=''
          className={classNames(styles.cardImage, styles.cardImageFill, {
            [styles.cardImageLoaded]: isImageLoaded,
          })}
          fill
          onLoadingComplete={() => setIsImageLoaded(true)}
          placeholder='empty'
          priority={priority}
          sizes='(min-width: 768px) 33vw, 100vw'
          src={image}
        />
      </div>

      <div className={styles.cardMeta}>
        {name && <p className={styles.cardMetaName}>{name}</p>}

        {url && (
          <a
            aria-label={`Visit photographer's url`}
            className={styles.cardLink}
            href={url}
            rel='noreferrer'
            target='_blank'
          >
            <LinkIcon className={styles.cardIcon} />
          </a>
        )}
      </div>
    </div>
  )
}
