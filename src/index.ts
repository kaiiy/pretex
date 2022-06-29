#!/usr/bin/env node

import * as minimist from 'minimist';
import * as fs from 'fs';
import { loadFilepath } from './lib/load-filepath';
import { parseTexStr } from './lib/parse-tex';

// Parse Args
const argv = minimist(process.argv.slice(2));

const { srcFilePath, distFilePath } = loadFilepath(argv);

// Read File
const srcText = fs.readFileSync(srcFilePath, { encoding: 'utf-8' });

// Parse
const distText = parseTexStr(srcText);

// Write
fs.writeFileSync(distFilePath, distText, { encoding: 'utf-8' });
