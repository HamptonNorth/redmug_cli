// builds  _layout files
// base.njk and postLayout.njk
//
//
//  TO DO
//

import path from 'path'
import { readSnippet } from './readSnippet.js'
import { writePage } from './writeSamplePage.js'

export async function buildLayoutPages(rootPath, templateEngine, title = 'My site') {
  // base
  let sourceFileName = path.join(
    process.cwd(),
    'source_pages',
    'layouts',
    templateEngine,
    'base_part_1.' + templateEngine
  )
  let content = await readSnippet(sourceFileName)
  content += title
  sourceFileName = path.join(process.cwd(), 'source_pages', 'layouts', templateEngine, 'base_part_2.' + templateEngine)
  content += await readSnippet(sourceFileName)

  let writePath = path.join('_layouts', 'base')
  await writePage('layouts', content, rootPath, writePath, templateEngine)

  // postsLayout
  sourceFileName = path.join(process.cwd(), 'source_pages', 'layouts', templateEngine, 'posts_home.' + templateEngine)
  content = await readSnippet(sourceFileName)

  writePath = path.join('_layouts', 'postLayout')
  await writePage('layouts', content, rootPath, writePath, templateEngine)
}
