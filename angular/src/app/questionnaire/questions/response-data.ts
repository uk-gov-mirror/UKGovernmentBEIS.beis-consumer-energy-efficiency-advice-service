import {Injectable} from "@angular/core";
import {HomeType} from "./home-type-question/home-type";
import {FuelType} from "./fuel-type-question/fuel-type";
import {FlatPosition} from "./flat-position-question/flat-position";

@Injectable()
export class ResponseData {
    private _postCode: string;
    private _homeType: HomeType;
    private _flatPosition: FlatPosition;
    private _numberOfStoreys: number;
    private _numberOfBedrooms: number;
    private _fuelType: FuelType;

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

    get flatPosition(): FlatPosition {
        return this._flatPosition;
    }

    set flatPosition(val: FlatPosition) {
        this._flatPosition = val;
    }

    get numberOfStoreys(): number {
        return this._numberOfStoreys;
    }

    set numberOfStoreys(val: number) {
        this._numberOfStoreys = val;
    }

    get numberOfBedrooms(): number {
        return this._numberOfBedrooms;
    }

    set numberOfBedrooms(val: number) {
        this._numberOfBedrooms = val;
    }

    get fuelType(): FuelType {
        return this._fuelType;
    }

    set fuelType(value: FuelType) {
        this._fuelType = value;
    }
}