import parsePlusSeparatedExpression from '../app/parse-expression';

test('parsing plus expresison', () => {
	expect(parsePlusSeparatedExpression('37+25')).toBe(62);
});

test('parsing minus expresison', () => {
	expect(parsePlusSeparatedExpression('37-25')).toBe(12);
});

test('parsing multiplication expresison', () => {
	expect(parsePlusSeparatedExpression('37*25')).toBe(925);
});

test('parsing expression with brackets', () => {
	expect(parsePlusSeparatedExpression('(12+4)*21-2*(16/4)')).toBe(328);
});
