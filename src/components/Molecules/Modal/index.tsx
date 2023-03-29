import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import styles from './Modal.module.css'

const Portal = dynamic(() => import('components/Atoms/Portal'), {
  ssr: false,
})

interface Props {
  className?: string
  isVisible: boolean
  modalContent: React.ReactNode
  toggleVisibility: () => void
}

export const Modal = ({
  className = '',
  isVisible,
  modalContent,
  toggleVisibility,
}: Props) => {
  const nodeRef = useRef(null)

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? toggleVisibility() : null

    document.body.addEventListener('keydown', closeOnEscapeKey)

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [toggleVisibility])

  return (
    <Portal>
      <CSSTransition
        classNames={{ ...styles }}
        in={isVisible}
        mountOnEnter
        nodeRef={nodeRef}
        timeout={{ enter: 300, exit: 300 }}
        unmountOnExit
      >
        <div ref={nodeRef}>
          <div className={styles.modalOverlay} />

          <div aria-modal className={styles.modalContainer} role='dialog'>
            <div
              className={classNames(styles.modalContent, {
                [className]: className,
              })}
            >
              {modalContent}
            </div>
          </div>
        </div>
      </CSSTransition>
    </Portal>
  )
}
