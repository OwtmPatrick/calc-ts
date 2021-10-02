const isNum = (v: string): boolean => !Number.isNaN(parseFloat(v)) && Number.isFinite(Number(v));

export default isNum;
