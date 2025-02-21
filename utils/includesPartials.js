// builds _includes/partials files

// navigation.njk
// footer.njk
// pagination.njk
//
//  TO DO test with other template engines
//
import fs from 'fs'
import path from 'path'

export async function buildPartialsPages(rootPath, templateEngine) {
  // navigation.

  let t = ``
  if (templateEngine === 'njk') {
    t = `<nav>
{%- for item in collections.page -%}
        <a href="{{ item.url }}">{{ item.data.title }}</a>
{%- endfor -%}
</nav>
  `
  } else if (templateEngine === 'liquid') {
    t = `<nav>
{% for item in collections.page %}
        <a href="{{ item.url }}">{{ item.data.title }}</a>
{% endfor %}
</nav>
  `
  }

  await writePage(t, rootPath, '_navigation', templateEngine)

  //   footer.
  t = `<footer class="">
    <p class="footer-content">Eleventy Site &copy; 2025</p>
</footer>`

  await writePage(t, rootPath, '_footer', templateEngine)

  //   pagination.
  if (templateEngine === 'njk') {
    t = `{% set previousPost = collections.post | getPreviousCollectionItem(page) %}
{% set nextPost = collections.post | getNextCollectionItem(page) %}
{% if previousPost %}Previous:
    <a href="{{ previousPost.url }}">{{ previousPost.data.title }}</a>
{% endif %}
<br>
    {% if nextPost %}Next:
        <a href="{{ nextPost.url }}">{{ nextPost.data.title }}</a>
    {% endif %}`
  } else if (templateEngine === 'liquid') {
    t = `{% assign previousPost = page.previous %}
{% assign nextPost = page.next %}

{% if previousPost %}
  Previous: <a href="{{ previousPost.url }}">{{ previousPost.data.title }}</a>
{% endif %}
<br>
{% if nextPost %}
  Next: <a href="{{ nextPost.url }}">{{ nextPost.data.title }}</a>
{% endif %}`
  }
  await writePage(t, rootPath, '_paginate', templateEngine)
}

async function writePage(content, rootPath, name, extension) {
  let fullPath = ''
  let file = name + '.' + extension
  fullPath = path.join(rootPath, 'src', '_includes', 'partials', file)

  try {
    fs.writeFileSync(fullPath, content, { encoding: 'utf8' }) // Specify UTF-8 encoding
    //   console.log('File written successfully!')
  } catch (err) {
    console.error('Error writing includes/partials file:', err)
  }
}
