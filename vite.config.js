import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function wpUploadsPlugin() {
  const projectRoot = process.cwd()
  const uploadsDir = path.resolve(projectRoot, 'uploads')
  const uploadsPublicPath = '/wp-content/uploads/'

  const mimeTypes = {
    '.avif': 'image/avif',
    '.css': 'text/css; charset=utf-8',
    '.gif': 'image/gif',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain; charset=utf-8',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.xml': 'application/xml; charset=utf-8',
  }

  const getFilePathFromUrl = (url) => {
    if (!url) return null

    const cleanUrl = url.split('?')[0].split('#')[0]
    const publicPathIndex = cleanUrl.indexOf(uploadsPublicPath)

    if (publicPathIndex === -1) {
      return null
    }

    const relativePath = cleanUrl.slice(publicPathIndex + uploadsPublicPath.length)

    if (!relativePath) {
      return null
    }

    const decodedPath = decodeURIComponent(relativePath)
    const normalizedPath = path.normalize(decodedPath)

    if (normalizedPath.startsWith('..') || path.isAbsolute(normalizedPath)) {
      return null
    }

    return path.join(uploadsDir, normalizedPath)
  }

  return {
    name: 'wp-uploads-from-root',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const filePath = getFilePathFromUrl(req.url)

        if (!filePath || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
          next()
          return
        }

        const ext = path.extname(filePath).toLowerCase()
        res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream')

        const stream = fs.createReadStream(filePath)
        stream.on('error', () => {
          res.statusCode = 500
          res.end('Unable to read upload asset.')
        })
        stream.pipe(res)
      })
    },
    closeBundle() {
      if (!fs.existsSync(uploadsDir)) {
        return
      }

      const outDir = path.resolve(projectRoot, 'dist', 'wp-content', 'uploads')
      fs.mkdirSync(path.dirname(outDir), { recursive: true })
      fs.cpSync(uploadsDir, outDir, { recursive: true })
    },
  }
}

export default defineConfig({
  plugins: [react(), wpUploadsPlugin()],
  base: '/',   // matches your current path
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  }
})
