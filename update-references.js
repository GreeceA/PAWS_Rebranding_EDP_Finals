// update-references.js
// Node.js script to update all file path references to kebab-case in HTML, CSS, and JS files
// Usage: node update-references.js

const fs = require('fs');
const path = require('path');

function toKebabCase(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/_/g, '-')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function walk(dir, exts, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      walk(full, exts, files);
    } else if (exts.includes(path.extname(full))) {
      files.push(full);
    }
  });
  return files;
}

function updateReferences(root) {
  const exts = ['.html', '.css', '.js'];
  const files = walk(root, exts);
  const allFiles = walk(root, ['.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.webp']);

  // Map of oldName -> newName
  const renameMap = {};
  allFiles.forEach(f => {
    const base = path.basename(f);
    const kebab = toKebabCase(base);
    if (base !== kebab) {
      renameMap[base] = kebab;
    }
  });

  files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let changed = false;
    Object.keys(renameMap).forEach(oldName => {
      const newName = renameMap[oldName];
      // Replace in quotes, parentheses, or after slashes
      const regex = new RegExp(`([/"'\\(])${oldName}([)"'\\?])`, 'g');
      if (regex.test(content)) {
        content = content.replace(regex, `$1${newName}$2`);
        changed = true;
      }
      // Replace in url() in CSS
      const urlRegex = new RegExp(`url\\(['"]?${oldName}['"]?\\)`, 'g');
      if (urlRegex.test(content)) {
        content = content.replace(urlRegex, `url(${newName})`);
        changed = true;
      }
    });
    if (changed) {
      fs.writeFileSync(f, content, 'utf8');
      console.log(`Updated references in ${f}`);
    }
  });
}

updateReferences('.');
