function setData(dataSets: { [key: string]: string | boolean | number }): { [key: string]: string }
function setData(name: string, data: string | boolean | number): { [key: string]: string }
function setData(name: string | { [key: string]: string | boolean | number }, data?: string | boolean | number) {
  const attrName = `data-${name}`
  if (typeof name === 'object') {
    return Object.entries(name).reduce((acc, [name, data]) => {
      const attrName = `data-${name}`
      if (typeof data === 'boolean') {
        return data ? { ...acc, [attrName]: '' } : acc
      }
      return { ...acc, [attrName]: data }
    }, {})
  }

  if (typeof data === 'boolean') {
    return data ? { [attrName]: '' } : {}
  }
  return { [attrName]: data }
}

export { setData }
