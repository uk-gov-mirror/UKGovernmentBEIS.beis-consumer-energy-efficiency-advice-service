import {Injectable} from "@angular/core";
import {HomeType} from "../questions/home-type-question/home-type";
import {FuelType} from "../questions/fuel-type-question/fuel-type";
import {FlatPosition} from "../questions/flat-position-question/flat-position";
import {ElectricityTariff} from "../questions/electricity-tariff-question/electricity-tariff";
import {HomeAge} from '../questions/home-age-question/home-age';
import {Epc} from '../questions/postcode-epc-question/model/epc';

@Injectable()
export class ResponseData {
    private _postcode: string;
    private _epc: Epc;
    private _homeType: string;
    private _homeAge: string;
    private _flatPosition: string;
    private _numberOfStoreys: number;
    private _numberOfBedrooms: number;
    private _fuelType: string;
    private _condensingBoiler: boolean;
    private _electricityTariff: string;

    get postcode(): string {
        return this._postcode;
    }

    set postcode(val: string) {
        this._postcode = val;
    }

    get epc(): Epc {
        return this._epc;
    }

    set epc(value: Epc) {
        this._epc = value;
    }

    get homeType(): HomeType {
        return HomeType[this._homeType];
    }

    set homeType(val: HomeType) {
        this._homeType = HomeType[val];
    }

    get flatPosition(): FlatPosition {
        return FlatPosition[this._flatPosition];
    }

    set flatPosition(val: FlatPosition) {
        this._flatPosition = FlatPosition[val];
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
        return FuelType[this._fuelType];
    }

    set fuelType(value: FuelType) {
        this._fuelType = FuelType[value];
    }

    get condensingBoiler(): boolean {
        return this._condensingBoiler;
    }

    set condensingBoiler(val: boolean) {
        this._condensingBoiler = val;
    }

    get electricityTariff(): ElectricityTariff {
        return ElectricityTariff[this._electricityTariff];
    }

    set electricityTariff(val: ElectricityTariff) {
        this._electricityTariff = ElectricityTariff[val];
    }

    get homeAge(): HomeAge {
        return HomeAge[this._homeAge];
    }

    set homeAge(value: HomeAge) {
        this._homeAge = HomeAge[value];
    }
}