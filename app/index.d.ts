declare class Calc {
    private input;
    private inputOut;
    private hiddenInput;
    private expression;
    constructor();
    init(): void;
    private calculate;
    private clear;
    private print;
    private onKeyDown;
    private onBtnClick;
}
export default Calc;
