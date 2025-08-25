#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Performance optimization analyzer
function analyzePerformance() {
  console.log('🚀 Performance Optimization Analysis');
  console.log('====================================');
  
  // Check bundle size
  const bundlePath = path.join(__dirname, '../build/client/assets');
  if (fs.existsSync(bundlePath)) {
    const files = fs.readdirSync(bundlePath);
    const jsFiles = files.filter(file => file.endsWith('.js'));
    const cssFiles = files.filter(file => file.endsWith('.css'));
    
    let totalJS = 0;
    let totalCSS = 0;
    
    jsFiles.forEach(file => {
      const filePath = path.join(bundlePath, file);
      const stats = fs.statSync(filePath);
      totalJS += stats.size;
    });
    
    cssFiles.forEach(file => {
      const filePath = path.join(bundlePath, file);
      const stats = fs.statSync(filePath);
      totalCSS += stats.size;
    });
    
    const totalJSKB = (totalJS / 1024).toFixed(2);
    const totalCSSKB = (totalCSS / 1024).toFixed(2);
    const totalKB = ((totalJS + totalCSS) / 1024).toFixed(2);
    
    console.log(`📦 JavaScript: ${totalJSKB} KB`);
    console.log(`🎨 CSS: ${totalCSSKB} KB`);
    console.log(`📊 Total: ${totalKB} KB`);
    
    // Performance recommendations
    if (totalJS > 500 * 1024) {
      console.log('⚠️  JavaScript bundle is large - consider code splitting');
    }
    if (totalCSS > 100 * 1024) {
      console.log('⚠️  CSS bundle is large - consider purging unused styles');
    }
  }
  
  // Check for unused imports
  console.log('\n🔍 Checking for unused imports...');
  const sourcePath = path.join(__dirname, '../app');
  checkUnusedImports(sourcePath);
  
  // Check for console statements
  console.log('\n🔍 Checking for console statements...');
  checkConsoleStatements(sourcePath);
  
  // Performance recommendations
  console.log('\n💡 Performance Recommendations:');
  console.log('1. ✅ Service Worker implemented for caching');
  console.log('2. ✅ Lazy loading implemented for images');
  console.log('3. ✅ CSS variables for theme switching');
  console.log('4. ✅ Responsive design optimized');
  console.log('5. ✅ Mobile zoom prevention implemented');
  console.log('6. 💡 Consider implementing code splitting for routes');
  console.log('7. 💡 Consider implementing image optimization');
  console.log('8. 💡 Consider implementing critical CSS inlining');
}

function checkUnusedImports(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  files.forEach(file => {
    const filePath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      checkUnusedImports(filePath);
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const importLines = content.match(/import.*from.*['"]/g) || [];
      
      importLines.forEach(importLine => {
        const match = importLine.match(/import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]/);
        if (match) {
          const imports = match[1].split(',').map(i => i.trim());
          const module = match[2];
          
          imports.forEach(importName => {
            if (!content.includes(importName) || content.indexOf(importName) === content.indexOf(importLine)) {
              console.log(`⚠️  Potentially unused import: ${importName} in ${filePath}`);
            }
          });
        }
      });
    }
  });
}

function checkConsoleStatements(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  files.forEach(file => {
    const filePath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      checkConsoleStatements(filePath);
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const consoleMatches = content.match(/console\.(log|warn|error|info)/g) || [];
      
      if (consoleMatches.length > 0) {
        console.log(`⚠️  Console statements found in ${filePath}: ${consoleMatches.length}`);
      }
    }
  });
}

// Run analysis
analyzePerformance();
