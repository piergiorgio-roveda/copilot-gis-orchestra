#!/usr/bin/env node

import { readFile, readdir } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..');

const secretPatterns = [
  {
    pattern: /(?:password|passwd|pwd)\s*=\s*['"][^'"]+['"]/gi,
    name: 'hardcoded password'
  },
  {
    pattern: /(?:api[_-]?key|apikey)\s*=\s*['"][^'"]+['"]/gi,
    name: 'hardcoded API key'
  },
  {
    pattern: /(?:secret|token)\s*=\s*['"][^'"]+['"]/gi,
    name: 'hardcoded secret/token'
  },
  {
    pattern: /(?:mongodb|postgres|mysql):\/[^'"]+/gi,
    name: 'database connection string'
  },
  {
    pattern: /-----BEGIN (?:RSA |DSA )?PRIVATE KEY-----/gi,
    name: 'private key'
  },
  {
    pattern: /(?:aws_access_key_id|aws_secret_access_key)\s*=\s*.+/gi,
    name: 'AWS credentials'
  }
];

const excludeDirs = [
  'node_modules',
  '.git',
  'dist',
  'dist-prod',
  'build',
  '.vscode'
];
const excludeFiles = ['.gitkeep', 'package-lock.json', 'security-check.js'];
const includeExts = ['.js', '.mjs', '.json', '.jsonld', '.env.example', '.md'];

let errors = 0;
let warnings = 0;

async function scanDirectory(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = fullPath.replace(rootDir, '').replace(/^[\\/]/, '');

    if (entry.isDirectory()) {
      if (!excludeDirs.includes(entry.name)) {
        await scanDirectory(fullPath);
      }
    } else if (entry.isFile()) {
      if (excludeFiles.includes(entry.name)) continue;

      const ext = extname(entry.name);
      if (!includeExts.includes(ext) && entry.name !== '.env') continue;

      await scanFile(fullPath, relativePath);
    }
  }
}

async function scanFile(filePath, relativePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      for (const { pattern, name } of secretPatterns) {
        if (pattern.test(line)) {
          console.error(`[ERROR] ${name} detected in ${relativePath}:${i + 1}`);
          console.error(`  ${line.trim()}`);
          errors++;
        }
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.warn(`[WARN] Could not scan ${relativePath}: ${err.message}`);
      warnings++;
    }
  }
}

async function checkDependencies() {
  try {
    await readFile(join(rootDir, 'package.json'), 'utf-8');

    const knownVulnerable = [];

    if (knownVulnerable.length > 0) {
      console.error('[ERROR] Known vulnerable dependencies detected:');
      knownVulnerable.forEach(dep => console.error(`  - ${dep}`));
      errors += knownVulnerable.length;
    }
  } catch (err) {
    console.warn(`[WARN] Could not check dependencies: ${err.message}`);
    warnings++;
  }
}

async function main() {
  console.log('Running security checks...\n');

  await scanDirectory(rootDir);
  await checkDependencies();

  console.log(`\nSecurity scan complete.`);
  console.log(`Errors: ${errors}, Warnings: ${warnings}`);

  if (errors > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Security check failed:', err);
  process.exit(1);
});
