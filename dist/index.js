#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var minimist = require("minimist");
var fs = require("fs");
var load_fname_1 = require("./lib/load-fname");
// Parse Args
var argv = minimist(process.argv.slice(2));
var _a = (0, load_fname_1.loadTargetDirSrcFileName)(argv), targetDir = _a.targetDir, srcFileName = _a.srcFileName;
var distFileName = (0, load_fname_1.loadDistFileName)(argv);
var srcFilePath = targetDir + srcFileName;
var distFilePath = targetDir + distFileName;
// Read File
var srcText = fs.readFileSync(srcFilePath, { encoding: "utf-8" });
var srcTextLines = srcText.split("\n");
// Replace
var beginDocReg = /\\begin\{\s*document\s*\}/;
var startIdx = srcTextLines.findIndex(function (e) { return beginDocReg.test(e); });
var endDocReg = /\\end\{\s*document\s*\}/;
var endIdx = srcTextLines.findIndex(function (e) { return endDocReg.test(e); });
var ignoreFlag = false;
var replacedTextLines = srcTextLines.map(function (e, idx) {
    if (startIdx < idx && idx < endIdx) {
        var commentReg = /^\s*%/;
        var commandReg = /^\s*\\/;
        var commandBeginReg = /^\s*\\begin\{.+\}/;
        var commandEndReg = /^\s*\\end\{.+\}/;
        if (!(commentReg.test(e) || commandReg.test(e) || ignoreFlag))
            return e.replace(/(,|、)( |　)*/g, "，").replace(/(\.|。)( |　)*/g, "．");
        else if (commandBeginReg.test(e))
            ignoreFlag = true;
        else if (commandEndReg.test(e))
            ignoreFlag = false;
    }
    return e;
});
// Write File
var distText = replacedTextLines.join("\n");
fs.writeFileSync(distFilePath, distText, { encoding: "utf-8" });
//# sourceMappingURL=index.js.map