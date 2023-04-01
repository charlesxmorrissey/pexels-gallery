import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

import LinkIcon from 'assets/icons/link.svg'
import PlayIcon from 'assets/icons/play.svg'
import { CardProps } from 'components/Molecules/Card'
import styles from 'components/Molecules/Card/Card.module.css'
import { Photo, Video } from 'types'

interface Props extends CardProps {
  data: Video | Photo
}

export const VideoCard = ({
  data,
  onClickOpenModal,
  priority = false,
}: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)

  const {
    id,
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
          priority={priority} // Prioritize the image for loading (e.g. through preload tags or priority hints), leading to a meaningful boost in LCP.
          sizes='(min-width: 768px) 33vw, 100vw' // The sizes property serves important purposes related to image performance: The value of sizes is used by the browser to determine which size of the image to download, from next/image's automatically-generated source set. When the browser chooses, it does not yet know the size of the image on the page, so it selects an image that is the same size or larger than the viewport. The sizes property allows you to tell the browser that the image will actually be smaller than full screen.
          src={image}
        />

        <PlayIcon aria-hidden='true' className={styles.cardPlayIcon} />

        <button
          aria-label='Open detail'
          className={styles.cardBtn}
          onClick={() => onClickOpenModal(id)}
          type='button'
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
            <LinkIcon className={styles.cardLinkIcon} />
          </a>
        )}
      </div>
    </div>
  )
}
