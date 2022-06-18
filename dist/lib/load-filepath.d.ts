import * as minimist from 'minimist';
declare const loadFilepath: (argv: minimist.ParsedArgs) => {
    srcFilePath: string;
    distFilePath: string;
};
export { loadFilepath };
