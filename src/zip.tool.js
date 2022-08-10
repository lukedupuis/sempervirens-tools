import archiver from 'archiver';
import { createWriteStream, lstatSync } from 'fs';
import { globby } from 'globby';

function zip({
  outputPath = '',
  srcPaths = [],
  srcGlobs = []
}) {
  return new Promise(async resolve => {

    const output = createWriteStream(outputPath);
    output.on('close', resolve);

    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.on('error', error => log.error(201974, error));
    archive.pipe(output);

    srcPaths.length > 0 && srcPaths.filter(Boolean).forEach(path => {
      let inPath = path;
      let outPath = path;
      if (typeof path == 'object') {
        inPath = path.in;
        outPath = path.out;
      }
      const stats = lstatSync(inPath);
      if (stats.isDirectory()) {
        archive.directory(inPath, outPath);
      } else if (stats.isFile()) {
        archive.file(inPath, { name: outPath });
      }
    });
    srcGlobs.length > 0 && (await globby(srcGlobs.filter(Boolean)))
      .forEach(path => archive.file(path));

    archive.finalize();

  });
}

export default zip;