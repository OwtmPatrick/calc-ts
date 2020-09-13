export default (expression: string, initialChar: string, replacedChar: string): string => expression.split(initialChar).join(replacedChar);
