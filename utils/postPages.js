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

  const t1 = `---
title: First Post
layout: postLayout
tags: post
date: 2024-12-19
---

# First Post

Dynamically repurpose excellent internal or "organic" sources through interdependent e-tailers. Completely exploit virtual data rather than technically sound data. Proactively incentivize flexible internal or "organic" sources with.`

  await writePost(t1, rootPath, 'post1', 'md')

  const t2 = `---
title: Second Post
layout: postLayout
tags: post
---

# Second Post

Compellingly leverage existing installed base ideas whereas cost effective results. Interactively provide access to economically sound resources before quality.

Seamlessly predominate transparent initiatives for world-class methods of empowerment. Phosfluorescently network prospective niches after clicks-and-mortar vortals. Energistically harness multidisciplinary.`

  await writePost(t2, rootPath, 'post2', 'md')

  const t3 = `---
title: Third Post
layout: postLayout
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
    console.error('Error writing home post page file:', err)
  }
}

async function writePost(content, rootPath, name, extension) {
  // write posts/post at /src/posts
  let fullPath = ''

  let file = name + '.' + extension
  fullPath = path.join(rootPath, 'src', 'posts', file)

  try {
    fs.writeFileSync(fullPath, content, { encoding: 'utf8' }) // Specify UTF-8 encoding
    // console.log('File written successfully!')
  } catch (err) {
    console.error('Error writing post file:', err)
  }
}
