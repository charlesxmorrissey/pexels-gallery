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
          height={513} // Specify height `width` to elimated CLS.
          onLoadingComplete={() => setIsImageLoaded(true)}
          priority={priority} // Prioritize the image for loading (e.g. through preload tags or priority hints), leading to a meaningful boost in LCP.
          sizes='(min-width: 768px) 33vw, 100vw' // The sizes property serves important purposes related to image performance: The value of sizes is used by the browser to determine which size of the image to download, from next/image's automatically-generated source set. When the browser chooses, it does not yet know the size of the image on the page, so it selects an image that is the same size or larger than the viewport. The sizes property allows you to tell the browser that the image will actually be smaller than full screen.
          src={src.portrait}
          style={{ backgroundColor: `${avg_color}` }} // Provide a colored placeholder until the image is downloaded and displayed. This improves LCP and CLS.
          width={342} // Specify image `width` to elimated CLS.
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
