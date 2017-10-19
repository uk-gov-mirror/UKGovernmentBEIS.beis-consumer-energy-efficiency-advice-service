import {Injectable} from "@angular/core";
import {Epc} from '../questions/postcode-epc-question/model/epc';
import {FuelType} from "../questions/fuel-type-question/fuel-type";
import {ElectricityTariff} from "../questions/electricity-tariff-question/electricity-tariff";
import {FlatPosition} from "../questions/flat-position-question/flat-position";
import {HomeAge} from "../questions/home-age-question/home-age";
import {HomeType} from "../questions/home-type-question/home-type";

@Injectable()
export class ResponseData {
    public postcode: string;
    public epc: Epc;
    public homeType: HomeType;
    public homeAge: HomeAge;
    public flatPosition: FlatPosition;
    public numberOfStoreys: number;
    public numberOfBedrooms: number;
    public fuelType: FuelType;
    public condensingBoiler: boolean;
    public electricityTariff: ElectricityTariff;
}
