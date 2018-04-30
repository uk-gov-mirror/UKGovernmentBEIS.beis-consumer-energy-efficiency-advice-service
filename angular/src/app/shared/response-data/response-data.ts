import {Injectable} from '@angular/core';
import {Epc} from '../postcode-epc-service/model/epc';
import {FuelType} from '../../questionnaire/questions/fuel-type-question/fuel-type';
import {ElectricityTariff} from '../../questionnaire/questions/electricity-tariff-question/electricity-tariff';
import {HouseExposedWall} from '../../questionnaire/questions/house-exposed-wall-question/house-exposed-wall';
import {HomeAge} from '../../questionnaire/questions/home-age-question/home-age';
import {HomeType} from '../../questionnaire/questions/home-type-question/home-type';
import {RdSapInput} from '../energy-calculation-api-service/request/rdsap-input';
import {UserJourneyType} from './user-journey-type';
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
import {LettingDomesticPropertyStage} from '../../questionnaire/questions/mees/letting-domestic-property-question/letting-domestic-property-stage';

/**
 * This is a global mutable singleton which tracks the user's answers to the questionnaires.
 *
 * This includes all questionnaires: the energy-calculation journey as well as
 * the boiler journey and others.
 *
 * Services which need to read or write this data can request that the singleton is injected.
 *
 * See RdSapInput for the data we send to the BRE energy-calculation endpoint.
 */
@Injectable()
export class ResponseData {
    // UI state settings:
    public userJourneyType: UserJourneyType;
    public shouldIncludeGrantsQuestionnaire: boolean;
    public shouldIncludeOptionalPropertyQuestions: boolean;

    // Set by PostcodeEpcQuestionComponent, sent to BRE energy-calculation
    public postcode: string;
    // Set by PostcodeEpcQuestionComponent, sent to BRE energy-calculation
    public epc: Epc;
    // Set by PostcodeEpcQuestionComponent, used for showing grants
    public localAuthorityCode: string;
    // Always set to `true` by ConfirmEpcQuestionComponent, not used
    public confirmEpc: boolean;
    // Set by TenureTypeQuestionComponent, sent to BRE energy-calculation, used by grants
    public tenureType: TenureType;
    // Set by HomeTypeQuestionComponent, sent to BRE energy-calculation
    public homeType: HomeType;
    // Set by HomeAgeQuestionComponent, sent to BRE energy-calculation
    public homeAge: HomeAge;
    // Set by FlatExposedWallQuestionComponent, sent to BRE energy-calculation
    public numberOfExposedWallsInFlat: FlatExposedWall;
    // Set by HouseExposedWallQuestionComponent, sent to BRE energy-calculation
    public numberOfExposedWallsInHouse: HouseExposedWall;
    // Set by FlatStoreysQuestionComponent / HouseStoreysQuestionComponent, sent to BRE energy-calculation
    public numberOfStoreys: number;
    // Set by BedroomsQuestionComponent, sent to BRE energy-calculation
    public numberOfBedrooms: number;
    // Set by FloorAreaQuestionComponent, sent to BRE energy-calculation
    public floorArea: number;
    // Set by FloorAreaQuestionComponent, sent to BRE energy-calculation
    public floorAreaUnit: FloorAreaUnit;
    // Set by FuelTypeQuestionComponent, sent to BRE energy-calculation, used by BoilerResultsPageComponent
    public fuelType: FuelType;
    // Set by BoilerTypeQuestionComponent, sent to BRE energy-calculation
    public condensingBoiler: boolean;
    // Set by ElectricityTariffQuestionComponent, sent to BRE energy-calculation
    public electricityTariff: ElectricityTariff;
    // Set by DetailedLengthOfHeatingOnQuestionComponent, sent to BRE energy-calculation
    public detailedLengthOfHeatingOnEarlyHours: number;
    // Set by DetailedLengthOfHeatingOnQuestionComponent, sent to BRE energy-calculation
    public detailedLengthOfHeatingOnMorning: number;
    // Set by DetailedLengthOfHeatingOnQuestionComponent, sent to BRE energy-calculation
    public detailedLengthOfHeatingOnAfternoon: number;
    // Set by DetailedLengthOfHeatingOnQuestionComponent, sent to BRE energy-calculation
    public detailedLengthOfHeatingOnEvening: number;
    // Set by OccupantsQuestionComponent, sent to BRE energy-calculation (as `occupants`)
    public numberOfAdultsAgedUnder64: number;
    // Set by OccupantsQuestionComponent, sent to BRE energy-calculation (as `occupants`)
    public numberOfAdultsAged64To80: number;
    // Set by OccupantsQuestionComponent, sent to BRE energy-calculation (as `occupants`)
    public numberOfAdultsAgedOver80: number;
    // Set by OccupantsQuestionComponent, sent to BRE energy-calculation (as `occupants`), used by grants
    public numberOfChildren: number;
    // Set by ShowersAndBathsQuestionComponent, sent to BRE energy-calculation
    public numberOfShowersPerWeek: number;
    // Set by ShowersAndBathsQuestionComponent, sent to BRE energy-calculation
    public numberOfBathsPerWeek: number;
    // Set by LivingRoomTemperatureQuestionComponent, sent to BRE energy-calculation
    public livingRoomTemperature: number;
    // Set by ConstructionQuestionComponent, sent to BRE energy-calculation, used by BoilerResultsPageComponent
    public roofType: RoofType;
    // Set by ConstructionQuestionComponent, sent to BRE energy-calculation, used by BoilerResultsPageComponent
    public wallType: WallType;
    // Set by ConstructionQuestionComponent, sent to BRE energy-calculation, used by BoilerResultsPageComponent
    public glazingType: GlazingType;
    // Set by WaterTankQuestionComponent, used by BoilerResultsPageComponent
    public waterTankSpace: WaterTankSpace;
    // Set by GardenQuestionComponent, used by BoilerResultsPageComponent
    public gardenAccessibility: GardenAccessibility;
    // Set by GardenQuestionComponent, used by BoilerResultsPageComponent
    public gardenSizeSquareMetres: number;
    // Set by RoofSpaceQuestionComponent, used by BoilerResultsPageComponent
    public roofSpace: RoofSpace;
    // Set by FloorSpanQuestionComponent, sent to BRE energy-calculation
    public floorLevels: FloorLevel[];
    // Set by HotWaterCylinderQuestionComponent, sent to BRE energy-calculation
    public hotWaterCylinder: boolean;

    // Set by BenefitsQuestionComponent, used by grants
    public benefits: Benefits;
    // Set by IncomeQuestionComponent, used by grants
    public income: number;

    get numberOfAdults(): number {
        return this.numberOfAdultsAgedUnder64 +
            this.numberOfAdultsAged64To80 +
            this.numberOfAdultsAgedOver80;
    }

    // Used by MeesResultsPageComponent
    public lettingDomesticPropertyStage: LettingDomesticPropertyStage;
    // Used by MeesResultsPageComponent
    public propertyEpc: UserEpcRating;
    // Used by MeesResultsPageComponent
    public confirmEpcNotFound: boolean;
    // Used by MeesResultsPageComponent
    public isEpcRequired: boolean;
    // Used by MeesResultsPageComponent
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
