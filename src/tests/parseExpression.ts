import parse from '../parser/parse';
import evaluate from '../parser/evaluate';
import omitNules from '../utils/omit-nules';

test('parsing plus expresison', (): void => {
	expect(evaluate(parse('37+25'))).toBe(62);
});

test('parsing minus expresison', () => {
	expect(evaluate(parse('37-25'))).toBe(12);
});

test('parsing multiplication expresison', () => {
	expect(evaluate(parse('37*25'))).toBe(925);
});

test('parsing expression with brackets', () => {
	expect(evaluate(parse('(12+4)*21-2*(16/4)'))).toBe(328);
});

test('should return the same value if there are not nulls', () => {
	expect(omitNules('54.1245')).toBe('54.1245');
});

test('should remove all the null before dot', () => {
	expect(omitNules('54.124500000000')).toBe('54.1245');
});

test('should not remove null directly before dot', () => {
	expect(omitNules('54.0')).toBe('54');
});
