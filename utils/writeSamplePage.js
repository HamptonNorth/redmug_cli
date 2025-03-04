//
// writes individual pages
// read using readsnippet function
// write resulting file
//

import fs from 'fs'
import path from 'path'

export async function writePage(type, content, rootPath, name, extension) {
  let fullPath = ''

  let file = name + '.' + extension
  fullPath = path.join(rootPath, 'src', file)
  // console.log('🚀 ~ index4.js:280 ~ writePage ~ fullPath:', fullPath)
  try {
    fs.writeFileSync(fullPath, content, { encoding: 'utf8' }) // Specify UTF-8 encoding
    if (type === 'layouts' || type === 'partials') {
      console.log('File written type = ', type, ' fullPath = ', fullPath)
    }
  } catch (err) {
    console.error('Error writing file of type = ' + type + ' and file name= ' + fullPath + ' \n', err)
  }
}
