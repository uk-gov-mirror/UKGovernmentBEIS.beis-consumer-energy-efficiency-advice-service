import {Injectable} from "@angular/core";
import {HomeType} from "./home-type-question/home-type";

@Injectable()
export class ResponseData {
    private _postCode: string;
    private _homeType: HomeType;

    get postCode(): string {
        return this._postCode;
    }

    set postCode(val: string) {
        this._postCode = val;
    }

    get homeType(): HomeType {
        return this._homeType;
    }

    set homeType(val: HomeType) {
        this._homeType = val;
    }
}