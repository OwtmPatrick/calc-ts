import {IToken, Token} from './Token';
import isNum from '../utils/is-num';
import isOperator from '../utils/is-operator';

const tokenize = (str: string): IToken[] => {
	const tokens = [];

	let s = '';

	for (let index = 0; index < str.length; index++) {
		s += str[index];
		const peek = str[index + 1];

		// if first number is negative
		if (index === 0 && s === '-') {
			tokens.push(new Token('NUM', '0'));
			tokens.push(new Token('OP', s));
			s = '';
		}

		if (isNum(s) && !isNum(peek)) {
			tokens.push(new Token('NUM', s));
			s = '';
		}

		if (s === '(' || s === ')') {
			tokens.push(new Token(s === '(' ? 'LPAREN' : 'RPAREN', s === '(' ? '(' : ')'));
			s = '';
		}

		if (isOperator(s) && !isOperator(peek)) {
			tokens.push(new Token('OP', s));
			s = '';
		}
	}

	return tokens;
};

export default tokenize;
