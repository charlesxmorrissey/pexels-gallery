import classNames from 'classnames'
import { useCallback, useState } from 'react'

import { Category } from 'constant'

import styles from './CategorySwitcher.module.css'

interface Props {
  category: Category | string | string[]
  onClickCategory: (cat: Category) => void
}

const CategorySwitcher = ({ category, onClickCategory }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<
    Category | string | string[]
  >(category)

  const handleClickCategory = useCallback(
    (category: Category) => {
      onClickCategory(category)
      setSelectedCategory(category)
    },
    [onClickCategory]
  )

  return (
    <div className={styles.categorySwitcher}>
      <button
        className={classNames(styles.categoryBtn, {
          [styles.categoryBtnActive]: selectedCategory === Category.photos,
        })}
        onClick={() => handleClickCategory(Category.photos)}
        type='button'
      >
        {Category.photos}
      </button>

      <button
        className={classNames(styles.categoryBtn, {
          [styles.categoryBtnActive]: selectedCategory === Category.videos,
        })}
        onClick={() => handleClickCategory(Category.videos)}
        type='button'
      >
        {Category.videos}
      </button>
    </div>
  )
}

export default CategorySwitcher
