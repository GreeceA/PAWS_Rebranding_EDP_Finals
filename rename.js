// rename.js
// Node.js script to rename files using git mv based on rename-map.json
// Usage: node rename.js

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const map = JSON.parse(fs.readFileSync('rename-map.json', 'utf8'));
const imagesDir = path.join(__dirname, 'assets', 'images');

Object.entries(map).forEach(([oldName, newName]) => {
  const oldPath = path.join(imagesDir, oldName);
  const newPath = path.join(imagesDir, newName);
  if (fs.existsSync(oldPath) && oldName !== newName) {
    console.log(`Renaming ${oldName} -> ${newName}`);
    execSync(`git mv "${oldPath}" "${newPath}"`);
  }
});
