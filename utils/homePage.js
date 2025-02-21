//  Builds the home page /src/index.md
//

import fs from 'fs'
import path from 'path'

export async function buildHomePage(rootPath) {
  let t = `---
  layout: base
  title: Home
  tags: page
---
  
  <img class="" src="/assets/images/logo.png" alt="your logo" width="50" height="50">
  
  {%headers "Home", "Learning 11ty"%}
  
  A site built with 11ty
  `
  await writePage('home', t, rootPath, 'index', 'md')
}

async function writePage(type, content, rootPath, name, extension, number = 0) {
  let fullPath = ''
  if (type === 'home') {
    let file = name + '.' + extension
    fullPath = path.join(rootPath, 'src', file)
    // console.log('🚀 ~ index4.js:280 ~ writePage ~ fullPath:', fullPath)
    try {
      fs.writeFileSync(fullPath, content, { encoding: 'utf8' }) // Specify UTF-8 encoding
      //   console.log('File written successfully!')
    } catch (err) {
      console.error('Error writing file:', err)
    }
  } else if (type === 'blog') {
    let file = name + number + '.' + extension
    fullPath = path.join(rootPath, 'src', file)
  }
  // copy sample log
  const sourcePath = path.join(process.cwd(), 'assets', 'logo.png')
  const destinationPath = path.join(rootPath, 'src', 'assets', 'images', 'logo.png')
  try {
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`logo.png not found: ${sourcePath}`)
    }
    fs.copyFileSync(sourcePath, destinationPath)
  } catch (error) {
    console.error('Error copying logo.png to ', destinationPath, ' from: ', sourcePath)
  }
}
