export {};
import replaceCharInExpression from '../utils/replace-char-in-expression';
import getElementText from '../utils/get-element-text';

import keys from '../constants/keys';

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
const hiddenInput = document.querySelector('.calc__hidden-input') as HTMLInputElement;

const parse = (): void => {
	const expression = replaceCharInExpression(getElementText(inputIn), ',', '.');

	if (!expression) {
		return;
	}

	const result = parsePlusSeparatedExpression(expression);

	inputOut.textContent = result;
};

const onKeyDown = (event: KeyboardEvent): void => {
	const {key} = event;

	if (keys.find((k: string) => k === key)) {
		if (key === 'Enter') {
			parse();
			return;
		}

		if (key === '*') {
			inputIn.textContent += '×';
			return;
		}

		inputIn.textContent += key;
	}
};

btns.forEach((btn: HTMLButtonElement): void => {
	btn.addEventListener('click', (): void => {
		const text: string = getElementText(btn);

		if (text === '=') {
			hiddenInput.focus();
			return;
		}

		if (text === 'C') {
			inputIn.textContent = '';
			hiddenInput.focus();
			return;
		}

		inputIn.textContent += text;
		hiddenInput.focus();
	});
});

resultBtn.addEventListener('click', parse);
hiddenInput.addEventListener('keydown', onKeyDown);

window.addEventListener('load', (): void => hiddenInput.focus());

document.addEventListener('click', (): void => hiddenInput.focus());
