// builds  _layout files
// base.njk and postLayout.njk
//
//
//  TO DO
//

import path from 'path'
import { readSnippet } from './readSnippet'
import { writePage } from './writeSamplePage'

export async function buildLayoutPages(rootPath, templateEngine, title = 'My site') {
  // base
  let content = readSnippet(
    path.join((process.cwd(), 'source_pages', 'layouts', templateEngine, 'base_part_1.' + templateEngine))
  )
  content += title
  content += readSnippet(
    path.join((process.cwd(), 'source_pages', 'layouts', templateEngine, 'base_part_1.' + templateEngine))
  )
  await writePage('layouts', content, rootPath, 'base.' + templateEngine)

  // postsLayout
  content = readSnippet(
    path.join((process.cwd(), 'source_pages', 'layouts', templateEngine, 'posts_home.' + templateEngine))
  )
  await writePage('layouts', content, rootPath, 'postLayout.' + templateEngine)
}
