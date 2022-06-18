"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceCommaPeriod = void 0;
const replaceCommaPeriod = (str) => {
    return str.replace(/(,|、)( |　)*/g, '，').replace(/(\.|。)( |　)*/g, '．');
};
exports.replaceCommaPeriod = replaceCommaPeriod;
//# sourceMappingURL=parse-line.js.map