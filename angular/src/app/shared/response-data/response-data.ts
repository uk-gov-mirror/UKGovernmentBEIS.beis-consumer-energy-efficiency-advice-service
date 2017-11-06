import {Injectable} from "@angular/core";
import {Epc} from "../../questionnaire/questionnaires/home-basics/questions/postcode-epc-question/model/epc";
import {FuelType} from "../../questionnaire/questionnaires/home-basics/questions/fuel-type-question/fuel-type";
import {ElectricityTariff} from "../../questionnaire/questionnaires/home-basics/questions/electricity-tariff-question/electricity-tariff";
import {FlatPosition} from "../../questionnaire/questionnaires/home-basics/questions/flat-position-question/flat-position";
import {HomeAge} from "../../questionnaire/questionnaires/home-basics/questions/home-age-question/home-age";
import {HomeType} from "../../questionnaire/questionnaires/home-basics/questions/home-type-question/home-type";
import {RdSapInput} from "../energy-calculation-api-service/request/rdsap-input";
import {UserJourneyType} from "./user-journey-type";

@Injectable()
export class ResponseData {
    public userJourneyType: UserJourneyType;
    public postcode: string;
    public epc: Epc;
    public localAuthorityCode: string;
    public confirmEpc: boolean;
    public homeowner: boolean;
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
    public numberOfFridgeFreezers: number;
    public numberOfFridges: number;
    public numberOfFreezers: number;
    public livingRoomTemperature: number;
    public numberOfBathsPerWeek: number;
}

export function isComplete(responseData: ResponseData) {
    return new RdSapInput(responseData).isMinimalDataSet();
}