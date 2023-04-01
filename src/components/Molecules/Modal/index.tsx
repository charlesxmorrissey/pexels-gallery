import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import { TransitionDuration } from 'constant'

import styles from './Modal.module.css'

const Portal = dynamic(
  () => import('components/Atoms/Portal').then((module) => module.ReactPortal),
  {
    ssr: false,
  }
)

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
  const modalRef = useRef<HTMLDivElement>(null)

  /**
   * Trap the focus in the modal: since the modal is an inert component, the keyboard navigation should be trapped inside of it once it’s open.
   */
  const handleTabKey = useCallback((e: KeyboardEvent) => {
    const focusableModalElements =
      modalRef &&
      modalRef.current &&
      modalRef.current.querySelectorAll('button')

    const firstElement = focusableModalElements?.[0]
    const lastElement =
      focusableModalElements?.[focusableModalElements.length - 1]

    if (!e.shiftKey && document.activeElement !== firstElement) {
      firstElement?.focus()

      return e.preventDefault()
    }

    if (e.shiftKey && document.activeElement !== lastElement) {
      lastElement?.focus()

      return e.preventDefault()
    }
  }, [])

  const keyListenersMap = useMemo(
    () =>
      new Map([
        ['Escape', toggleVisibility],
        ['Tab', handleTabKey],
      ]),
    [handleTabKey, toggleVisibility]
  )

  useEffect(() => {
    if (isVisible) {
      /**
       * We should be able to open & close the modal just using the keyboard.
       */
      const keyListener = (e: KeyboardEvent) => {
        const listener = keyListenersMap.get(e.key)

        return listener && listener(e)
      }

      document.addEventListener('keydown', keyListener)

      return () => document.removeEventListener('keydown', keyListener)
    }
  }, [isVisible, keyListenersMap])

  return (
    <Portal>
      <CSSTransition
        classNames={{ ...styles }}
        in={isVisible}
        mountOnEnter
        nodeRef={modalRef}
        timeout={{ enter: TransitionDuration, exit: TransitionDuration }}
        unmountOnExit
      >
        <div ref={modalRef}>
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
