export interface IToken {
    type: string;
    value?: string;
}
export declare class Token implements IToken {
    type: string;
    value?: string;
    constructor(type: string, value?: string);
}
