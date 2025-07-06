/* eslint-disable antfu/top-level-function */
export const isClient = typeof window !== 'undefined' && typeof document !== 'undefined'
export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'
export const notNullish = <T = any>(val?: T | null | undefined): val is T => val != null
export const assert = (condition: boolean, ...infos: any[]) => {
  if (!condition) console.warn(...infos)
}
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
const toString = Object.prototype.toString
export const isObject = (val: any): val is object => toString.call(val) === '[object Object]'
export const now = () => Date.now()
export const timestamp = () => +Date.now()
export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))
export const noop = () => {}
export const hasOwn = <T extends object, K extends keyof T>(val: T, key: K): key is K =>
  Object.hasOwn(val, key)
export const isFunction = (val: any): val is Function => typeof val === 'function'
export const isArray = <T = any>(val: any): val is T[] => Array.isArray(val)
export const isNumber = (val: any): val is number =>
  typeof val === 'number' && !Number.isNaN(val) && Number.isFinite(val)
