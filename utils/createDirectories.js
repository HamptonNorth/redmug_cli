// creates empty directories to scsffold out the 11ty site
// The dirs passed as array
// e.g ['src', 'src/assets', 'src/assets/img', 'src/pages']
//

import fs from 'fs'
import path from 'path'

export async function createDirectories(root, css) {
  const dirs = [
    'src',
    'src/assets',
    'src/assets/images',
    'src/assets/css',
    'src/_data',
    'src/_dist',
    'src/_includes',
    'src/_includes/partials',
    'src/_layouts',
    'src/posts'
  ]
  if (css === 'tw') {
  }

  for (const dir of dirs) {
    const fullPath = path.join(root, dir)

    try {
      await fs.promises.access(fullPath)
      // console.log(`Directory '${fullPath}' already exists.`)
    } catch (error) {
      try {
        await fs.promises.mkdir(fullPath, { recursive: true })
        // console.log(`Directory '${fullPath}' created successfully.`)
      } catch (mkdirErr) {
        // console.error(`Error creating directory '${fullPath}':`, mkdirErr)
      }
    }
  }
}
