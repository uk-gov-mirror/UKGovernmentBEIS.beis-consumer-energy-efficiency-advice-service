import {Injectable} from "@angular/core";
import {HomeType} from "./home-type-question/home-type";

@Injectable()
export class ResponseData {
    private _homeType: HomeType;
    private _numberOfStoreys: number;

    get homeType(): HomeType {
        return this._homeType;
    }

    set homeType(val: HomeType) {
        this._homeType = val;
    }

    get numberOfStoreys(): number {
        return this._numberOfStoreys;
    }

    set numberOfStoreys(val: number) {
        this._numberOfStoreys = val;
    }
}