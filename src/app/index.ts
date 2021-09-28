import getElementText from '../utils/get-element-text';
import isMobile from '../utils/is-mobile';
import omitNules from '../utils/omit-nules';
import parsePlusSeparatedExpression from './parse-expression';
import keys from '../constants/keys';
import error from '../constants/error';

class Calc {
	private input: HTMLDivElement;

	private inputOut: HTMLDivElement;

	private hiddenInput: HTMLInputElement;

	private expression: string;

	constructor() {
		this.input = document.querySelector('.calc__input_in') as HTMLDivElement;
		this.inputOut = document.querySelector('.calc__input_out') as HTMLDivElement;
		this.hiddenInput = document.querySelector('.calc__hidden-input') as HTMLInputElement;
		this.expression = '';
	}

	public init(): void {
		const btns = [].slice.call(document.querySelectorAll<HTMLButtonElement>('.calc__btn'));

		console.log('init');

		btns.forEach((btn: HTMLButtonElement): void => {
			btn.addEventListener('click', (): void => this.onBtnClick(btn));
		});

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
			this.inputOut.classList.add(error.className);
			this.inputOut.textContent = error.message;
			return;
		}

		this.inputOut.classList.remove(error.className);
		this.inputOut.textContent = omitNules(result.toFixed(7));
	}

	private clear = (): void => {
		this.input.textContent = '';
		this.expression = '';
		this.inputOut.textContent = '';
	}

	private print = (text: string | null): void => {
		if (text !== null) {
			if (text === '*') {
				this.input.textContent += '×';
			} else if (text === '.') {
				this.input.textContent += ',';
			} else {
				this.input.textContent += text;
			}
		}
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
		const text: string | null = getElementText(btn);

		this.hiddenInput.focus();

		if (text === '=') {
			this.calculate();
			return;
		}

		if (text === 'C') {
			this.clear();
			return;
		}

		this.expression += text;
		this.print(text);
	}
}

export default Calc;
