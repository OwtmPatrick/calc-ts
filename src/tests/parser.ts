import parse from '../parser/parse';
import evaluate from '../parser/evaluate';
import omitNules from '../utils/omit-nules';
import tokenize from '../parser/tokenize';
import {Token} from '../parser/Token';
import {ASTNode} from '../parser/ASTNode';

test('tokenize function should return array', (): void => {
	expect(tokenize('(10+(25*58))6.08')).toBeInstanceOf(Array);
});

test('and array item should be token instance', (): void => {
	expect(tokenize('(10+(25*58))6.08')[0]).toBeInstanceOf(Token);
});

test('should parse expression to valid ASTNode', (): void => {
	expect(parse('(10+(25*58))6.08')).toBeInstanceOf(ASTNode);
});

test('should correct evaluate plus operation', (): void => {
	expect(evaluate(parse('37+25'))).toBe(62);
});

test('should correct evaluate minus operation', () => {
	expect(evaluate(parse('37-25'))).toBe(12);
});

test('should correct evaluate multiplication operation', () => {
	expect(evaluate(parse('37*25'))).toBe(925);
});

test('should correct evaluate dividing operation', () => {
	expect(evaluate(parse('64/8'))).toBe(8);
});

test('should evaluate expression with brackets', () => {
	expect(evaluate(parse('(12+4)*21*2*((16-4)+5)'))).toBe(11424);
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
