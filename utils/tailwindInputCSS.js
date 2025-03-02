//
// Builds the tailwind input css file
//
// Use writeTailwindCSS to write
//

import fs from 'fs'
import path from 'path'

export async function buildTailwindCSS(rootPath) {
  let t = `
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --font-sans: Inter, sans-serif;
  }

  body {
    font-family: var(--font-sans);
  }
}

@layer utilities {
  
}
`

  t = `
@import "tailwindcss" ;`

  const fullPath = path.join(rootPath, 'src', 'assets', 'css', 'tailwind-input.css')
  await writeTailwindCSS(t, fullPath)
}

export async function writeTailwindCSS(content, path) {
  // console.log('writeEleventyConfig content: \n' + content)
  // console.log('writeEleventyConfig  path: ', path)
  try {
    fs.writeFileSync(path, content, { encoding: 'utf8' }) // Specify UTF-8 encoding
    // console.log('File written successfully!')
  } catch (error) {
    console.error('Error writing tailwind-input.css file:', error)
    throw error
  }
}
