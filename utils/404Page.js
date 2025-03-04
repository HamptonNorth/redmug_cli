//  Builds the 404 not found page /src/404.md
//

import path from 'path'

import { readSnippet } from './readSnippet.js'
import { writePage } from './writeSamplePage.js'

export async function build404Page(rootPath, css) {
  const sourceSnippet = path.join(process.cwd(), 'source_pages', '404', '404.md')
  let content = await readSnippet(sourceSnippet)

  await writePage('404', content, rootPath, '404', 'md')

  //   let t =
  //     `<!DOCTYPE html>
  // <html lang="en">
  //     <head>
  //         <meta charset="UTF-8">
  //         <meta http-equiv="X-UA-Compatible" content="IE=edge">
  //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //         <link rel="preconnect" href="https://fonts.googleapis.com">
  //         <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  //         <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
  //          <link rel="stylesheet" href="/assets/css/output.css">` +
  //     css +
  //     `
  //     <link rel="stylesheet" href="/assets/css/style.css">

  //         <title>Redmug

  //                 - 404

  //         </title>
  //         <meta name="description" content="    ">
  //     </head>
  //     <body> <nav><a href="/">Home</a><a href="/about/">About</a><a href="/post/">Posts</a></nav>

  //         <main>

  // <h2> 404 - Page not found</h2>

  // The page you're looking for could not be found.

  // <p><a href="/">Go back to the homepage</a></p>

  //         </main>
  //         <footer class="">
  //     <p class="footer-content">Eleventy Site &copy; 2025</p>
  // </footer>
  //     </body>
  // </html>

  // `

  //   await writePage(t, rootPath, '404', 'html')
}

// async function writePage(content, rootPath, name, extension) {
//   let fullPath = ''
//   let file = name + '.' + extension
//   fullPath = path.join(rootPath, 'src', file)
//   try {
//     fs.writeFileSync(fullPath, content, { encoding: 'utf8' }) // Specify UTF-8 encoding
//     //   console.log('File written successfully!')
//   } catch (err) {
//     console.error('Error writing 404 file:', err)
//   }
// }
