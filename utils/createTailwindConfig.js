// Builds the tailwind.config.js file
//
// Use writeTailwindConfig to write
//

import fs from 'fs'
import path from 'path'

export async function buildTailwindConfig(rootPath) {
  //   console.log('In buildTailwindConfig', rootPath, '\n')

  let t = `
import containerQueries from '@tailwindcss/container-queries'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{njk, md,html,js}', './dist/**/*.html'],

  theme: {
    extend: {},
    fontFamily: {
      sans: ['Inter', ...fontFamily.sans],
      serif: [...fontFamily.serif],
      mono: ['Fira Code', 'ui-monospace', ...fontFamily.mono]
    }
  },

  plugins: [typography, forms, containerQueries]
} 
`

  await writeTailwindConfig(t, rootPath)
}

export async function writeTailwindConfig(content, rootPath) {
  let fullPath = ''

  let file = 'tailwind.config.js'
  fullPath = path.join(rootPath, file)
  try {
    fs.writeFileSync(fullPath, content, { encoding: 'utf8' }) // Specify UTF-8 encoding
    // console.log('File written successfully!')
  } catch (error) {
    console.error('Error writing tailwind.config.js file:', error)
    throw error
  }
}
