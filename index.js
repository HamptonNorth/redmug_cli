#!/usr/bin/env node

import { setTimeout } from 'node:timers/promises'
import { isCancel, log, confirm, text, intro, outro, note, spinner, group, select, multiselect } from '@clack/prompts'
import { existsSync, mkdirSync, readdirSync, rmSync } from 'fs'
import { execSync } from 'child_process'

import color from 'picocolors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { createDirectories } from './utils/createDirectories.js'
import { buildEleventyConfig } from './utils/eleventyConfig.js'
import { buildHomePage } from './utils/homePage.js'
import { buildAboutPage } from './utils/aboutPage.js'
import { buildLayoutPages } from './utils/layoutPages.js'
import { buildPartialsPages } from './utils/includesPartials.js'
import { buildPostPages } from './utils/postPages.js'
import { minifiedCSS } from './utils/getMinifiedCSS.js'
import { buildLocalCSS } from './utils/createLocalCSS.js'

const version = '0.1.1'

main()

async function main() {
  await setTimeout(1000)
  // console.log('')
  console.clear()
  console.log('')

  intro(color.bgWhite(color.black(' +++ create an 11ty static web site +++ ')))
  log.info('CLI version: ' + version)

  const project = await group(
    {
      dir: () =>
        text({
          message: 'Where should we create your project1?',
          placeholder: 'your_dir_name',
          validate: value => {
            if (!value) return 'Please enter a relative path.'
          }
        })
    },
    {
      onCancel: () => {
        log.error('Operation cancelled.')
        process.exit(0)
      }
    }
  )

  if (dirExists(project.dir)) {
    // dir exists - check if empty
    if (!isEmpty(project.dir)) {
      // dir exists and is not empty - abort gracefully
      log.error('Target directory exists but is not empty. Operation cancelled.')
      process.exit(0)
    } else {
      log.info('Target directory exists and is empty - continuing .....')
    }
  } else {
    // create directory
    try {
      mkdirSync(path.resolve(process.cwd(), project.dir), { recursive: true }) // Create directory if it doesn't exist
      log.info(`Target directory '${project.dir}' created at ${path.resolve(process.cwd(), project.dir)}`)
    } catch (err) {
      log.error(`Error creating target directory: ${err.message}`)
      process.exit(0)
    }
  }

  const installRecipe = await group(
    {
      siteTitle: () =>
        text({
          message: 'Site title?',
          placeholder: 'My site'
        }),

      install: () =>
        confirm({
          message: 'Install 11ty?',
          initialValue: true
        }),
      TemplateEngine: () =>
        select({
          message: 'Pick a 11ty template engine.',
          initialValue: 'njk',
          options: [
            { value: 'njk', label: 'Nunjucks' },
            { value: 'liquid', label: 'Liquid' }
          ]
        }),

      Plugins: () =>
        multiselect({
          message: 'Select official 11ty plugins to install.',
          initialValues: [],
          required: false,
          options: [
            { value: 'img', label: 'Image' },
            { value: 'fetch', label: 'Fetch' },
            { value: 'rss', label: 'RSS' },
            { value: 'navigation', label: 'Navigation' },
            { value: 'is-land', label: '<is-land>' }
          ]
        }),
      CSS: () =>
        select({
          message: 'Select a CSS library for your project.',
          initialValue: 'tw',
          options: [
            { value: 'none', label: 'no CSS to be installed' },
            { value: 'tw', label: 'Tailwind' },
            { value: 'pico', label: 'Pico CSS' },
            { value: 'mvp', label: 'MVP CSS' },
            { value: 'simple', label: 'Simple CSS' },
            { value: 'pure', label: 'Pure CSS' },
            { value: 'picnic', label: 'Picnic CSS' }
          ]
        })
    },
    {
      onCancel: () => {
        log.error('Operation cancelled.')
        process.exit(0)
      }
    }
  )
  let installRecipeOption = []
  let getStylesheet = await minifiedCSS(installRecipe.CSS)
  if (installRecipe.CSS === 'tw') {
    installRecipeOption = await group(
      {
        tw_typography: () =>
          confirm({
            message: 'Install Tailwind typography plugin?',
            initialValue: true
          })
      },
      {
        onCancel: () => {
          log.error('Operation cancelled.')
          process.exit(0)
        }
      }
    )
  }

  if (installRecipe.CSS === 'tw') {
    installRecipe['tw_typography'] = installRecipeOption.tw_typography
  }

  installRecipe['version'] = version

  if (!installRecipe.install) {
    log.error('Operation cancelled. Response to insall 11ty = no! Use ctrl+C for immediate cancel')
    process.exit(0)
  }

  const forInstallation = installRecipe
  const absolutePath = path.resolve(process.cwd(), project.dir)

  // Do installation
  const s = spinner()
  // s.start('Installing 11ty and ' + installRecipe.CSS + ' This may take some time .....')
  s.start('Installing. This may take some time ........')
  await setTimeout(500)
  try {
    // Initialize npm
    execSync(`npm init -y`, { cwd: absolutePath, stdio: 'pipe' })
    await setTimeout(1000)
    // Install 11ty
    if (installRecipe.install) {
      execSync(`npm install @11ty/eleventy  --save-dev`, { cwd: absolutePath, stdio: 'pipe' })
      await setTimeout(1000)
      // Install 11ty official plugins if selected
      await setTimeout(500)
      if (installRecipe.Plugins.includes('img')) {
        execSync(`npm i @11ty/eleventy-img  --save-dev`, { cwd: absolutePath, stdio: 'pipe' })
      }
      await setTimeout(500)
      if (installRecipe.Plugins.includes('fetch')) {
        execSync(`npm i @11ty/eleventy-fetch  --save-dev`, { cwd: absolutePath, stdio: 'pipe' })
      }
      await setTimeout(500)
      if (installRecipe.Plugins.includes('rss')) {
        execSync(`npm i @11ty/eleventy-plugin-rss  --save-dev`, { cwd: absolutePath, stdio: 'pipe' })
      }
      await setTimeout(500)
      if (installRecipe.Plugins.includes('navigation')) {
        execSync(`npm i @11ty/eleventy-navigation  --save-dev`, { cwd: absolutePath, stdio: 'pipe' })
      }
      await setTimeout(500)
      if (installRecipe.Plugins.includes('is-land')) {
        execSync(`npm i @11ty/is-land  --save-dev`, { cwd: absolutePath, stdio: 'pipe' })
      }

      // fix package.json
      const packageJSONPath = path.join(absolutePath, 'package.json')
      const packageJsonString = fs.readFileSync(packageJSONPath, 'utf8')
      const packageJson = JSON.parse(packageJsonString)
      if (packageJson.type === 'commonjs') {
        packageJson.type = 'module'
      }
      packageJson.version = '0.1.0'

      const updatedPackageJsonString = JSON.stringify(packageJson, null, 2)
      fs.writeFileSync(packageJSONPath, updatedPackageJsonString, 'utf8')

      await setTimeout(1000)

      await createDirectories(absolutePath)
      const template = installRecipe.TemplateEngine
      const css = installRecipe.CSS
      const title = installRecipe.siteTitle
      //  Build and write files
      await buildEleventyConfig(installRecipe, 'My Title', 'subTitle', path.join(absolutePath, '.eleventy.js'))
      await buildHomePage(absolutePath)
      await buildLayoutPages(absolutePath, template, getStylesheet, title)
      await buildPartialsPages(absolutePath, template)
      await buildAboutPage(absolutePath, installRecipe)
      await buildPostPages(absolutePath, template)
      await buildLocalCSS(absolutePath, css)
    }
  } catch (error) {
    s.stop('installation failed')
    log.error(`Error during installation: ${error.message}`)
  }

  s.stop('Installation complete')
  const nextSteps = `cd ${project.dir}          \nnpx eleventy --serve         `

  note(nextSteps, 'Next steps. ')
  outro(`*** finished ***`)
}

function dirExists(dir) {
  let fullDir = joinRelativePath(path.dirname(fileURLToPath(import.meta.url)), dir)

  if (fs.existsSync(fullDir)) {
    // console.log('In dirExists - returning true dir exists - fullDir: ', fullDir)
    return true
  } else {
    // console.log('In dirExists - returning false dir DOES NOT EXIST - fullDir: ', fullDir)
    return false
  }
}

function joinRelativePath(basePath, relativePath) {
  // Normalize paths to use forward slashes (works cross-platform)
  const normalizedBasePath = basePath.replace(/\\/g, '/')
  const normalizedRelativePath = relativePath.replace(/\\/g, '/')

  // Use path.join for correct path joining (handles slashes and relative paths)
  const joinedPath = path.join(normalizedBasePath, normalizedRelativePath)

  return joinedPath
}

function isEmpty(dir) {
  let fullDir = joinRelativePath(path.dirname(fileURLToPath(import.meta.url)), dir)
  if (fs.readdirSync(fullDir).length === 0) {
    // console.log('In isEmpty - Directory is EMPTY - fullDir: ', fullDir)
    return true
  } else {
    // console.log('In isEmpty - Directory is NOT EMPTY !!!! - fullDir: ', fullDir)
    return false
  }
}
