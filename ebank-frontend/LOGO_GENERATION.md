# Logo Generation Guide

## Professional eBank Logo

A professional e-bank logo has been created in SVG format at `public/logo.svg`.

### To Generate PNG Versions:

#### Option 1: Using the Node.js Script (Recommended)
1. Install sharp: `npm install sharp`
2. Run the script: `node scripts/generate-logo-png.js`

This will generate:
- `logo192.png` (192x192)
- `logo512.png` (512x512)
- `favicon.png` (32x32)

#### Option 2: Using Online Tools
1. Visit https://cloudconvert.com/svg-to-png or similar
2. Upload `public/logo.svg`
3. Set dimensions:
   - 192x192 for `logo192.png`
   - 512x512 for `logo512.png`
   - 32x32 for `favicon.ico`
4. Download and place in `public/` folder

#### Option 3: Using Image Editing Software
- Open `public/logo.svg` in Adobe Illustrator, Inkscape, or similar
- Export as PNG at the required sizes

### Logo Design
The logo features:
- Shield icon (representing security and trust)
- Letter "E" for eBank
- Money/coin symbol (representing banking)
- Professional blue and green color scheme
