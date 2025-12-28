// Script to generate PNG logos from SVG
// Requires: npm install sharp
// Run: node scripts/generate-logo-png.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/logo.svg');
const outputDir = path.join(__dirname, '../public');

async function generateLogos() {
  try {
    const svgBuffer = fs.readFileSync(svgPath);
    
    // Generate logo192.png
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(path.join(outputDir, 'logo192.png'));
    
    console.log('✓ Generated logo192.png');
    
    // Generate logo512.png
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(outputDir, 'logo512.png'));
    
    console.log('✓ Generated logo512.png');
    
    // Generate favicon.ico (16x16)
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(outputDir, 'favicon.png'));
    
    console.log('✓ Generated favicon.png');
    console.log('\nAll logos generated successfully!');
  } catch (error) {
    console.error('Error generating logos:', error.message);
    console.log('\nNote: Install sharp first: npm install sharp');
  }
}

generateLogos();
