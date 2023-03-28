import classNames from 'classnames'

import ArrowIcon from 'assets/icons/arrow.svg'

import styles from './Pagination.module.css'

interface Props {
  currPage: string
  nextPageNum: number | undefined
  onClickNavigate: (num: number | undefined) => void
  pageTotal: number
  prevPageNum: number | undefined
}

const Pagination = ({
  currPage,
  nextPageNum,
  onClickNavigate,
  pageTotal,
  prevPageNum,
}: Props) => (
  <div className={styles.pagination}>
    {!!pageTotal && (
      <div className={styles.paginationInfo}>{`${currPage}/${pageTotal}`}</div>
    )}

    <button
      aria-label='Previous page'
      className={styles.paginationBtn}
      disabled={!prevPageNum}
      onClick={() => onClickNavigate(prevPageNum)}
      type='button'
    >
      <ArrowIcon
        className={classNames(styles.paginationIcon, styles.paginationIconFlip)}
      />
    </button>

    <button
      aria-label='Next page'
      className={styles.paginationBtn}
      disabled={!nextPageNum}
      onClick={() => onClickNavigate(nextPageNum)}
      type='button'
    >
      <ArrowIcon className={styles.paginationIcon} />
    </button>
  </div>
)

export default Pagination
