const { context } = require('esbuild');
const fs = require('fs');
const path = require('path');

const isWatchMode = process.argv.includes('--watch');

// Function to bundle CSS
async function bundleCSS() {
  const cssDir = path.join(__dirname, 'src/components/settings/preferences/styles');
  let combinedCSS = '';
  
  try {
    const files = fs.readdirSync(cssDir);
    for (const file of files) {
      if (file.endsWith('.css')) {
        const cssContent = fs.readFileSync(path.join(cssDir, file), 'utf8');
        combinedCSS += cssContent + '\n';
      }
    }
    
    // Write combined CSS to public directory
    fs.writeFileSync(
      path.join(__dirname, 'public/dist/styles.css'),
      combinedCSS
    );
  } catch (error) {
    console.error('Error bundling CSS:', error);
  }
}

// Main build function
(async () => {
  try {
    // Bundle CSS first
    await bundleCSS();

    const ctx = await context({
      entryPoints: ['src/app.js'],
      bundle: true,
      outfile: 'public/dist/bundle.js',
      format: 'esm',
      platform: 'browser',
      sourcemap: true,
      minify: true,
      target: ['es2020'],
      loader: { 
        '.js': 'jsx',
        '.json': 'json'
      },
      define: {
        'process.env.NODE_ENV': '"development"'
      },
      plugins: [{
        name: 'watch-plugin',
        setup(build) {
          build.onEnd(result => {
            if (result.errors.length > 0) {
              console.error('Build failed:', result.errors);
            } else {
              console.log('Build completed successfully');
            }
          });
        },
      }]
    });

    if (isWatchMode) {
      console.log('Watching for changes...');
      await ctx.watch();
    } else {
      console.log('Building the project...');
      await ctx.rebuild();
      await ctx.dispose();
    }
  } catch (error) {
    console.error('Build error:', error);
    process.exit(1);
  }
})();