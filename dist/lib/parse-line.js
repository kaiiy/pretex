"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceCommaPeriod = void 0;
const replaceCommaPeriod = (str) => {
    return str
        .replace(/(,|、)( |　)*/g, '，')
        .replace(/(\W)(\.|。)( |　)*/g, '$1．');
};
exports.replaceCommaPeriod = replaceCommaPeriod;
//# sourceMappingURL=parse-line.js.map