// builds _includes/partials files

// navigation
// footer
// pagination
//
//  Nunjacks and Liquid template engines
//

import fs from 'fs'
import path from 'path'

import { readSnippet } from './readSnippet'
import { writePage } from './writeSamplePage'

export async function buildPartialsPages(rootPath, templateEngine) {
  // navigation
  let content = readSnippet(
    path.join((process.cwd(), 'source_pages', 'partials', templateEngine, 'navigation.' + templateEngine))
  )
  await writePage('partials', content, rootPath, '_navigation.' + templateEngine)

  //   footer.
  content = readSnippet(
    path.join((process.cwd(), 'source_pages', 'partials', templateEngine, 'footer.' + templateEngine))
  )
  await writePage('partials', content, rootPath, '_footer.' + templateEngine)

  //   pagination
  content = readSnippet(
    path.join((process.cwd(), 'source_pages', 'partials', templateEngine, 'pagination.' + templateEngine))
  )
  await writePage('partials', content, rootPath, '_pagination.' + templateEngine)
}
