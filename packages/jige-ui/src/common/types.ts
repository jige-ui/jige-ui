export type Fn = () => void
export type AnyFn = (...args: any[]) => any
export type MaybePromise<T = void> = T | Promise<T>
export type CloseableStatus = 'closed' | 'closing' | 'opened' | 'opening'
export function isUndefined(v: any): v is undefined {
  return v === undefined
}
export function undefinedOr<T, U>(v: T | undefined, or: U): T | U {
  return isUndefined(v) ? or : v
}
export function isDef<T>(v: T | undefined): v is T {
  return !isUndefined(v)
}
