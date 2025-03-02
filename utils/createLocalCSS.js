//  Builds a local style.css file.
//
// Load after and any CSS library selected

import fs from 'fs'
import path from 'path'

export async function buildLocalCSS(rootPath, css) {
  if (css === 'tw') {
    // tailwind
    await copyCSS(rootPath, 'tailwind_css')
  } else if (css === 'redmug') {
    // custom redmug.css
    await copyCSS(rootPath, 'redmug_css')
  } else {
    // libraries loaded from cdn
    await copyCSS(rootPath, 'cdn_base_css')
  }
}

async function writePage(content, rootPath) {
  let fullPath = ''

  let file = 'style.css'
  fullPath = path.join(rootPath, 'src', 'assets', 'css', file)

  try {
    fs.writeFileSync(fullPath, content, { encoding: 'utf8' }) // Specify UTF-8 encoding
    //   console.log('File written successfully!')
  } catch (err) {
    console.error('Error writing local CSS file:', err)
  }
}

async function copyCSS(rootPath, css_dir) {
  // copy sample logo
  const sourceDirectory = path.join(process.cwd(), 'assets', css_dir)
  const destinationDirectory = path.join(rootPath, 'src', 'assets', 'css')
  try {
    if (!fs.existsSync(sourceDirectory)) {
      throw new Error(`CSS source directory not found: ${sourceDirectory}`)
    }

    // Ensure the destination directory exists, create it if not
    if (!fs.existsSync(destinationDirectory)) {
      throw new Error(`CSS destination directory not found: ${destinationDirectory}`)
    }

    // Read all files in the source directory
    const files = fs.readdirSync(sourceDirectory)

    // Copy each file to the destination directory
    files.forEach(file => {
      const sourcePath = path.join(sourceDirectory, file)
      const destinationPath = path.join(destinationDirectory, file)

      // Check if it's a file (not a directory) before copying
      if (fs.statSync(sourcePath).isFile()) {
        fs.copyFileSync(sourcePath, destinationPath)
      }
    })

    console.log(`Successfully copied CSS files from ${sourceDirectory} to ${destinationDirectory}`)
  } catch (error) {
    console.error(`Error copying CSS files: ${error.message}`)
  }
}
