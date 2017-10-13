import {Injectable} from "@angular/core";
import {HomeType} from "./home-type-question/home-type";

@Injectable()
export class ResponseData {
    private _homeType: HomeType;

    get homeType(): HomeType {
        return this._homeType;
    }

    set homeType(val: HomeType) {
        this._homeType = val;
    }
}