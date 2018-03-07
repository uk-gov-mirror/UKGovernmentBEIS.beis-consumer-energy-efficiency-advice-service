import {Injectable} from '@angular/core';
import {Epc} from '../postcode-epc-service/model/epc';
import {FuelType} from '../../questionnaire/questions/fuel-type-question/fuel-type';
import {ElectricityTariff} from '../../questionnaire/questions/electricity-tariff-question/electricity-tariff';
import {HouseExposedWall} from '../../questionnaire/questions/house-exposed-wall-question/house-exposed-wall';
import {HomeAge} from '../../questionnaire/questions/home-age-question/home-age';
import {HomeType} from '../../questionnaire/questions/home-type-question/home-type';
import {RdSapInput} from '../energy-calculation-api-service/request/rdsap-input';
import {UserJourneyType} from './user-journey-type';
import {ShowerType} from '../../questionnaire/questions/shower-type-question/shower-type';
import {TenureType} from '../../questionnaire/questions/tenure-type-question/tenure-type';
import {Benefits} from '../../questionnaire/questions/benefits-question/benefits';
import {GlazingType, RoofType, WallType} from '../../questionnaire/questions/construction-question/construction-types';
import {WaterTankSpace} from '../../questionnaire/questions/water-tank-question/water-tank-space';
import {GardenAccessibility} from '../../questionnaire/questions/garden-question/garden-accessibility';
import {RoofSpace} from '../../questionnaire/questions/roof-space-question/roof-space';
import {FloorAreaUnit} from '../../questionnaire/questions/floor-area-question/floor-area-unit';
import {FloorLevel} from '../../questionnaire/questions/floor-level-question/floor-level';
import {FlatExposedWall} from '../../questionnaire/questions/flat-exposed-wall-question/flat-exposed-wall';

@Injectable()
export class ResponseData {
    public userJourneyType: UserJourneyType;
    public shouldIncludeGrantsQuestionnaire: boolean;
    public shouldIncludeOptionalPropertyQuestions: boolean;
    public postcode: string;
    public epc: Epc;
    public localAuthorityCode: string;
    public confirmEpc: boolean;
    public tenureType: TenureType;
    public homeType: HomeType;
    public homeAge: HomeAge;
    public numberOfExposedWallsInFlat: FlatExposedWall;
    public numberOfExposedWallsInHouse: HouseExposedWall;
    public numberOfStoreys: number;
    public numberOfBedrooms: number;
    public floorArea: number;
    public floorAreaUnit: FloorAreaUnit;
    public fuelType: FuelType;
    public condensingBoiler: boolean;
    public electricityTariff: ElectricityTariff;
    public heatingCost: number;
    public detailedLengthOfHeatingOnEarlyHours: number;
    public detailedLengthOfHeatingOnMorning: number;
    public detailedLengthOfHeatingOnAfternoon: number;
    public detailedLengthOfHeatingOnEvening: number;
    public numberOfAdultsAgedUnder64: number;
    public numberOfAdultsAged64To80: number;
    public numberOfAdultsAgedOver80: number;
    public numberOfChildren: number;
    public numberOfShowersPerWeek: number;
    public showerType: ShowerType;
    public numberOfFridgeFreezers: number;
    public numberOfFridges: number;
    public numberOfFreezers: number;
    public livingRoomTemperature: number;
    public numberOfBathsPerWeek: number;
    public tumbleDryPercentage: number;
    public roofType: RoofType;
    public wallType: WallType;
    public glazingType: GlazingType;
    public waterTankSpace: WaterTankSpace;
    public gardenAccessibility: GardenAccessibility;
    public gardenSizeSquareMetres: number;
    public roofSpace: RoofSpace;
    public floorLevels: FloorLevel[];

    public benefits: Benefits;
    public income: number;

    get numberOfAdults(): number {
        return this.numberOfAdultsAgedUnder64 +
            this.numberOfAdultsAged64To80 +
            this.numberOfAdultsAgedOver80;
    }
}

export function isComplete(responseData: ResponseData) {
    return new RdSapInput(responseData).isMinimalDataSet();
}
