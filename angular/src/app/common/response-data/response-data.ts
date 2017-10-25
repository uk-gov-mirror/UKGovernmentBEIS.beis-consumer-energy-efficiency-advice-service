import {Injectable} from "@angular/core";
import {Epc} from '../../questionnaire/questionnaires/home-basics/questions/postcode-epc-question/model/epc';
import {FuelType} from "../../questionnaire/questionnaires/home-basics/questions/fuel-type-question/fuel-type";
import {ElectricityTariff} from "../../questionnaire/questionnaires/home-basics/questions/electricity-tariff-question/electricity-tariff";
import {FlatPosition} from "../../questionnaire/questionnaires/home-basics/questions/flat-position-question/flat-position";
import {HomeAge} from "../../questionnaire/questionnaires/home-basics/questions/home-age-question/home-age";
import {HomeType} from "../../questionnaire/questionnaires/home-basics/questions/home-type-question/home-type";

interface ResponseDataShape {
    postcode: any;
    epc: any;
    confirmEpc: boolean;
    homeType: any;
    homeAge: any;
    flatPosition: any;
    numberOfStoreys: any;
    numberOfBedrooms: any;
    fuelType: any;
    condensingBoiler: any;
    electricityTariff: any;
}

@Injectable()
export class ResponseData implements ResponseDataShape {
    public postcode: string;
    public epc: Epc;
    public confirmEpc: boolean;
    public homeType: HomeType;
    public homeAge: HomeAge;
    public flatPosition: FlatPosition;
    public numberOfStoreys: number;
    public numberOfBedrooms: number;
    public fuelType: FuelType;
    public condensingBoiler: boolean;
    public electricityTariff: ElectricityTariff;
}

// This class is *ONLY* used for displaying the summary page of the user's responses.
// It is necessary because at runtime, some values (such as enum values, which are
// just numbers at runtime) display in a way which is meaningless.
//
// This class therefore is of the same shape as ResponseData, but transforms certain
// values into forms which will display correctly.
export class DisplayableResponseData implements ResponseDataShape {
    constructor(
        public postcode: string,
        public epc: Epc,
        public confirmEpc: boolean,
        public homeType: string,
        public homeAge: string,
        public flatPosition: string,
        public numberOfStoreys: number,
        public numberOfBedrooms: number,
        public fuelType: string,
        public condensingBoiler: boolean,
        public electricityTariff: string
    ) {
    }

    static fromResponseData(responseData: ResponseData): DisplayableResponseData {
        return new DisplayableResponseData(
            responseData.postcode,
            responseData.epc,
            responseData.confirmEpc,
            HomeType[responseData.homeType],
            HomeAge[responseData.homeAge],
            FlatPosition[responseData.flatPosition],
            responseData.numberOfStoreys,
            responseData.numberOfBedrooms,
            FuelType[responseData.fuelType],
            responseData.condensingBoiler,
            ElectricityTariff[responseData.electricityTariff]
        );
    }
}
