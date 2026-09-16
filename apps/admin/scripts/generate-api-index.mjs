import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const generatedDir = path.resolve('src/api/generated');
const apiDir = path.resolve('src/api');

const files = await readdir(generatedDir);

const exports = files
  .filter((file) => file.endsWith('.ts'))
  .filter((file) => file !== 'index.ts')
  .sort()
  .map((file) => `export * from './generated/${file.replace('.ts', '')}';`)
  .join('\n');

await writeFile(path.join(apiDir, 'index.ts'), `${exports}\n`);

console.log('Generated api/index.ts');
