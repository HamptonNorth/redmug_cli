// returns stylesheet link to load a minified CSS librarary from CDN
// e.g. <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" />
//
// If Tailwind selected, set up not done here
// minified should be set to true or false

export async function minifiedCSS(css) {
  if (css === 'none' || css === 'tw') {
    return
  } else if (css === 'pico') {
    return '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" />'
  } else if (css === 'mvp') {
    return '<link rel="stylesheet" href="https://unpkg.com/mvp.css"> '
  } else if (css === 'simple') {
    return '<link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css" />'
  } else if (css === 'pure') {
    return '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css" integrity="sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls" crossorigin="anonymous">'
  } else if (css === 'picnic') {
    return '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/picnic">'
  }
}
