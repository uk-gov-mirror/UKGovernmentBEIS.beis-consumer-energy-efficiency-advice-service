import {Injectable} from "@angular/core";
import {Epc} from "../../questionnaire/questions/postcode-epc-question/model/epc";
import {FuelType} from "../../questionnaire/questions/fuel-type-question/fuel-type";
import {ElectricityTariff} from "../../questionnaire/questions/electricity-tariff-question/electricity-tariff";
import {FlatPosition} from "../../questionnaire/questions/flat-position-question/flat-position";
import {HomeAge} from "../../questionnaire/questions/home-age-question/home-age";
import {HomeType} from "../../questionnaire/questions/home-type-question/home-type";
import {RdSapInput} from "../energy-calculation-api-service/request/rdsap-input";
import {UserJourneyType} from "./user-journey-type";
import {ShowerType} from "../../questionnaire/questions/shower-type-question/shower-type";
import {TenureType} from "../../questionnaire/questions/ownership-status-question/tenure-type";

@Injectable()
export class ResponseData {
    public userJourneyType: UserJourneyType;
    public postcode: string;
    public epc: Epc;
    public localAuthorityCode: string;
    public confirmEpc: boolean;
    public tenureType: TenureType;
    public homeType: HomeType;
    public homeAge: HomeAge;
    public flatPosition: FlatPosition;
    public numberOfStoreys: number;
    public numberOfBedrooms: number;
    public fuelType: FuelType;
    public condensingBoiler: boolean;
    public electricityTariff: ElectricityTariff;
    public numberOfOccupants: number;
    public numberOfShowersPerWeek: number;
    public showerType: ShowerType;
    public numberOfFridgeFreezers: number;
    public numberOfFridges: number;
    public numberOfFreezers: number;
    public livingRoomTemperature: number;
    public numberOfBathsPerWeek: number;
}

export function isComplete(responseData: ResponseData) {
    return new RdSapInput(responseData).isMinimalDataSet();
}