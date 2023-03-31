import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import SearchIcon from 'assets/icons/search.svg'

import styles from './SearchForm.module.css'

interface Props {
  onSubmitSearch: (event: React.FormEvent<HTMLFormElement>) => void
}

export const SearchForm = ({ onSubmitSearch }: Props) => {
  const { query: { query } = {} } = useRouter()
  const [term, setTerm] = useState<string | undefined>(query?.toString() || '')

  useEffect(() => {
    if (!query) {
      setTerm('')
    }
  }, [query])

  return (
    <form
      autoComplete='off'
      className={styles.searchForm}
      onSubmit={(event) => onSubmitSearch(event)}
      role='search'
    >
      <input
        className={styles.searchInput}
        name='query'
        onChange={(event) => setTerm(event.target.value)}
        placeholder='Search...'
        type='search'
        value={term}
      />

      <button
        aria-label='Search'
        className={styles.searchBtn}
        disabled={!term}
        type='submit'
      >
        <SearchIcon className={styles.searchBtnIcon} />
      </button>
    </form>
  )
}
