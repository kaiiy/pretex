"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDistFileName = exports.loadTargetDirSrcFileName = void 0;
var loadTargetDirSrcFileName = function (argv) {
    var srcFullPath = argv._[0].replace(/^\.*\//, "");
    var targetDirBuff = /.*\//.exec(srcFullPath);
    var targetDir = targetDirBuff ? targetDirBuff[0] : "";
    var srcFileName = srcFullPath.replace(targetDir, "");
    return {
        targetDir: targetDir,
        srcFileName: srcFileName,
    };
};
exports.loadTargetDirSrcFileName = loadTargetDirSrcFileName;
var loadDistFileName = function (argv) {
    if ("o" in argv)
        return String(argv["o"]).replace(/\.tex$/, "") + ".tex";
    return "out.tex";
};
exports.loadDistFileName = loadDistFileName;
//# sourceMappingURL=load-fname.js.map