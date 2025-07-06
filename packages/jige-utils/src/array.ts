/**
 * Generates a list of numbers from `arg1` to `arg2`.
 * If only `arg1` is provided, it generates a list from `0` to `arg1`.
 * If both `arg1` and `arg2` are provided, it generates a list from the smaller to the larger of the two.
 * @param arg1
 * @param arg2
 * @returns An array of numbers in the specified range.
 * @example
 * list(5) // returns [0, 1, 2, 3, 4, 5]
 * list(3, 7) // returns [3, 4, 5, 6, 7]
 * list(10, -2) // returns [-2, -1, 0, 1, 2, ..., 10]
 */
export function list(arg1: number, arg2?: number): number[] {
  if (arg2 === undefined) {
    return Array.from({ length: arg1 + 1 }, (_, i) => i)
  }
  const start = Math.min(arg1, arg2)
  const end = Math.max(arg1, arg2)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
