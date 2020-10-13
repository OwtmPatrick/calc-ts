import replaceCharInExpression from '../utils/replace-char-in-expression';
import getElementText from '../utils/get-element-text';
import isMobile from '../utils/is-mobile';
import omitNules from '../utils/omit-nules';

import parsePlusSeparatedExpression from './parse-expression';

import keys from '../constants/keys';

class Calc {
	public input: HTMLDivElement;

	public inputOut: HTMLDivElement;

	public btns: Array<HTMLButtonElement>;

	private hiddenInput: HTMLInputElement;

	constructor() {
		this.input = document.querySelector('.calc__input_in') as HTMLDivElement;
		this.inputOut = document.querySelector('.calc__input_out') as HTMLDivElement;
		this.btns = [].slice.call(document.querySelectorAll<HTMLButtonElement>('.calc__btn'));
		this.hiddenInput = document.querySelector('.calc__hidden-input') as HTMLInputElement;
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
		const expression = replaceCharInExpression(getElementText(this.input), ',', '.');

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

			if (key === '*') {
				this.input.textContent += '×';
				return;
			}

			this.input.textContent += key;
		}
	};

	private onBtnClick = (btn: HTMLButtonElement): void => {
		const text: string = getElementText(btn);

		if (text === '=') {
			this.hiddenInput.focus();
			return;
		}

		if (text === 'C') {
			this.input.textContent = '';
			this.inputOut.textContent = '';
			this.hiddenInput.focus();
			return;
		}

		this.input.textContent += text;
		this.hiddenInput.focus();
	}
}

export default Calc;
