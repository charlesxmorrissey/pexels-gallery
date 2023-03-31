import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import PexelsLogoIcon from 'assets/icons/pexelsLogo.svg'
import { CategorySwitcher } from 'components/Atoms/CategorySwitcher'
import { SearchForm } from 'components/Atoms/SearchForm'
import { Category } from 'constant'

import styles from './Header.module.css'

const routerOptions = { scroll: false, shallow: true }

export const Header = () => {
  const router = useRouter()

  const { query: { category = Category.photos } = {} } = router

  const handleClickCategory = useCallback(
    (category: Category) => router.push(category, undefined, routerOptions),
    [router]
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

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Link className={styles.headerLink} href='/'>
          <PexelsLogoIcon
            aria-label='Pexels logo'
            className={styles.headerIcon}
          />

          <h1 className={styles.headerTitle}>Pexels</h1>
        </Link>

        <nav className={styles.headerNav}>
          <SearchForm onSubmitSearch={handleSubmitSearch} />

          <CategorySwitcher
            category={category}
            onClickCategory={handleClickCategory}
          />
        </nav>
      </div>
    </header>
  )
}
