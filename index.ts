import { promises as fs } from 'fs'

import { list } from './config'
import path from 'path'

const targetDir = process.argv[2]
if (!targetDir) {
  console.error('target directory is required!')
  process.exit(1)
}

const storageDir = process.argv[3]
if (!storageDir) {
  console.error('storage directory is required!')
  process.exit(1)
}

const getPath = (file: string) => {
  for (const [dir, regex] of Object.entries(list)) {
    if (regex.test(file)) {
      let match = dir.match(/S(\d+)/)
      const season = match ? match[1].padStart(2, '0') : '01'
      match = file.match(regex)
      const episode = match ? match[1] : '01'
      if (!episode) return null
      return path.join(storageDir, dir, `S${season}E${episode}${path.extname(file)}`)
    }
  }

  return null
}

const main = async () => {
  const files = await fs.readdir(targetDir, { withFileTypes: true })

  files
    .filter(file => file.isFile())
    .forEach(async file => {
      const target = getPath(file.name)
      console.log(`${file.name} -> ${target}`)
      if (target) {
      }
    })
}

main()
