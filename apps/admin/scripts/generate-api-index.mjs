import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const apiDir = path.resolve('src/api');

const apiSections = ['auth', 'query'];
const files = await getFilesFromPath(apiSections.map((section) => `src/api/generated/${section}`));

const apiExports = files
  .filter((file) => file.endsWith('.ts'))
  .filter((file) => !file.endsWith('index.ts'))
  .sort()
  .map((file) => `export * from './${file.replace('.ts', '')}';`);

const modelExports = apiSections.map((section) => {
  const namespace = `${section[0].toUpperCase()}${section.slice(1)}Models`;
  return `export * as ${namespace} from './generated/${section}/model';`;
});

const exports = [...apiExports, ...modelExports].sort().join('\n');

await writeFile(path.join(apiDir, 'index.ts'), `${exports}\n`);

console.log('Generated api/index.ts');

async function getFilesFromPath(folderPaths) {
  const folders = (Array.isArray(folderPaths) ? folderPaths : [folderPaths]).filter(
    (item) => typeof item === 'string',
  );

  const fileArrays = await Promise.all(
    folders.map(async (folder) => {
      const files = await readdir(path.resolve(folder));

      return files.map((file) =>
        path.relative('src/api', path.join(folder, file)).replaceAll('\\', '/'),
      );
    }),
  );

  return fileArrays.flat();
}
