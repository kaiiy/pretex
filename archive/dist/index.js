#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const minimist = require("minimist");
const fs = require("fs");
const load_filepath_1 = require("./lib/load-filepath");
const parse_tex_1 = require("./lib/parse-tex");
// Parse Args
const argv = minimist(process.argv.slice(2));
const { srcFilePath, distFilePath } = (0, load_filepath_1.loadFilepath)(argv);
// Read File
const srcText = fs.readFileSync(srcFilePath, { encoding: 'utf-8' });
// Parse
const distText = (0, parse_tex_1.parseTexStr)(srcText);
// Write
fs.writeFileSync(distFilePath, distText, { encoding: 'utf-8' });
//# sourceMappingURL=index.js.map