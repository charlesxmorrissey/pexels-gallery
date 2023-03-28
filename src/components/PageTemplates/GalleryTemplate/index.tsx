import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import PexelsLogoIcon from 'assets/icons/pexelsLogo.svg'
import CategorySwitcher from 'components/CategorySwitcher'
import Gallery from 'components/Gallery'
import SearchForm from 'components/SearchForm'
import { Category } from 'constant'
import { useMedia } from 'hooks'
import { Photos, Videos } from 'types'

import styles from './GalleryTemplate.module.css'

interface Props {
  fallbackData: Photos | Videos
}

const routerOptions = { scroll: false, shallow: true }

export const GalleryTemplate = ({ fallbackData }: Props) => {
  const { isLoading, mediaData } = useMedia(fallbackData)
  const router = useRouter()

  const { query: { category = Category.photos, query } = {} } = router

  const handleClickCategory = useCallback(
    (category: Category) => {
      if (!isLoading) {
        router.push(category, undefined, routerOptions)
      }
    },
    [isLoading, router]
  )

  const handleSubmitSearch = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const searchTerm = event.currentTarget.query.value

      router.replace(
        searchTerm ? `/${category}/?query=${searchTerm}` : '/',
        undefined,
        routerOptions
      )
    },
    [category, router]
  )

  const renderGalleryOrError = () => {
    if (!mediaData.status) {
      return (
        <Gallery
          category={category}
          media={mediaData[category.toString()]}
          searchTerm={query?.toString()}
        />
      )
    }

    return (
      <h2 className={styles.galleryErrorMessage}>
        <div className={styles.galleryErrorEmoji}>¯\_(ツ)_/¯</div>
        {mediaData.status}: {mediaData.code}
      </h2>
    )
  }

  return (
    <div className={styles.gallery}>
      <header className={styles.galleryHeader}>
        <Link className={styles.galleryRootLink} href='/'>
          <PexelsLogoIcon
            aria-label='Pexels logo'
            className={styles.galleryHeaderIcon}
          />

          <h1 className={styles.galleryTitle}>Pexels</h1>
        </Link>

        <nav className={styles.galleryNav}>
          <SearchForm onSubmitSearch={handleSubmitSearch} />

          <CategorySwitcher
            category={category}
            onClickCategory={handleClickCategory}
          />
        </nav>
      </header>

      <div
        className={classNames({
          [styles.galleryListShim]: isLoading,
        })}
      >
        {!isLoading && renderGalleryOrError()}
      </div>
    </div>
  )
}
