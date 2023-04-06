import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

import LinkIcon from 'assets/icons/link.svg'
import { CardProps } from 'components/Molecules/Card'
import styles from 'components/Molecules/Card/Card.module.css'
import { Photo } from 'types'

interface Props extends CardProps {
  data: Photo
}

export const PhotoCard = ({
  data: { alt, avg_color, id, photographer, photographer_url, src },
  onClickOpenModal,
  priority = false,
}: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)

  return (
    <div className={styles.card}>
      <div className={styles.cardImageWrapper}>
        <Image
          alt={alt}
          className={classNames(styles.cardImage, {
            [styles.cardImageLoaded]: isImageLoaded,
          })}
          height={513}
          onLoadingComplete={() => setIsImageLoaded(true)}
          priority={priority}
          sizes='(min-width: 768px) 33vw, 100vw'
          src={src.portrait}
          style={{ backgroundColor: `${avg_color}` }}
          width={342}
        />

        <button
          aria-label='Open detail'
          className={styles.cardBtn}
          onClick={() => onClickOpenModal(id)}
          type='button'
        />
      </div>

      <div className={styles.cardMeta}>
        {photographer && <p className={styles.cardMetaName}>{photographer}</p>}

        {photographer_url && (
          <a
            aria-label={`Visit photographer's url`}
            className={styles.cardLink}
            href={photographer_url}
            rel='noreferrer'
            target='_blank'
          >
            <LinkIcon className={styles.cardLinkIcon} />
          </a>
        )}
      </div>
    </div>
  )
}
