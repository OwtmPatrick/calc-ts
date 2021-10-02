export interface IToken {
	type: string;
	value?: string;
}

export class Token implements IToken {
	type: string;

	value?: string;

	constructor(type: string, value?: string) {
		this.type = type;
		this.value = value;
	}
}
