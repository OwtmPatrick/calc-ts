export {};

const replaceCharinExpression = (
	expression: string,
	initialChar: string,
	replacedChar: string
): string => expression.split(initialChar).join(replacedChar);

let split = (expression: string, operator: string) => {
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

const parseDivisionSeparatedExpression = (expression: string): any => {
	const numbersString = split(expression, '/');
	const numbers = numbersString.map(noStr => {
		if (noStr[0] === '(') {
			const expr = noStr.substr(1, noStr.length - 2);
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

const parseMultiplicationSeparatedExpression = (expression: string): any => {
	const numbersString = split(replaceCharinExpression(expression, '×', '*'), '*');
	const numbersDivision = numbersString.map(noStr => parseDivisionSeparatedExpression(noStr));
	const numbers = numbersDivision.map(noStr => {
		if (noStr[0] === '(') {
			const expr = noStr.substr(1, noStr.length - 2);

			return parsePlusSeparatedExpression(expr);
		}

		return +noStr;
	});

	const initialValue = 1.0;
	const result = numbers.reduce((acc, no) => acc * no, initialValue);

	return result;
};

const parseMinusSeparatedExpression = (expression: string) => {
	const numbersString = split(expression, '-');
	const numbers = numbersString.map(noStr => parseMultiplicationSeparatedExpression(noStr));
	const initialValue = numbers[0];
	const result = numbers.slice(1).reduce((acc, no) => acc - no, initialValue);

	return result;
};

const parsePlusSeparatedExpression = (expression: string) => {
	const numbersString = split(expression, '+');
	const numbers = numbersString.map(noStr => parseMinusSeparatedExpression(noStr));
	const initialValue = 0.0;
	const result = numbers.reduce((acc, no) => acc + no, initialValue);

	return result;
};

const btns = [].slice.call(document.querySelectorAll<HTMLButtonElement>('.calc__btn'));
const resultBtn = document.querySelector('.calc__btn_result') as HTMLButtonElement;
const inputIn = document.querySelector('.calc__input_in') as HTMLDivElement;
const inputOut = document.querySelector('.calc__input_out') as HTMLDivElement;

const getBtntext = (button: any): string => button.textContent;

const parse = (): void => {
	const expression = replaceCharinExpression(getBtntext(inputIn), ',', '.');
	const result = parsePlusSeparatedExpression(expression);

	inputOut.textContent = result;
};

btns.forEach((btn: HTMLButtonElement): void => {
	btn.addEventListener('click', (): void => {
		const text: string = getBtntext(btn);

		if (text === '=') {
			return;
		}

		if (text === 'C') {
			inputIn.textContent = '';
			return;
		}

		inputIn.textContent += text;
	});
});

resultBtn.addEventListener('click', parse);
