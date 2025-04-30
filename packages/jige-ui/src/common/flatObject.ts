type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never

type FlattenWithDotPath<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends any[]
      ? { [P in Prefix extends '' ? K & string : Join<Prefix, K & string>]: T[K] }
      : FlattenWithDotPath<T[K], Prefix extends '' ? K & string : Join<Prefix, K & string>>
    : { [P in Prefix extends '' ? K & string : Join<Prefix, K & string>]: T[K] }
}[keyof T]

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never

export type FlattenObject<T extends object> = UnionToIntersection<
  FlattenWithDotPath<T>
> extends infer O
  ? O extends Record<string, any>
    ? O
    : never
  : never

export function flattenObject<T extends {}>(obj: T, parent = '', res: { [key: string]: any } = {}) {
  for (const key in obj) {
    // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
    if (obj.hasOwnProperty(key)) {
      const propName = parent ? `${parent}.${key}` : key
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenObject(obj[key], propName, res)
      } else {
        res[propName] = obj[key]
      }
    }
  }
  return res as FlattenObject<T>
}
