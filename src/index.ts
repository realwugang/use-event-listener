import { useRef, useEffect, ReactInstance, Ref } from 'react'
import { findDOMNode } from 'react-dom'

type Options = {
  capture?: boolean
  once?: boolean
  passive?: boolean
}

export default function useEventListener (element: Window | Document | HTMLElement | Ref<HTMLElement | ReactInstance>, eventName: string, handler: (event: Event) => void, options?: boolean | Options) {
  const savedhandler = useRef<any>()

  useEffect(() => {
    savedhandler.current = handler
  }, [handler])

  useEffect(() => {
    const eventListener = (event: Event) => savedhandler.current(event)
    const ele = getTargetElement(element)
    
    if (ele != null) {
      return addEventListener(ele, eventName, eventListener, options)
    }

    return undefined

  }, [savedhandler, eventName, element])
}


export function addEventListener (element: any, eventName: string, handler: (event: Event) => void, options: boolean | Options = false): ()=> void {
  if (element.addEventListener) {
    element.addEventListener(eventName, handler, options)
  } else if (element.attachEvent) {
    element.attachEvent(`on${eventName}`, handler)
  } else {
    element[`on${eventName}`] = handler
  }

  return () => {
    removeEventListener(element, eventName, handler, options)
  }
}

export function removeEventListener (element: any, eventName: string, handler: (event: Event) => void, options: boolean | Options = false) { 
  if (element.removeEventListener) {
    element.removeEventListener(eventName, handler, options)
  } else if (element.attachEvent) {
    element.detachEvent(`on${eventName}`, handler)
  } else {
    element[`on${eventName}`] = null
  }
}


export function getTargetElement (element: Window | Document | HTMLElement | Ref<HTMLElement | ReactInstance>) {
  if (isHtmlControl(element)) {
    return element
  }

  // @ts-ignore
  let ele = element.current

  if (isHtmlControl(ele)) {
    return ele
  }

  ele = findDOMNode(element as ReactInstance)

  if (isHtmlControl(ele)) {
    return ele
  }

  return null
}

function isHtmlControl (obj: any): boolean {
  const div = document.createElement("div");
  try {
    div.appendChild(obj.cloneNode(true));
    return +obj.nodeType === 1
  } catch (e) {
    return obj === window || obj === document;
  }
}