import styles from './PageLayout.module.css'

interface Props {
  children: React.ReactNode
}

const PageLayout = ({ children }: Props) => (
  <main className={styles.pageWrapper}>
    <div className={styles.pageContainer}>
      <div className={styles.pageContent}>{children}</div>
    </div>

    <footer className={styles.pageFooter}>
      <div className={styles.pageFooterContainer}>
        <strong>Charles X. Morrissey</strong> @{new Date().getFullYear()}
      </div>
    </footer>
  </main>
)

export default PageLayout
