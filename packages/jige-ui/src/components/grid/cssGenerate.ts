export function cssGenerate(params: {
  maxCols: number
  breakPoints: {
    sm: number
    md: number
    lg: number
    xl: number
  }
}) {
  let result = ''

  for (let i = 1; i <= params.maxCols; i++) {
    result += `  .grid-cols-${i} {\n`
    result += `    grid-template-columns: repeat(${i}, minmax(0, 1fr));\n`
    result += '  }\n'
    result += `  .col-span-${i} {\n`
    result += `    grid-column: span ${i} / span ${i};\n`
    result += '  }\n'
  }
  for (const [breakPoint, screenWidth] of Object.entries(params.breakPoints)) {
    let css = `@media (min-width: ${screenWidth}px) {\n`
    for (let i = 1; i <= params.maxCols; i++) {
      css += `  .${breakPoint}\\:grid-cols-${i} {\n`
      css += `    grid-template-columns: repeat(${i}, minmax(0, 1fr));\n`
      css += '  }\n'
      css += `  .${breakPoint}\\:col-span-${i} {\n`
      css += `    grid-column: span ${i} / span ${i};\n`
      css += '  }\n'
    }
    css += '}\n'

    result += css
  }

  return result
}
