import isNum from './is-num';
import isOperator from './is-operator';

interface token {
	value?: string;
	type: string;
}

const tokenize = (str: string): token[] => {
	const tokens = [];

	str = str.trim();
	let s = '';

	for (let index = 0; index < str.length; index++) {
		s += str[index];
		const peek = str[index + 1];

		if (isNum(s.trim()) && !isNum(peek)) {
			tokens.push({type: 'NUM', value: s.trim()});
			s = '';
		}

		if (s.trim() === '(' || s.trim() === ')') {
			tokens.push({type: s.trim() === '(' ? 'LPAREN' : 'RPAREN'});
			s = '';
		}

		if (isOperator(s.trim()) && !isOperator(peek)) {
			tokens.push({type: 'OP', value: s.trim()});
			s = '';
		}

		if (index === str.length - 1) {
			tokens.push({type: 'EOF'});
		}
	}

	return tokens;
};

export default tokenize;
