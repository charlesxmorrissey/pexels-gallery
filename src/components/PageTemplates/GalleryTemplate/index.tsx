import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useCallback, useMemo } from 'react'

import PexelsLogoIcon from 'assets/icons/pexelsLogo.svg'
import GalleryList from 'components/GalleryList'
import Pagination from 'components/Pagination'
import SearchForm from 'components/SearchForm'
import { photosPerPage } from 'constant'
import { usePhotos } from 'hooks'
import { Photos } from 'types'

import styles from './GalleryTemplate.module.css'

interface Props {
  fallbackData: Photos
}

const MemoizedPagination = memo(Pagination)
const routerOptions = { scroll: false, shallow: true }

export const GalleryTemplate = ({ fallbackData }: Props) => {
  const router = useRouter()
  const { isLoading, nextPageNum, photoData, prevPageNum } =
    usePhotos(fallbackData)

  const { query: { page, query } = {} } = router
  const pageTotal = useMemo(
    () => Math.ceil(photoData?.total_results / photosPerPage),
    [photoData?.total_results]
  )

  const handleClickNavigate = useCallback(
    (pageNum: number | undefined) => {
      if (!isLoading && !!pageNum) {
        router.push(
          query ? `${pageNum}?query=${query}` : `${pageNum}`,
          undefined,
          routerOptions
        )
      }
    },
    [isLoading, router, query]
  )

  const handleSubmitSearch = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const searchTerm = event.currentTarget.query.value

      router.replace(
        searchTerm ? `/?query=${searchTerm}` : '/',
        undefined,
        routerOptions
      )
    },
    [router]
  )

  const renderGalleryOrError = () => {
    if (!photoData.status) {
      return (
        <GalleryList
          photos={photoData?.photos}
          searchTerm={query?.toString()}
        />
      )
    }

    return (
      <h2 className={styles.galleryErrorMessage}>
        <div className={styles.galleryErrorEmoji}>¯\_(ツ)_/¯</div>
        {photoData.status}: {photoData.code}
      </h2>
    )
  }

  return (
    <div className={styles.gallery}>
      <header className={styles.galleryHeader}>
        <Link href='/'>
          <PexelsLogoIcon
            aria-label='Logo'
            className={styles.galleryHeaderIcon}
          />
        </Link>

        <h1 className={styles.galleryTitle}>Pexel gallery</h1>

        <nav className={styles.galleryNav}>
          <SearchForm onSubmitSearch={handleSubmitSearch} />

          <MemoizedPagination
            currPage={page?.toString() ?? '1'}
            nextPageNum={nextPageNum}
            onClickNavigate={handleClickNavigate}
            pageTotal={pageTotal}
            prevPageNum={prevPageNum}
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
