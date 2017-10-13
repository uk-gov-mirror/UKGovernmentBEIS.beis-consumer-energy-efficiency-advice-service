import {Injectable} from "@angular/core";
import {HomeType} from "./home-type-question/home-type";
import {FuelType} from "./fuel-type-question/fuel-type";
import {FlatPosition} from "./flat-position-question/flat-position";
import {ElectricityTariff} from "./electricity-tariff-question/electricity-tariff";
import {HomeAge} from './home-age-question/home-age';

@Injectable()
export class ResponseData {
    private _postCode: string;
    private _homeType: HomeType;
    private _homeAge: HomeAge;
    private _flatPosition: FlatPosition;
    private _numberOfStoreys: number;
    private _fuelType: FuelType;
    private _condensingBoiler: boolean;
    private _electricityTariff: ElectricityTariff;

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

    get fuelType(): FuelType {
        return this._fuelType;
    }

    set fuelType(value: FuelType) {
        this._fuelType = value;
    }

    get condensingBoiler(): boolean {
        return this._condensingBoiler;
    }

    set condensingBoiler(val: boolean) {
        this._condensingBoiler = val;
    }

    get electricityTariff(): ElectricityTariff {
        return this._electricityTariff;
    }

    set electricityTariff(val: ElectricityTariff) {
        this._electricityTariff = val;
    }

    get homeAge(): HomeAge {
        return this._homeAge;
    }

    set homeAge(value: HomeAge) {
        this._homeAge = value;
    }
}