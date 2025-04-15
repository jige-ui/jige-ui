import { flattenObject } from '~/common/flatObject'

// calculate colspan by counting the same prefix near the current key
function countStartInArray(array: string[], value: string, fromIndex: number) {
  let count = 0
  for (let i = fromIndex; i < array.length; i++) {
    if (array[i].startsWith(`${value}.`)) {
      count++
    } else {
      break
    }
  }
  return count
}

export interface HeaderType {
  colSpan: number
  rowSpan: number
  key: string
}

export function generateHeaders(obj: { [key: string]: any }): HeaderType[][] {
  const data = flattenObject(obj)
  const headers: {
    rowSpan: number
    colSpan: number
    key: string
  }[][] = []
  if (data.length === 0) return headers

  let rows = 0
  const keys = Object.keys(data)

  // 遍历第一遍keys，获取行数
  for (const key in data) {
    const keys = key.split('.')
    rows = Math.max(rows, keys.length)
  }

  // range secend time to generate headers
  for (let i = 0; i < rows; i++) {
    headers.push([])
    let current = ''
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j]
      const keySplit = key.split('.')
      if (keySplit.length > i) {
        if (keySplit[i] === current) {
          continue
        }
        const tmp: HeaderType = {
          colSpan: countStartInArray(keys, [...keySplit].slice(0, i + 1).join('.'), j) || 1,
          rowSpan: keySplit.length === i + 1 ? rows - i : 1,
          key: keySplit.slice(0, i + 1).join('.'),
        }
        headers[i].push(tmp)
        current = keySplit[i]
      }
    }
  }

  return headers
}
