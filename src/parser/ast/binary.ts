class Binary {
	left: number;

	operator: string;

	right: number;

	constructor(left: number, operator: string, right: number) {
		this.left = left;
		this.right = right;
		this.operator = operator;
	}
}

export default Binary;
