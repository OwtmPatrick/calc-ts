import replaceCharInExpression from '../utils/replace-char-in-expression';

const split = (expression: string, operator: string) => {
	const result = [];
	let braces = 0;
	let currentChunk = '';

	for (let i = 0; i < expression.length; ++i) {
		const curCh = expression[i];

		if (curCh === '(') {
			braces++;
		} else if (curCh === ')') {
			braces--;
		}
		if (braces === 0 && operator === curCh) {
			result.push(currentChunk);
			currentChunk = '';
		} else currentChunk += curCh;
	}

	if (currentChunk !== '') {
		result.push(currentChunk);
	}

	return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDivisionSeparatedExpression = (expression: string): any => {
	const numbersString = split(expression, '/');
	const numbers = numbersString.map(noStr => {
		if (noStr[0] === '(') {
			const expr = noStr.substr(1, noStr.length - 2);

			// eslint-disable-next-line no-use-before-define
			return parsePlusSeparatedExpression(expr);
		}

		return +noStr;
	});

	const initialValue = numbers[0];
	const result = numbers.reduce((acc, no, index) => {
		if (index === 0) {
			return acc;
		}

		return acc / no;
	}, initialValue);

	return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseMultiplicationSeparatedExpression = (expression: string): any => {
	const numbersString = split(replaceCharInExpression(expression, '×', '*'), '*');
	const numbersDivision = numbersString.map(noStr => parseDivisionSeparatedExpression(noStr));
	const numbers = numbersDivision.map(noStr => {
		if (noStr[0] === '(') {
			const expr = noStr.substr(1, noStr.length - 2);

			// eslint-disable-next-line no-use-before-define
			return parsePlusSeparatedExpression(expr);
		}

		return +noStr;
	});

	const initialValue = 1.0;
	const result = numbers.reduce((acc, no) => acc * no, initialValue);

	return result;
};

const parseMinusSeparatedExpression = (expression: string): any => {
	const numbersString = split(expression, '-');
	const numbers = numbersString.map(noStr => parseMultiplicationSeparatedExpression(noStr));
	const initialValue = numbers[0];
	const result = numbers.slice(1).reduce((acc, no) => acc - no, initialValue);

	return result;
};

const parsePlusSeparatedExpression = (expression: string): any => {
	const numbersString = split(expression, '+');
	const numbers = numbersString.map(noStr => parseMinusSeparatedExpression(noStr));
	const initialValue = 0.0;
	const result = numbers.reduce((acc, no) => acc + no, initialValue);

	return result;
};

export default parsePlusSeparatedExpression;

