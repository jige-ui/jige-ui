export async function runIgnoreError<T>(fn: () => T) {
  try {
    await fn()
  } catch (e) {
    console.error(e)
  }
}
