// update-image-references.js
// Improved Node.js script to update all image references in HTML and CSS files using rename-map.json
// Also fixes absolute/wrong folder paths to assets/images/
// Usage: node update-image-references.js

const fs = require('fs');
const path = require('path');

const MAP_PATH = 'rename-map.json';
const FILE_EXTS = ['.html', '.css'];
const ROOT_DIRS = ['.', 'css'];
const WRONG_PATHS = [
  { from: /\/img-scheduling\//g, to: 'assets/images/' },
  { from: /\/img-home\//g, to: 'assets/images/' },
  { from: /\/img\//g, to: 'assets/images/' },
  { from: /assets\\images\\/g, to: 'assets/images/' } // Windows backslash fix
];

function walk(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      walk(full, files);
    } else if (FILE_EXTS.includes(path.extname(full))) {
      files.push(full);
    }
  });
  return files;
}

function updateReferences() {
  if (!fs.existsSync(MAP_PATH)) {
    console.error(`Error: ${MAP_PATH} not found.`);
    process.exit(1);
  }
  let map;
  try {
    map = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'));
  } catch (e) {
    console.error(`Error reading ${MAP_PATH}:`, e.message);
    process.exit(1);
  }

  let files = [];
  ROOT_DIRS.forEach(dir => {
    if (fs.existsSync(dir)) files = files.concat(walk(dir));
  });

  let updatedFiles = 0;
  files.forEach(f => {
    let content;
    try {
      content = fs.readFileSync(f, 'utf8');
    } catch (e) {
      console.warn(`Warning: Could not read ${f}: ${e.message}`);
      return;
    }
    let changed = false;

    // 1. Fix wrong/absolute folder paths first
    WRONG_PATHS.forEach(({from, to}) => {
      if (from.test(content)) {
        content = content.replace(from, to);
        changed = true;
      }
    });

    // 2. Update image references using rename-map.json
    Object.entries(map).forEach(([oldName, newName]) => {
      if (oldName !== newName && content.includes(oldName)) {
        // Replace in src, href, url(), etc.
        const regex = new RegExp(oldName.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1'), 'g');
        content = content.replace(regex, newName);
        changed = true;
      }
    });

    if (changed) {
      try {
        fs.writeFileSync(f, content, 'utf8');
        console.log(`Updated references in ${f}`);
        updatedFiles++;
      } catch (e) {
        console.error(`Error writing to ${f}: ${e.message}`);
      }
    }
  });
  if (updatedFiles === 0) {
    console.log('No references updated. All files are up to date.');
  } else {
    console.log(`\nDone. Updated ${updatedFiles} file(s).`);
  }
}

updateReferences();
