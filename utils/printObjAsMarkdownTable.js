// Accepts a JSON object and returns a formatted markdown table
//
// example obj - {"install":true,"TemplateEngine":"njk","Plugins":["img","rss"],"CSS":"tw","tw_typography":true}
//

export async function printObjectAsMarkdownTable(obj) {
  if (typeof obj !== 'object' || obj === null) {
    console.error('Input must be a valid object.')
    return
  }

  let markdownTable = '| Key | Value |\n'
  markdownTable += '|-----|-------|\n'

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = JSON.stringify(obj[key]) // Use JSON.stringify for proper handling of booleans, arrays, etc.
      markdownTable += `| ${key} | ${value} |\n`
    }
  }

  return markdownTable
}
