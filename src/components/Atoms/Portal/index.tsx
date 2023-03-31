import { useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const createWrapperAndAppendToBody = (wrapperId: string): HTMLElement => {
  const wrapperElement = document.createElement('div')

  wrapperElement.setAttribute('id', wrapperId)
  wrapperElement.classList.add('portal')
  document.body.appendChild(wrapperElement)

  return wrapperElement
}

interface Props {
  children: React.ReactNode
  wrapperId?: string
}

export const ReactPortal = ({
  children,
  wrapperId = 'react-portal-wrapper',
}: Props) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null)

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId)
    let created = false

    if (!element) {
      created = true
      element = createWrapperAndAppendToBody(wrapperId)
    }

    setWrapperElement(element)

    return () => {
      if (created && element?.parentNode) {
        element?.parentNode.removeChild(element)
      }
    }
  }, [wrapperId])

  if (wrapperElement === null) {
    return null
  }

  return createPortal(children, wrapperElement)
}
