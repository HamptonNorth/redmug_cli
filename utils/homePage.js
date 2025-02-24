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

This site has been built with the Eleventy static site generator. For all the Eleventy docs follow this [link](https://www.11ty.dev/docs/). The redmug cli usage and options are explained in the <code>README.md</code> file in the home directory of the node script.

The CSS choice sets up the stylesheet link in the head section to be downloaded from a CDN. This is a *minified* file where there is the option. If you are happy with your choice of CSS library, you are probably best installing locally for performance reasons.

Tailwind installation uses an input CSS direcory and an output CSS directory with the NPM package run-all and Tailwind CLI providing the magic.

All the posts are authored in <code>markdown</code> and are in the <code>/posts</code> directory.
  `
  await writePage(t, rootPath, 'index', 'md')
  await copyLogo(rootPath)
}
async function writePage(content, rootPath, name, extension) {
  let fullPath = ''

  let file = name + '.' + extension
  fullPath = path.join(rootPath, 'src', file)

  try {
    fs.writeFileSync(fullPath, content, { encoding: 'utf8' }) // Specify UTF-8 encoding
    //   console.log('File written successfully!')
  } catch (err) {
    console.error('Error writing Home Page file:', err)
  }
}

async function copyLogo(rootPath) {
  // copy sample logo
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
