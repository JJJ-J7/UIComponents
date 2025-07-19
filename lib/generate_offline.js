// service-worker.js でキャッシュするファイルのリストを生成するスクリプト
// ターミナルで実行: node generate_offline.js

const fs = require('fs');
const path = require('path');

// スクリプトの1階層上がルート
const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(ROOT_DIR, 'urlsToCache.json');

// 任意：対象拡張子（空ならすべて）
const exts = ['.html', '.js', '.png', '.css', '.json']; // 例: ['.html', '.js', '.png']

// 除外ディレクトリ（相対名）
const excludeDirs = ['.vscode'];

// 除外ファイル名（ファイル名だけで比較）
const excludeFiles = ['service-worker.js', 'generate_offline.js'];

function walk(dirPath, basePath = '') {
  let results = [];
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const relPath = path.join(basePath, file).replace(/\\/g, '/');
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (excludeDirs.includes(file)) continue; // 除外ディレクトリ
      results = results.concat(walk(fullPath, relPath));
    } else {
      if (excludeFiles.includes(file)) continue; // 除外ファイル名
      if (exts.length === 0 || exts.includes(path.extname(file))) {
        results.push('./' + relPath);
      }
    }
  }
  return results;
}

const urls = walk(ROOT_DIR);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(urls, null, 2));
console.log(`✅ Generated ${OUTPUT_FILE} with ${urls.length} files`);