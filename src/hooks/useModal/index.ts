import { useCallback, useEffect, useState } from 'react'

import { useScrollLock } from 'hooks'

export const useModal = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [allowScroll, lockScroll] = useScrollLock()

  const showModal = useCallback(() => {
    setIsVisible(true)
    lockScroll()
  }, [lockScroll])

  const hideModal = useCallback(() => {
    setIsVisible(false)
    allowScroll()
  }, [allowScroll])

  useEffect(() => {
    if (isVisible) {
      showModal()
    } else {
      hideModal()
    }

    return () => hideModal()
  }, [hideModal, isVisible, showModal])

  return { hideModal, isVisible, showModal }
}
