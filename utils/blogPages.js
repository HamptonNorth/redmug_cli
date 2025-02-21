//  Builds some sample blog pages
// /src/about.md
//

import fs from 'fs'
import path from 'path'

export async function buildBlogPages(rootPath, templateEngine) {
  const x = 1
  let blogHome = `---
layout: base
title: Blog
tags: page
---

<h1>Blog Home</h1>
<ul>
    {% for post in collections.post %}
        <li>
            <a href="{{ post.url }}">{{ post.data.title }}</a>`

  if (templateEngine === 'njk') {
    blogHome += `<small class="">{{ post.date | postDate }}</small>`
  } else if (templateEngine === 'liquid') {
    blogHome += `<small class="">{{ post.date | date:"%d %b %Y" }}</small>`
  }

  // Add code for any addition template engines here
  blogHome += `
        </li>
    {% endfor %}
</ul>`

  await writePage(blogHome, rootPath, 'blog', templateEngine)

  const t1 = `---
title: First Post
layout: blogLayout
tags: post
date: 2024-12-19
---

# First Post

Dynamically repurpose excellent internal or "organic" sources through interdependent e-tailers. Completely exploit virtual data rather than technically sound data. Proactively incentivize flexible internal or "organic" sources with.`

  await writePost(t1, rootPath, 'post1', 'md')

  const t2 = `---
title: Second Post
layout: blogLayout
tags: post
---

  # Second Post

  Compellingly leverage existing installed base ideas whereas cost effective results. Interactively provide access to economically sound resources before quality.

  Seamlessly predominate transparent initiatives for world-class methods of empowerment. Phosfluorescently network prospective niches after clicks-and-mortar vortals. Energistically harness multidisciplinary.`

  await writePost(t2, rootPath, 'post2', 'md')

  const t3 = `---
title: Third Post
layout: blogLayout
tags: post
---

  # Third Post

  Assertively expedite integrated infrastructures whereas inexpensive quality vectors. Globally transition global e-business through sustainable potentialities. Objectively drive team driven.

  Dynamically repurpose excellent internal or "organic" sources through interdependent e-tailers. Completely exploit virtual data rather than technically sound data. Proactively incentivize flexible internal or "organic" sources with.`

  await writePost(t3, rootPath, 'post3', 'md')
}

async function writePage(content, rootPath, name, extension) {
  // write any pages at /src
  let fullPath = ''

  let file = name + '.' + extension
  fullPath = path.join(rootPath, 'src', file)

  try {
    fs.writeFileSync(fullPath, content, { encoding: 'utf8' }) // Specify UTF-8 encoding
  } catch (err) {
    console.error('Error writing home blog page file:', err)
  }
}

async function writePost(content, rootPath, name, extension) {
  // write blogs/post at /src/blog
  let fullPath = ''

  let file = name + '.' + extension
  fullPath = path.join(rootPath, 'src', 'blog', file)

  try {
    fs.writeFileSync(fullPath, content, { encoding: 'utf8' }) // Specify UTF-8 encoding
    // console.log('File written successfully!')
  } catch (err) {
    console.error('Error writing blog file:', err)
  }
}
