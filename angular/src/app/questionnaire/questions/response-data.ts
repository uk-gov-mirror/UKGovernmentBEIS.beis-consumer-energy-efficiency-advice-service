export class ResponseData {
    private _dummy1: number;
    private _dummy2: number;
    private _dummy3: number;

    get dummy1(): number {
        return this._dummy1;
    }

    get dummy2(): number {
        return this._dummy2;
    }

    get dummy3(): number {
        return this._dummy3;
    }

    set dummy1(val: number) {
        this._dummy1 = val;
    }

    set dummy2(val: number) {
        this._dummy2 = val;
    }

    set dummy3(val: number) {
        this._dummy3 = val;
    }
}