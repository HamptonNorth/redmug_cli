//  Builds a local style.css file.
//
// Load after and any CSS library selected

import fs from 'fs'
import path from 'path'

export async function buildLocalCSS(rootPath, css) {
  let t = `
  body {
    
  }
  main, footer{    
    font-family:  "Inter", sans-serif;    
    margin-left: 30px;  
    margin-right: 30px;  
    max-width: 800px;
    }

nav {  
    max-width: 800px;
    display: flex;
    justify-content: right; /* content right within the nav */ 
    margin-left: 30px;  
    margin-right: 30px;  
    padding: 10px;
  }
  
  nav {
   font-size:smaller;
    align-items: center; /* Centers content vertically within the nav */
  }
  
  nav a {
    display: flex; /* required for horizontal list */  
    padding: 0 20px; /*adds spacing between list items*/
  }
  
  footer{
    font-size: 60%;    
  }

  .subhead{
    color: grey;
    font-size: 70%;
  }
  
  /* Uncomment out following - aids for debug */
  /* 
  body{background-color: honeydew;}
  nav{background-color: yellow;}
  main{background-color: bisque;}
  footer{background-color:aliceblue;} 
  * { outline: 1px dashed red;}
  */
  
  `
  await writePage(t, rootPath)
}

async function writePage(content, rootPath) {
  let fullPath = ''

  let file = 'style.css'
  fullPath = path.join(rootPath, 'src', 'assets', 'css', file)

  try {
    fs.writeFileSync(fullPath, content, { encoding: 'utf8' }) // Specify UTF-8 encoding
    //   console.log('File written successfully!')
  } catch (err) {
    console.error('Error writing local CSS file:', err)
  }
}
