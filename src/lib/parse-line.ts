export const replaceCommaPeriod = (str: string) => {
  return str
    .replace(/(,|、)( |　)*/g, '，')
    .replace(/(\W)(\.|。)( |　)*/g, '$1．');
};
