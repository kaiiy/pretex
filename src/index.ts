#!/usr/bin/env node

import * as minimist from "minimist";
import * as fs from "fs";
import { loadTargetDirSrcFileName, loadDistFileName } from "./lib/load-fname";

// Parse Args
const argv = minimist(process.argv.slice(2));

const { targetDir, srcFileName } = loadTargetDirSrcFileName(argv);
const distFileName = loadDistFileName(argv);

const srcFilePath = targetDir + srcFileName;
const distFilePath = targetDir + distFileName;

// Read File
const srcText = fs.readFileSync(srcFilePath, { encoding: "utf-8" });

const srcTextLines = srcText.split("\n");

// Replace
const beginDocReg = /\\begin\{\s*document\s*\}/;
const startIdx = srcTextLines.findIndex((e) => beginDocReg.test(e));

const endDocReg = /\\end\{\s*document\s*\}/;
const endIdx = srcTextLines.findIndex((e) => endDocReg.test(e));

let ignoreFlag = false;

const replacedTextLines = srcTextLines.map((e, idx) => {
  if (startIdx < idx && idx < endIdx) {
    const commentReg = /^\s*%/;
    const commandReg = /^\s*\\/;
    const commandBeginReg = /^\s*\\begin\{.+\}/;
    const commandEndReg = /^\s*\\end\{.+\}/;
    if (!(commentReg.test(e) || commandReg.test(e) || ignoreFlag))
      return e.replace(/(,|、)( |　)*/g, "，").replace(/(\.|。)( |　)*/g, "．");
    else if (commandBeginReg.test(e)) ignoreFlag = true;
    else if (commandEndReg.test(e)) ignoreFlag = false;
  }
  return e;
});

// Write File
const distText = replacedTextLines.join("\n");

fs.writeFileSync(distFilePath, distText, { encoding: "utf-8" });
