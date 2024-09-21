import fs from 'fs';
import path from 'path';

export function detectFramework() {
  const currentDir = process.cwd();

  // Check for Remix
  if (fs.existsSync(path.join(currentDir, 'remix.config.js'))) {
    return 'remix';
  }

  // Check for Astro
  if (fs.existsSync(path.join(currentDir, 'astro.config.mjs'))) {
    return 'astro';
  }

  // Check for Laravel
  if (fs.existsSync(path.join(currentDir, 'artisan'))) {
    return 'laravel';
  }

  // Check for Next.js
  if (fs.existsSync(path.join(currentDir, 'next.config.js'))) {
    return 'nextjs';
  }

  // Check for Create React App
  if (fs.existsSync(path.join(currentDir, 'src', 'index.js')) && 
      fs.existsSync(path.join(currentDir, 'public', 'index.html'))) {
    return 'cra';
  }

  // Check for Vite
  if (fs.existsSync(path.join(currentDir, 'vite.config.js')) ||
      fs.existsSync(path.join(currentDir, 'vite.config.ts'))) {
    return 'vite';
  }

  // Check package.json for dependencies
  if (fs.existsSync(path.join(currentDir, 'package.json'))) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(currentDir, 'package.json'), 'utf8'));
      if (packageJson.dependencies) {
        if ('next' in packageJson.dependencies) return 'nextjs';
        if ('react' in packageJson.dependencies) return 'react';
      }
    } catch (error) {
      console.error('Error parsing package.json:', error);
    }
  }

  // If no framework is detected
  return null;
}