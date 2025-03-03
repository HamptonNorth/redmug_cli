//
// writes individual pages
// read using readsnippet function
// write resulting file
//

async function writePage(type, content, rootPath, name, extension) {
  let fullPath = ''

  let file = name + '.' + extension
  fullPath = path.join(rootPath, 'src', file)
  // console.log('🚀 ~ index4.js:280 ~ writePage ~ fullPath:', fullPath)
  try {
    fs.writeFileSync(fullPath, content, { encoding: 'utf8' }) // Specify UTF-8 encoding
    //   console.log('File written successfully!')
  } catch (err) {
    console.error('Error writing file of type: ' + type + ' file name: ' + fullPath + ' \n', err)
  }
}
