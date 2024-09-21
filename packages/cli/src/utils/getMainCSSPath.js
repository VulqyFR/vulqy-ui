export function getMainCSSPath(framework) {
  switch (framework) {
    case 'nextjs': return 'src/app/globals.css';
    case 'vite': return 'src/index.css';
    case 'remix': return 'app/styles/global.css';
    case 'astro': return 'src/styles/global.css';
    case 'laravel': return 'resources/css/app.css';
    case 'cra': return 'src/index.css';
    default: return 'src/styles/global.css';
  }
}
