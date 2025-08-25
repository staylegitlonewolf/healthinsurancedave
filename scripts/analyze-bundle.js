#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Bundle size analyzer
function analyzeBundle() {
  const bundlePath = path.join(__dirname, '../build/client/assets');
  
  if (!fs.existsSync(bundlePath)) {
    console.log('❌ Bundle not found. Run build first.');
    return;
  }

  const files = fs.readdirSync(bundlePath);
  const jsFiles = files.filter(file => file.endsWith('.js'));
  
  console.log('📊 Bundle Analysis:');
  console.log('==================');
  
  jsFiles.forEach(file => {
    const filePath = path.join(bundlePath, file);
    const stats = fs.statSync(filePath);
    const sizeInKB = (stats.size / 1024).toFixed(2);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`📦 ${file}: ${sizeInKB} KB (${sizeInMB} MB)`);
    
    // Warning for large files
    if (stats.size > 500 * 1024) { // 500KB
      console.log(`⚠️  Large bundle detected: ${file} (${sizeInMB} MB)`);
      console.log('💡 Consider code splitting or lazy loading');
    }
  });
  
  // Total bundle size
  const totalSize = jsFiles.reduce((total, file) => {
    const filePath = path.join(bundlePath, file);
    return total + fs.statSync(filePath).size;
  }, 0);
  
  const totalKB = (totalSize / 1024).toFixed(2);
  const totalMB = (totalSize / (1024 * 1024)).toFixed(2);
  
  console.log('\n📈 Total Bundle Size:');
  console.log(`   ${totalKB} KB (${totalMB} MB)`);
  
  // Performance recommendations
  console.log('\n🚀 Performance Recommendations:');
  if (totalSize > 1024 * 1024) { // 1MB
    console.log('⚠️  Bundle is larger than 1MB - consider optimization');
    console.log('💡 Implement code splitting');
    console.log('💡 Use lazy loading for routes');
    console.log('💡 Optimize images and assets');
  } else if (totalSize > 500 * 1024) { // 500KB
    console.log('⚠️  Bundle is larger than 500KB - monitor performance');
    console.log('💡 Consider lazy loading non-critical components');
  } else {
    console.log('✅ Bundle size is good!');
  }
}

// Run analysis
analyzeBundle();

export { analyzeBundle };
