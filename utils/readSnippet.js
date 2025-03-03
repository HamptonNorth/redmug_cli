//
// Read a snippet of markdown or other text from sample pages
// Use with writePages funtion rather tha concatenate strings
//

const fs = require('fs').promises // Use promises version of fs

export async function readSnippet(snippet_file) {
  try {
    const fileContent = await fs.readFile(snippet_file, 'utf8')
    return fileContent
  } catch (error) {
    console.error(`Error reading snippet file ${snippet_file}: ${error.message}`)
    throw 'Error reading snippet file'
  }
}
