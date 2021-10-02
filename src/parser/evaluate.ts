import {IASTNode} from './ASTNode';

function evaluate(tree: IASTNode | undefined): number {
	if (tree) {
		const {token, left, right} = tree;

		if (!left && !right) {
			return Number(token);
		}

		if (left && right) {
			if (token === '+') {
				return evaluate(left) + evaluate(right);
			}

			if (token === '-') {
				return evaluate(left) - evaluate(right);
			}

			if (token === '*') {
				return evaluate(left) * evaluate(right);
			}

			if (token === '/') {
				return evaluate(left) / evaluate(right);
			}
		}

		return NaN;
	}

	return NaN;
}

export default evaluate;
