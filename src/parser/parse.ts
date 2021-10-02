import {IToken} from './Token';
import {IASTNode, ASTNode} from './ASTNode';
import precedence from '../constants/precedence';

import tokenize from './tokenize';

function prec(token: IToken) {
	if (token.value === '+' || token.value === '-' || token.value === '*' || token.value === '/') {
		return precedence[token.value];
	}

	return 1;
}

function peek(arr: IToken[]): IToken {
	return arr.slice(-1)[0];
}

function addNode(arr: IASTNode[], token: IToken | undefined): void {
	const left = arr.pop() || null;
	const right = arr.pop() || null;

	arr.push(new ASTNode(token, right, left));
}

function parse(expression: string): IASTNode | undefined {
	const outStack: IASTNode[] = [];
	const opStack: IToken[] = [];
	const tokens: IToken[] = tokenize(expression);

	tokens.forEach((v: IToken): void => {
		if (v.type === 'NUM') {
			outStack.push(new ASTNode(v, null, null));
		} else if (v.type === 'OP') {
			while (peek(opStack) && peek(opStack).type === 'OP' && prec(v) <= prec(peek(opStack))) {
				addNode(outStack, opStack.pop());
			}
			opStack.push(v);
		} else if (v.type === 'LPAREN') {
			opStack.push(v);
		} else if (v.type === 'RPAREN') {
			while (peek(opStack) && peek(opStack).type !== 'LPAREN') {
				addNode(outStack, opStack.pop());
			}

			opStack.pop();
		}
	});

	while (peek(opStack)) {
		addNode(outStack, opStack.pop());
	}

	return outStack.pop();
}

export default parse;
