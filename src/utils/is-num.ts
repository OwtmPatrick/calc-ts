// eslint-disable-next-line no-restricted-globals
const isNum = (v: any): boolean => !isNaN(parseFloat(v)) && isFinite(v);

export default isNum;
