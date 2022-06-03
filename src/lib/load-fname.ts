import * as minimist from "minimist";

const loadTargetDirSrcFileName = (argv: minimist.ParsedArgs) => {
  const srcFullPath = argv._[0].replace(/^\.*\//, "");
  const targetDirBuff = /.*\//.exec(srcFullPath);
  const targetDir = targetDirBuff ? targetDirBuff[0] : "";
  const srcFileName = srcFullPath.replace(targetDir, "");
  return {
    targetDir,
    srcFileName,
  };
};

const loadDistFileName = (argv: minimist.ParsedArgs) => {
  if ("o" in argv) return String(argv["o"]).replace(/\.tex$/, "") + ".tex";
  return "out.tex";
};

export { loadTargetDirSrcFileName, loadDistFileName };
