import { Header } from 'components/Molecules/Header'

import styles from './PageLayout.module.css'

interface Props {
  children: React.ReactNode
}

export const PageLayout = ({ children }: Props) => (
  <main className={styles.pageWrapper} role='main'>
    <Header />

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
