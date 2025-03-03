//  Builds some sample post pages
// /src/about.md
//

import fs from 'fs'
import path from 'path'

export async function buildPostPages(rootPath, templateEngine) {
  const x = 1
  let postsHome = `---
layout: base
title: Posts
tags: page
---

<h1>Posts Home</h1>
<ul>
    {% for post in collections.post %}
        <li>
            <a href="{{ post.url }}">{{ post.data.title }}</a>`

  if (templateEngine === 'njk') {
    postsHome += `<small class="">{{ post.date | postDate }}</small>`
  } else if (templateEngine === 'liquid') {
    postsHome += `<small class="">{{ post.date | date:"%d %b %Y" }}</small>`
  }

  // Add code for any addition template engines here
  postsHome += `
        </li>
    {% endfor %}
</ul>`

  await writePage(postsHome, rootPath, 'post', templateEngine)
  await copySamplePosts(rootPath)
}

async function writePage(content, rootPath, name, extension) {
  // write any pages at /src
  let fullPath = ''

  let file = name + '.' + extension
  fullPath = path.join(rootPath, 'src', file)

  try {
    fs.writeFileSync(fullPath, content, { encoding: 'utf8' }) // Specify UTF-8 encoding
  } catch (err) {
    console.error('Error writing home post page file:', err)
  }
}

async function copySamplePosts(rootPath) {
  // copy sample posts
  const sourceDirectory = path.join(process.cwd(), 'sample_pages', 'posts')
  const destinationDirectory = path.join(rootPath, 'src', 'posts')
  try {
    if (!fs.existsSync(sourceDirectory)) {
      throw new Error(`Sample posts source directory not found: ${sourceDirectory}`)
    }

    // Ensure the destination directory exists, create it if not
    if (!fs.existsSync(destinationDirectory)) {
      throw new Error(`Posts destination directory not found: ${destinationDirectory}`)
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

    console.log(`Successfully copied sample post files from ${sourceDirectory} to ${destinationDirectory}`)
  } catch (error) {
    console.error(`Error copying posts files: ${error.message}`)
  }
}
