import { useMemo } from 'react'

import { ResourcePath } from 'constant'
import { CategoryType } from 'types'
import { isPhotos } from 'utils'

import styles from './Text.module.css'

interface Props {
  category: CategoryType
  searchTerm: string | undefined
}

export const TextCard = ({ category, searchTerm }: Props) => {
  const subtitle = useMemo((): string | JSX.Element => {
    let subtitle

    if (searchTerm) {
      subtitle = (
        <>
          <span className={styles.textHighlight}>Search term: </span>
          {searchTerm}
        </>
      )
    } else if (isPhotos(category)) {
      subtitle = ResourcePath.curated
    } else {
      subtitle = 'popular'
    }

    return subtitle
  }, [category, searchTerm])

  return (
    <div className={styles.card}>
      <div className={styles.cardWrapper}>
        <h1 className={styles.textHeadline}>{category}</h1>
        <h2 className={styles.textSubtitle}>{subtitle}</h2>

        <p className={styles.textBody}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco.
        </p>

        <p className={styles.textBody}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident.
        </p>
      </div>
    </div>
  )
}
