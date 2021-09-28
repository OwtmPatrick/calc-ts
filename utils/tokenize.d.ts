interface token {
    value?: string;
    type: string;
}
declare const tokenize: (str: string) => token[];
export default tokenize;
