export {};
import replaceCharInExpression from '../utils/replace-char-in-expression';
import getElementText from '../utils/get-element-text';
import isMobile from '../utils/is-mobile';

import parsePlusSeparatedExpression from './parse-expression';

import keys from '../constants/keys';

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
	const isError: boolean = window.isNaN(result) || result === Infinity || result === -Infinity;

	if (isError) {
		inputOut.classList.add('calc__input_error');
		inputOut.textContent = 'Please enter the correct expression';
		return;
	}

	inputOut.classList.remove('calc__input_error');
	inputOut.textContent = result.toFixed(7);
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
window.addEventListener('load', (): void => {
	if (!isMobile()) {
		hiddenInput.focus();
	}
});
document.addEventListener('click', (): void => hiddenInput.focus());
