import getElementText from '../utils/get-element-text';
import isMobile from '../utils/is-mobile';
import omitNules from '../utils/omit-nules';

import parsePlusSeparatedExpression from './parse-expression';

import keys from '../constants/keys';

class Calc {
	private input: HTMLDivElement;

	private inputOut: HTMLDivElement;

	private btns: Array<HTMLButtonElement>;

	private hiddenInput: HTMLInputElement;

	private expression: string;

	constructor() {
		this.input = document.querySelector('.calc__input_in') as HTMLDivElement;
		this.inputOut = document.querySelector('.calc__input_out') as HTMLDivElement;
		this.btns = [].slice.call(document.querySelectorAll<HTMLButtonElement>('.calc__btn'));
		this.hiddenInput = document.querySelector('.calc__hidden-input') as HTMLInputElement;
		this.expression = '';
	}

	public init(): void {
		const calcBtn = document.querySelector('.calc__btn_result') as HTMLButtonElement;

		this.btns.forEach((btn: HTMLButtonElement): void => {
			btn.addEventListener('click', (): void => this.onBtnClick(btn));
		});

		calcBtn.addEventListener('click', this.calculate);
		this.hiddenInput.addEventListener('keydown', this.onKeyDown);
		window.addEventListener('load', (): void => {
			if (!isMobile()) {
				this.hiddenInput.focus();
			}
		});

		document.addEventListener('click', (): void => this.hiddenInput.focus());
	}

	private calculate = (): void => {
		const {expression} = this;

		if (!expression) {
			return;
		}

		const result = parsePlusSeparatedExpression(expression);
		const isError: boolean = window.isNaN(result) || result === Infinity || result === -Infinity;

		if (isError) {
			this.inputOut.classList.add('calc__input_error');
			this.inputOut.textContent = 'Please enter the correct expression';
			return;
		}

		this.inputOut.classList.remove('calc__input_error');
		this.inputOut.textContent = omitNules(result.toFixed(7));
	}

	private onKeyDown = (event: KeyboardEvent): void => {
		const {key} = event;

		if (keys.find((k: string) => k === key)) {
			if (key === 'Enter') {
				this.calculate();
				return;
			}

			this.expression += key;
			this.print(key);
		}
	};

	private onBtnClick = (btn: HTMLButtonElement): void => {
		const text: string = getElementText(btn);

		this.hiddenInput.focus();

		if (text === '=') {
			return;
		}

		if (text === 'C') {
			this.clear();
			return;
		}

		this.expression += text;
		this.print(text);
	}

	private clear = (): void => {
		this.input.textContent = '';
		this.expression = '';
		this.inputOut.textContent = '';
	}

	private print = (text: string): void => {
		if (text === '*') {
			this.input.textContent += '×';
		} else if (text === '.') {
			this.input.textContent += ',';
		} else {
			this.input.textContent += text;
		}
	}
}

export default Calc;
