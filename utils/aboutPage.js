//  Builds the about page /src/about.md
//

import path from 'path'

import { printObjectAsMarkdownTable } from './printObjAsMarkdownTable.js'
import { readSnippet } from './readSnippet.js'
import { writePage } from './writeSamplePage.js'

export async function buildAboutPage(rootPath, recipe) {
  const sourceSnippet = path.join(process.cwd(), 'source_pages', 'about', 'about.md')
  let t = await readSnippet(sourceSnippet)

  let recipeTable = await printObjectAsMarkdownTable(recipe)

  await writePage('about', t + recipeTable, rootPath, 'about', 'md')
}
