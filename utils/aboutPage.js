//  Builds the about page /src/about.md
//

import fs from 'fs'
import path from 'path'

export async function buildAboutPage(rootPath) {
  let t = `---
layout: base
title: About
tags: page
permalink: /about/
---

# About

I've always been angry about many things. Simple irritations like dog's fouling the footpath to
big issues like wealth inequality or religion in schools. I wanted a vehicle to write about
these things in a more structured way. Hence this simple blog.

## Some sub heading

This site was scaffolded using \`redmug_cli\`, a \`node.js\` script using \`clack\` and \`clack/prompts\` for the UI

It was developed as a learning project for eleventy basics. The following tutorial was particularly helpful:

[Set Up a Simple and Reliable Static Site Generator Using 11ty (Eleventy) + Tailwind CSS](https://abdullahyahya.com/2025/02/set-up-a-simple-and-reliable-static-site-generator-using-11ty-eleventy-tailwind-css/)
  `
  await writePage('about', t, rootPath, 'about', 'md')
}

async function writePage(type, content, rootPath, name, extension, number = 0) {
  let fullPath = ''

  let file = name + '.' + extension
  fullPath = path.join(rootPath, 'src', file)
  // console.log('🚀 ~ index4.js:280 ~ writePage ~ fullPath:', fullPath)
  try {
    fs.writeFileSync(fullPath, content, { encoding: 'utf8' }) // Specify UTF-8 encoding
    //   console.log('File written successfully!')
  } catch (err) {
    console.error('Error writing file:', err)
  }
}
