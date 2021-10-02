import { IToken } from './Token';
export interface IASTNode {
    token: string | undefined;
    left: IASTNode | null;
    right: IASTNode | null;
}
export declare class ASTNode implements IASTNode {
    token: string | undefined;
    left: IASTNode | null;
    right: IASTNode | null;
    constructor(token: IToken | undefined, left: IASTNode | null, right: IASTNode | null);
}
