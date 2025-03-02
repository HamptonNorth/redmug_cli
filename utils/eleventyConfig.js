// Builds the eleventy config file as string.
// The recipe is an array of the selections made in the (clack)
// An example recipe would be
//   {"install":true,"TemplateEngine":"njk","Plugins":["img","rss"],"CSS":"tw","tw_typography":true}
//
// Use writeEleventyConfig to write
//

import fs from 'fs'

export async function buildEleventyConfig(recipe, title = 'title', subtitle = 'subtitle', path) {
  //   console.log('recipe: ', JSON.stringify(recipe), '\npath: ', path, '\n')

  let templateEngine = recipe.TemplateEngine
  let plugins = ''
  let imports = "import { DateTime } from 'luxon'\n"

  if (recipe.Plugins.includes('img')) {
    imports += "import { eleventyImageTransformPlugin } from '@11ty/eleventy-img' \n"
    plugins += `
    eleventyConfig.addPlugin(eleventyImageTransformPlugin) `
  }
  if (recipe.Plugins.includes('fetch')) {
    imports += "import plugin_fetch from '@11ty/eleventy-fetch' \n"
    plugins += `
    eleventyConfig.addPlugin(plugin_fetch) `
  }
  if (recipe.Plugins.includes('rss')) {
    imports += "import plugin_rss from '@11ty/eleventy-plugin-rss' \n"
    plugins += `
    eleventyConfig.addPlugin(plugin_rss) `
  }
  if (recipe.Plugins.includes('navigation')) {
    imports += "import plugin_navigation from '@11ty/eleventy-navigation' \n"
    plugins += `
    eleventyConfig.addPlugin(plugin_navigation) `
  }
  if (recipe.Plugins.includes('syntaxhighlight')) {
    imports += "import plugin_syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight' \n"
    plugins += `
    eleventyConfig.addPlugin(plugin_syntaxHighlight) `
  }
  if (recipe.Plugins.includes('is-land')) {
    imports += "import plugin_is_land from '@11ty/is-land' \n"
    plugins += `
    eleventyConfig.addPlugin(plugin_is_land)`
  }

  let t =
    imports +
    `
    export default async function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/assets/css/style.css')
    eleventyConfig.addPassthroughCopy('src/assets/images')
    eleventyConfig.addPassthroughCopy({ 'src/robots.txt': '/robots.txt' })
    eleventyConfig.addPassthroughCopy('src', {
      //debug: true,
      filter: [
        '404.html',
        '**/*.css',
        '!**/*tailwind-input.css',
        '**/*.js',
        '**/*.json',
        '!**/*.11ty.js',
        '!**/*.11tydata.js'
      ]
    })
    ` +
    plugins +
    `
    eleventyConfig.addShortcode(
      'headers',
      (title, subtitle) =>
        "<h1>${title}</h1>        <div class='subhead'>${subtitle}</div>"
    )
  
    eleventyConfig.addShortcode('currentDate', (date = DateTime.now()) => {
      return date
    })

  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("./src/posts/*.md").sort(function(a, b) {
      return a.date - b.date; // Sort by date 
    });
  });

  
  
    eleventyConfig.addFilter('postDate', dateObj => {
      return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
    })
  
    return {
      dir: {
        input: 'src',
        output: 'dist',
        data: '_data',
        includes: '_includes',
        layouts: '_layouts'
      },
      templateFormats: [
        'md',
        '${templateEngine}', 
        'html' 
      ],
      htmlTemplateEngine: '${templateEngine}',
      markdownTemplateEngine: '${templateEngine}'
    }
  }
    `

  await writeEleventyConfig(t, path)
}

export async function writeEleventyConfig(content, path) {
  // console.log('writeEleventyConfig content: \n' + content)
  // console.log('writeEleventyConfig  path: ', path)
  try {
    fs.writeFileSync(path, content, { encoding: 'utf8' }) // Specify UTF-8 encoding
    // console.log('File written successfully!')
  } catch (error) {
    console.error('Error writing file:', error)
    throw error
  }
}
