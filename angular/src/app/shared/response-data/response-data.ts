import 'reflect-metadata';
import {Injectable} from '@angular/core';
import {Epc} from '../postcode-epc-service/model/epc';
import {FuelType} from '../../questionnaire/questions/fuel-type-question/fuel-type';
import {ElectricityTariff} from '../../questionnaire/questions/electricity-tariff-question/electricity-tariff';
import {HomeAge} from '../../questionnaire/questions/home-age-question/home-age';
import {HomeType} from '../../questionnaire/questions/home-type-question/home-type';
import {RdSapInput} from '../energy-calculation-api-service/request/rdsap-input';
import {UserJourneyType} from './user-journey-type';
import {TenureType} from '../../questionnaire/questions/tenure-type-question/tenure-type';
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
import {AgriculturalTenancyType} from '../../questionnaire/questions/mees/agricultural-tenancy-type-question/agricultural-tenancy-type';
import {TenancyStartDate} from '../../questionnaire/questions/mees/tenancy-start-date-question/tenancy-start-date';
import {BuiltFormAnswer} from "../../questionnaire/questions/built-form-question/built-form-answer";

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
    // Set by BuiltFormQuestionComponent, sent to BRE energy-calculation
    public builtForm: BuiltFormAnswer;
    // Set by FlatStoreysQuestionComponent / HouseStoreysQuestionComponent, sent to BRE energy-calculation
    public numberOfStoreys: number;
    // Set by FlatStoreysQuestionComponent, not sent to BRE energy-calculation
    public numberOfStoreysInBuilding: number;
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
    // Set by DetailedLengthOfHeatingOnQuestionComponent, sent to BRE energy-calculation.
    // See DetailedLengthOfHeatingOnQuestionComponent::heatingPatterns for possible values
    public heatingPatternType: number;
    // Set by DetailedLengthOfHeatingOnQuestionComponent
    public morningHeatingStartTime: number;
    // Set by DetailedLengthOfHeatingOnQuestionComponent
    public morningHeatingDuration: number;
    // Set by DetailedLengthOfHeatingOnQuestionComponent
    public eveningHeatingStartTime: number;
    // Set by DetailedLengthOfHeatingOnQuestionComponent
    public eveningHeatingDuration: number;
    // Set by DetailedLengthOfHeatingOnQuestionComponent
    public heatingHoursPerDay: number;
    // Set by DetailedLengthOfHeatingOnQuestionComponent, sent to BRE energy-calculation
    public normalDaysOffHours: number[];
    // Set by OccupantsQuestionComponent, sent to BRE energy-calculation (as `occupants`)
    public numberOfAdultsAgedUnder64: number;
    // Set by OccupantsQuestionComponent, sent to BRE energy-calculation (as `occupants`)
    public numberOfAdultsAged64To80: number;
    // Set by OccupantsQuestionComponent, sent to BRE energy-calculation (as `occupants`)
    public numberOfAdultsAgedOver80: number;
    // Set by OccupantsQuestionComponent, sent to BRE energy-calculation (as `occupants`), used by grants
    public numberOfChildrenAged5AndAbove: number;
    // Set by OccupantsQuestionComponent, sent to BRE energy-calculation (as `occupants`), used by grants
    public numberOfChildrenAgedUnder5: number;
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

    // Set by PensionGuaranteeCreditQuestionComponent, used by grants
    public receivePensionGuaranteeCredit: boolean;
    // Set by IncomeRelatedBenefitsQuestionComponent, used by grants
    public receiveIncomeRelatedBenefits: boolean;
    // Set by SocietalBenefitsQuestionComponent, used by grants
    public receiveSocietalBenefits: boolean;
    // Set by DefenseRelatedBenefitsQuestionComponent, used by grants
    public receiveDefenseRelatedBenefits: boolean;
    // Set by ChildBenefitsQuestionComponent, used by grants
    public receiveChildBenefits: boolean;
    // Set by IncomeQuestionComponent, used by grants
    public income: number;

    // Set by ContactDetailsQuestionComponent, used by ECO self-referral
    public name: string;
    public emailAddress: string;
    public phoneNumber: string;

    // Set by HasLoftQuestionComponent, used be ECO self-referral
    public hasLoft: boolean;
    // Set by LoftInsulationQuestionComponent, used by ECO self-referral
    public hasLoftInsulation: boolean;
    // Set by LoftClutterQuestionComponent, used by ECO self-referral
    public isLoftAccessibleAndClearOfClutter: boolean;
    // Set by LoftInfestationQuestionComponent, used by ECO self-referral
    public hasLoftHistoryOfInfestation: boolean;
    // Set by LoftWaterDamageQuestionComponent, used by ECO self-referral
    public hasLoftHistoryOfWaterDamage: boolean;

    get numberOfAdults(): number {
        return this.numberOfAdultsAgedUnder64 +
            this.numberOfAdultsAged64To80 +
            this.numberOfAdultsAgedOver80;
    }

    get numberOfChildren(): number {
        return this.numberOfChildrenAgedUnder5 +
            this.numberOfChildrenAged5AndAbove;
    }

    // When adding a MEES questionnaire answer, you should update clearMeesResponseData below as well
    // Used by MeesResultsPageComponent
    public lettingDomesticPropertyStage: LettingDomesticPropertyStage;
    // Used by MeesResultsPageComponent
    public tenancyStartDate: TenancyStartDate;
    // Used by MeesResultsPageComponent
    public propertyEpc: UserEpcRating;
    // Used by MeesResultsPageComponent
    public confirmEpcNotFound: boolean;
    // Used by MeesResultsPageComponent
    public isEpcRequired: boolean;
    // Used by MeesResultsPageComponent
    public tenancyType: TenancyType;
    // Used by MeesResultsPageComponent
    public agriculturalTenancyType: AgriculturalTenancyType;

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
    deleteAllOldResponseData(oldResponseData);
    addNewResponseData(oldResponseData, newResponseData);
}

function addNewResponseData(oldResponseData: ResponseData, newResponseData: ResponseData) {
    for (const i in newResponseData) {
        if (newResponseData.hasOwnProperty(i)) {
            oldResponseData[i] = newResponseData[i];
        }
    }
}

// Preserving certain fields is necessary when moving from the eligibility questionnaire into the ECO self-referral questionnaire.
// It would be nice to refactor this to use property decorators:
// https://www.typescriptlang.org/docs/handbook/decorators.html#property-decorators
const fieldsToPreserveOnEpcChange = [
    'receivePensionGuaranteeCredit',
    'receiveIncomeRelatedBenefits',
    'receiveSocietalBenefits',
    'receiveDefenseRelatedBenefits',
    'receiveChildBenefits',
    'income'
];

export function resetResponseDataForNewEpc(responseData: ResponseData) {
    deleteMatchingFieldsFromResponseData(responseData, key => {
        return !fieldsToPreserveOnEpcChange.includes(key);
    });
}

export function deleteAllOldResponseData(responseData: ResponseData) {
    deleteMatchingFieldsFromResponseData(responseData, () => true);
}

function deleteMatchingFieldsFromResponseData(responseData: ResponseData, matcher: (key: string) => boolean) {
    for (const key in responseData) {
        if (responseData.hasOwnProperty(key) && matcher(key)) {
            delete responseData[key];
        }
    }
}

export function clearMeesResponseData(responseData: ResponseData) {
    delete responseData.lettingDomesticPropertyStage;
    delete responseData.tenancyStartDate;
    delete responseData.propertyEpc;
    delete responseData.confirmEpcNotFound;
    delete responseData.isEpcRequired;
    delete responseData.tenancyType;
    delete responseData.agriculturalTenancyType;
}
