const operators = ['=', '+', '-', '*', '/', '>', '<', '>=', '<=', '==', '!='];

const isOp = (v: string): boolean => {
	for (let i = 0; i < operators.length; i++) {
		if (operators[i] === v) return true;
	}
	return false;
};

export default isOp;
