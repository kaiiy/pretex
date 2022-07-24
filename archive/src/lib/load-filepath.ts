import * as minimist from 'minimist';

const loadTargetDirSrcFileName = (argv: minimist.ParsedArgs) => {
  if (argv._.length === 0) {
    console.log('[Error] Input file is missing.');
    process.on('exit', () => {
      process.exit(1);
    });
  }

  const srcFullPath = argv._[0].replace(/^\.*\//, '');
  const targetDirBuff = /.*\//.exec(srcFullPath);
  const targetDir = targetDirBuff ? targetDirBuff[0] : '';
  const srcFileName = srcFullPath.replace(targetDir, '');
  return {
    targetDir,
    srcFileName,
  };
};

const loadDistFileName = (argv: minimist.ParsedArgs) => {
  if ('o' in argv) return String(argv['o']).replace(/\.tex$/, '') + '.tex';
  return 'out.tex';
};

const loadFilepath = (argv: minimist.ParsedArgs) => {
  const { targetDir, srcFileName } = loadTargetDirSrcFileName(argv);
  const distFileName = loadDistFileName(argv);

  const srcFilePath = targetDir + srcFileName;
  const distFilePath = targetDir + distFileName;

  return {
    srcFilePath,
    distFilePath,
  };
};

export { loadFilepath };
