export default function omitNules(str: string): string {
	const lastChar = str[str.length - 1];
	const preLastChar = str[str.length - 2];

	if (lastChar === '0' && preLastChar === '.') {
		const newStr = str.substring(0, str.length - 2);

		return omitNules(newStr);
	}

	if (lastChar === '0' && preLastChar !== '.') {
		const newStr = str.substring(0, str.length - 1);

		return omitNules(newStr);
	}

	return str;
}
