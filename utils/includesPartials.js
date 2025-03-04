// builds _includes/partials files

// navigation
// footer
// pagination
//
//  Nunjacks and Liquid template engines
//

import fs from 'fs'
import path from 'path'

import { readSnippet } from './readSnippet.js'
import { writePage } from './writeSamplePage.js'

export async function buildPartialsPages(rootPath, templateEngine) {
  // navigation
  let fileName = path.join(process.cwd(), 'source_pages', 'partials', templateEngine, 'navigation.' + templateEngine)
  let content = await readSnippet(fileName)

  let writePath = path.join('_includes', 'partials', '_navigation')
  await writePage('partials', content, rootPath, writePath, templateEngine)

  //   footer.
  fileName = path.join(process.cwd(), 'source_pages', 'partials', templateEngine, 'footer.' + templateEngine)
  content = await readSnippet(fileName)

  writePath = path.join('_includes', 'partials', '_footer')
  await writePage('partials', content, rootPath, writePath, templateEngine)

  //   pagination
  fileName = path.join(process.cwd(), 'source_pages', 'partials', templateEngine, 'pagination.' + templateEngine)
  content = await readSnippet(fileName)

  writePath = path.join('_includes', 'partials', '_paginate')
  await writePage('partials', content, rootPath, writePath, templateEngine)
}
