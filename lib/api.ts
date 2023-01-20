import fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import matter from 'gray-matter'
import glob from 'glob'

const globPromise = promisify(glob)

const postsDirectory = join(process.cwd(), '_articles')

export async function getPostFiles() {
  return await globPromise(`${postsDirectory}/**/*.md`)
}

export function getPostByFilename(filename: string, fields: string[] = []) {
  const fileContents = fs.readFileSync(filename, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export async function getPostBySlug(slug: string, fields: string[]) {
  const posts = await getAllPosts(['slug', ...fields])
  return posts.find((p) => p.slug === slug)
}

export async function getAllPosts(fields: string[] = []) {
  const postFiles = await getPostFiles()
  const posts = postFiles
    .map((filename) => getPostByFilename(filename, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
