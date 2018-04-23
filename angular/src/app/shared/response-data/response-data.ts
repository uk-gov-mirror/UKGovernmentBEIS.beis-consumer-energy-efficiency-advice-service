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
import {TenancyType} from '../../questionnaire/questions/mees/tenancy-type-question/tenancy-type';
import {UserEpcRating} from '../../questionnaire/questions/mees/property-epc-question/user-epc-rating';

/**
 * This is a global mutable singleton which tracks the user's answers to the questionnaires.
 *
 * Services which need to read or write this data can request that the singleton is injected.
 */
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
    public hotWaterCylinder: boolean;

    public benefits: Benefits;
    public income: number;

    get numberOfAdults(): number {
        return this.numberOfAdultsAgedUnder64 +
            this.numberOfAdultsAged64To80 +
            this.numberOfAdultsAgedOver80;
    }

    public isDomesticPropertyAfter2018: boolean;
    public isPropertyAfter2020: boolean;
    public propertyEpc: UserEpcRating;
    public confirmEpcNotFound: boolean;
    public isEpcRequired: boolean;
    public tenancyType: TenancyType;

    constructor() {
        if (!sessionStorageAvailable()) {
            return;
        }
        const storedResponseData = sessionStorage.getItem(responseDataSessionStorageKey);
        if (storedResponseData) {
            replaceOldResponseData(this, JSON.parse(storedResponseData));
        }
    }

    saveToSessionStorage() {
        if (sessionStorageAvailable()) {
            sessionStorage.setItem(responseDataSessionStorageKey, JSON.stringify(this));
        }
    }
}

const responseDataSessionStorageKey = 'responseData';

// Simplified version of
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
function sessionStorageAvailable() {
    try {
        const x = '__storage_test__';
        sessionStorage.setItem(x, x);
        sessionStorage.removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
}

export function isComplete(responseData: ResponseData) {
    return new RdSapInput(responseData).isMinimalDataSet();
}

export function replaceOldResponseData(oldResponseData: ResponseData, newResponseData: ResponseData) {
    deleteOldResponseData(oldResponseData);
    addNewResponseData(oldResponseData, newResponseData);
}

function addNewResponseData(oldResponseData: ResponseData, newResponseData: ResponseData) {
    for (const i in newResponseData) {
        if (newResponseData.hasOwnProperty(i)) {
            oldResponseData[i] = newResponseData[i];
        }
    }
}

export function deleteOldResponseData(responseData: ResponseData) {
    for (const i in responseData) {
        if (responseData.hasOwnProperty(i)) {
            delete responseData[i];
        }
    }
}
