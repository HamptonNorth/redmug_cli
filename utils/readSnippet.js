//
// Read a snippet of markdown or other text from sample pages
// Use with writePages funtion rather tha concatenate strings
//

import { readFile } from 'fs/promises'

export async function readSnippet(snippetFile) {
  try {
    const fileContent = await readFile(snippetFile, 'utf8')
    return fileContent
  } catch (error) {
    console.error(`Error reading snippet file ${snippetFile}: ${error.message}`)
    throw new Error('Error reading snippet file') // Throw a proper Error object
  }
}
