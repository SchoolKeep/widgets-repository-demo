
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'

// Custom plugin to inline CSS and prevent CSS file generation
const inlineCSSAggressively = (): Plugin => {
  let cssCode = ''

  return {
    name: 'inline-css-aggressively',
    buildStart() {
      cssCode = ''
    },
    transform(code, id) {
      // Capture CSS content during transform
      if (id.endsWith('.css')) {
        cssCode += code + '\n'
        // Return empty module to prevent CSS file generation
        return 'export default {}'
      }
    },
    generateBundle(_options, bundle) {
      // Find JS files
      const jsFiles = Object.keys(bundle).filter(key => key.endsWith('.js'))

      if (cssCode && jsFiles.length > 0) {
        // Inject CSS into the first JS file
        const firstJsFile = jsFiles[0]
        const jsAsset = bundle[firstJsFile]

        if (jsAsset.type === 'chunk') {
          const cssInjectionCode = `
            (function() {
              const style = document.createElement('style');
              style.textContent = ${JSON.stringify(cssCode)};
              const shadowRoot = document.querySelector('template[shadowrootmode="open"]')?.shadowRoot;
              if (shadowRoot) {
                shadowRoot.appendChild(style);
              } else {
                document.head.appendChild(style);
              }
            })();
          `
          jsAsset.code = cssInjectionCode + jsAsset.code
        }
      }

      // Remove any CSS files that might have been generated
      const cssFiles = Object.keys(bundle).filter(key => key.endsWith('.css'))
      cssFiles.forEach(file => {
        delete bundle[file]
      })
    }
  }
}

// Custom plugin to extract widget content only
const extractWidgetContent = (): Plugin => {
  return {
    name: 'extract-widget-content',
    generateBundle(_options, bundle) {
      // Find the HTML file
      const htmlFiles = Object.keys(bundle).filter(key => key.endsWith('.html'))

      htmlFiles.forEach(fileName => {
        const htmlAsset = bundle[fileName]
        if (htmlAsset.type === 'asset' && typeof htmlAsset.source === 'string') {
          // Extract content between WIDGET_START and WIDGET_END comments
          const widgetMatch = htmlAsset.source.match(/<!-- WIDGET_START -->([\s\S]*?)<!-- WIDGET_END -->/i)
          if (widgetMatch) {
            let content = widgetMatch[1].trim()

            // Remove any CSS link tags
            content = content.replace(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi, '')

            // Remove any script tags that might reference CSS
            content = content.replace(/<script[^>]*src=["'][^"']*\.css["'][^>]*><\/script>/gi, '')

            // Clean up extra whitespace
            content = content.replace(/\s+/g, ' ').trim()

            htmlAsset.source = content
          }
        }
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), inlineCSSAggressively(), extractWidgetContent()],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined,
      }
    }
  }
})