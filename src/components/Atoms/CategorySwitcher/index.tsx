import classNames from 'classnames'

import PhotoIcon from 'assets/icons/photo.svg'
import VideoIcon from 'assets/icons/video.svg'
import { Category } from 'constant'
import { CategoryType } from 'types'
import { isPhotos } from 'utils'

import styles from './CategorySwitcher.module.css'

interface Props {
  category: CategoryType
  onClickCategory: (cat: Category) => void
}

export const CategorySwitcher = ({ category, onClickCategory }: Props) => (
  <div className={styles.categorySwitcher}>
    <button
      className={classNames(styles.categoryBtn, {
        [styles.categoryBtnActive]: isPhotos(category),
      })}
      onClick={() => onClickCategory(Category.photos)}
      type='button'
    >
      <PhotoIcon className={styles.categoryIcon} />
      {Category.photos}
    </button>

    <button
      className={classNames(styles.categoryBtn, {
        [styles.categoryBtnActive]: !isPhotos(category),
      })}
      onClick={() => onClickCategory(Category.videos)}
      type='button'
    >
      <VideoIcon className={styles.categoryIcon} />
      {Category.videos}
    </button>
  </div>
)
