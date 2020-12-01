import Binary from './ast/binary';
import Literal from './ast/literal';
import Grouping from './ast/grouping';

import tokenize from '../utils/tokenize';

interface token {
	value?: string;
	type: string;
}

const {log} = console;

/**
 * Using Recursive Descent algorithm
 *
 */
class Parser {
	index: number;

	tokens: token[];

	expr: [];

	constructor() {
		this.index = 0;
		this.tokens = [];
		this.expr = [];
	}

	advance(): void {
		this.index++;
	}

	current(): token {
		return this.tokens[this.index];
	}

	parse(str: string): [] {
		const tokens = tokenize(str);

		this.tokens = tokens;

		while (this.current().type !== 'EOF') {
			const expr = this.add();

			if (expr) {
				this.expr.push(expr);
			}
		}
		// log(this.expr)
		return this.expr;
	}

	add(): any {
		const left = this.sub();

		// log('in add(): ', left)
		// log(': ', this.current())
		if (this.current().value === '+') {
			this.advance();
			return new Binary(left, 'ADD', this.sub());
		}
		return left;
	}

	sub(): any {
		const left = this.mul();

		if (this.current().value === '-') {
			this.advance();
			return new Binary(left, 'SUB', this.mul());
		}
		return left;
	}

	mul(): any {
		const left = this.primary();

		if (this.current().value === '*') {
			this.advance();
			return new Binary(left, 'MUL', this.primary());
		}
		return left;
	}

	primary(): any {
		const curr = this.current();

		this.advance();
		if (curr.type === 'NUM') {
			if (curr.value) {
				return new Literal(curr.value);
			}
		}

		if (curr.type === 'LPAREN') {
			const expr = this.add();

			this.advance();
			return new Grouping(expr);
		}
	}
}

export default Parser;
