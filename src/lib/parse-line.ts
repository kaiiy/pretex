export const replaceCommaPeriod = (str: string) => {
  return str.replace(/(,|、)( |　)*/g, '，').replace(/(\.|。)( |　)*/g, '．');
};
