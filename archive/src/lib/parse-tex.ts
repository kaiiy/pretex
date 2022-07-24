const replaceCommaPeriod = (str: string) => {
  return str
    .replace(/(,|、)( |　)*/g, '，')
    .replace(/(\W)(\.|。)( |　)*/g, '$1．');
};

export const parseTexStr = (texStr: string) => {
  const srcTextLines = texStr.split('\n');

  // Replace
  const beginDocReg = /\\begin\{\s*document\s*\}/;
  const startIdx = srcTextLines.findIndex((e) => beginDocReg.test(e));

  const endDocReg = /\\end\{\s*document\s*\}/;
  const endIdx = srcTextLines.findIndex((e) => endDocReg.test(e));

  let isInCommandBlock = false;
  let isInItemize = false;
  let isInEnumerate = false;
  let isInFigureOrTable = false;

  const replacedTextLines = srcTextLines.map((e, idx) => {
    // in rule 1 (in document block)
    if (startIdx < idx && idx < endIdx) {
      // rule 2 (comment line)
      const commentReg = /^\s*%/;
      if (commentReg.test(e)) return e;

      // rule 3 (cite)
      const citeReg = /^(\s)*\\cite\{.+\}/;
      if (citeReg.test(e)) return replaceCommaPeriod(e);

      // rule 4 (command block)
      // itemize
      const itemizeBeginReg = /^\\begin\{itemize\}/;
      const itemizeEndReg = /^\\end\{itemize\}/;
      if (itemizeBeginReg.test(e)) {
        isInItemize = true;
        return e;
      } else if (itemizeEndReg.test(e)) {
        isInItemize = false;
        return e;
      } else if (isInItemize) return replaceCommaPeriod(e);

      // enumerate
      const enumerateBeginReg = /^\\begin\{enumerate\}/;
      const enumerateEndReg = /^\\end\{enumerate\}/;
      if (enumerateBeginReg.test(e)) {
        isInEnumerate = true;
        return replaceCommaPeriod(e);
      } else if (enumerateEndReg.test(e)) {
        isInEnumerate = false;
        return e;
      } else if (isInEnumerate) return replaceCommaPeriod(e);

      // caption (rule 3)
      const figureBeginReg = /^\\begin\{figure.*\}/;
      const figureEndReg = /^\\end\{figure.*\}/;
      const tableBeginReg = /^\\begin\{table.*\}/;
      const tableEndReg = /^\\end\{table.*\}/;
      if (figureBeginReg.test(e) || tableBeginReg.test(e)) {
        isInFigureOrTable = true;
        return e;
      } else if (figureEndReg.test(e) || tableEndReg.test(e)) {
        isInFigureOrTable = false;
        return e;
      } else if (isInFigureOrTable) {
        const captionReg = /^(\s)*\\caption\{.+\}/;
        if (captionReg.test(e)) return replaceCommaPeriod(e);
        return e;
      }

      // ignore
      const commandBlockBeginReg = /^\\begin\{.+\}/;
      const commandBlockEndReg = /^\\end\{.+\}/;
      if (commandBlockBeginReg.test(e)) {
        isInCommandBlock = true;
        return e;
      } else if (commandBlockEndReg.test(e)) {
        isInCommandBlock = false;
        return e;
      } else if (isInCommandBlock) return e;

      // rule 3 (command line)
      const commandReg = /^\\/;
      if (commandReg.test(e)) return e;

      return replaceCommaPeriod(e);
    }

    return e;
  });

  const distText = replacedTextLines.join('\n');

  return distText;
};
