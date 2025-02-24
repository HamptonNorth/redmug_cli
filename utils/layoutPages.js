// builds  _layout files
// base.njk and postLayout.njk
//
//
//  TO DO
//
import fs from 'fs'
import path from 'path'

export async function buildLayoutPages(rootPath, templateEngine, css, title = 'My site') {
  let t =
    `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
            rel="stylesheet"> 
         <link rel="stylesheet" href="/assets/css/output.css">
       ` +
    css +
    `
    <link rel="stylesheet" href="/assets/css/style.css">

        <title>` +
    title +
    `
            {% if title %}
                - {{ title }}
            {% endif %}
        </title>
        <meta
            name="description"
            content=" {% if description %} {{ description }} {% else %} {{ site.description }} {% endif %} "/>
    </head>
    <body>`
  if (templateEngine === 'njk') {
    t += ` {% include "partials/_navigation.njk" %}
        <main>
            {{ content | safe }}
        </main>
        {% include "partials/_footer.njk" %}`
  } else if (templateEngine === 'liquid') {
    t += ` {% include "partials/_navigation.liquid" %}
        <main>
            {{ content }}
        </main>
        {% include "partials/_footer.liquid" %}`
  }

  t += `  
    </body>
</html>
  `
  await writePage(t, rootPath, 'base', templateEngine)

  //   postsLayout.
  t = `---
layout: base
---

<div class="">
`
  if (templateEngine === 'njk') {
    t += `{{ content| safe }} <br/> {% include "partials/_paginate.njk" %}
    `
  } else if (templateEngine === 'liquid') {
    t += `{{ content }} <br/> {% include "partials/_paginate.liquid" %}
    `
  }
  t += `
</div>
<hr class="">
    <a href="/posts"Posts Home</a>`

  await writePage(t, rootPath, 'postLayout', templateEngine)
}

async function writePage(content, rootPath, name, extension) {
  let fullPath = ''
  let file = name + '.' + extension
  fullPath = path.join(rootPath, 'src', '_layouts', file)
  try {
    fs.writeFileSync(fullPath, content, { encoding: 'utf8' }) // Specify UTF-8 encoding
    //   console.log('File written successfully!')
  } catch (err) {
    console.error('Error writing layout file:', err)
  }
}
