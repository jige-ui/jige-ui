import { isClient } from './is'

const alreadyInjected: string[] = []

export async function injectStyle(styleHref: string) {
  if (!isClient) return
  if (alreadyInjected.includes(styleHref)) return

  alreadyInjected.push(styleHref)
  const linkElement = document.createElement('link')
  linkElement.rel = 'stylesheet'
  linkElement.href = styleHref
  document.head.appendChild(linkElement)

  return new Promise<void>((resolve, reject) => {
    linkElement.onload = () => {
      resolve()
    }
    linkElement.onerror = () => {
      alreadyInjected.splice(alreadyInjected.indexOf(styleHref), 1)
      reject(new Error(`Failed to load stylesheet: ${styleHref}`))
    }
  })
}

export async function injectScript(scriptSrc: string) {
  if (!isClient) return
  if (alreadyInjected.includes(scriptSrc)) return
  alreadyInjected.push(scriptSrc)
  const scriptElement = document.createElement('script')
  scriptElement.src = scriptSrc
  scriptElement.async = true
  scriptElement.type = 'text/javascript'
  document.head.appendChild(scriptElement)

  return new Promise<void>((resolve, reject) => {
    scriptElement.onload = () => {
      resolve()
    }
    scriptElement.onerror = () => {
      alreadyInjected.splice(alreadyInjected.indexOf(scriptSrc), 1)
      reject(new Error(`Failed to load script: ${scriptSrc}`))
    }
  })
}
