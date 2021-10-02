import {IToken} from './Token';

export interface IASTNode {
	token: string | undefined;
	left: IASTNode | null;
	right: IASTNode | null;
}

export class ASTNode implements IASTNode {
	token: string | undefined;

	left: IASTNode | null;

	right: IASTNode | null;

	constructor(token: IToken | undefined, left: IASTNode | null, right: IASTNode | null) {
		this.token = token ? token.value : undefined;
		this.left = left;
		this.right = right;
	}
}
