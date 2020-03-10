import {RdSapInput} from './rdsap-input';
import {ResponseData} from '../../response-data/response-data';
import {UserJourneyType} from '../../response-data/user-journey-type';
import {HomeType} from '../../../questionnaire/questions/home-type-question/home-type';
import {HomeAge} from '../../../questionnaire/questions/home-age-question/home-age';
import {FuelType} from '../../../questionnaire/questions/fuel-type-question/fuel-type';
import {TenureType} from '../../../questionnaire/questions/tenure-type-question/tenure-type';
import {
    GlazingType,
    RoofType,
    WallType
} from '../../../questionnaire/questions/construction-question/construction-types';
import toString from 'lodash-es/toString';
import {WaterTankSpace} from '../../../questionnaire/questions/water-tank-question/water-tank-space';
import {GardenAccessibility} from '../../../questionnaire/questions/garden-question/garden-accessibility';
import {RoofSpace} from '../../../questionnaire/questions/roof-space-question/roof-space';
import {FloorAreaUnit} from '../../../questionnaire/questions/floor-area-question/floor-area-unit';
import {FlatExposedWall} from '../../../questionnaire/questions/flat-exposed-wall-question/flat-exposed-wall';
import {FloorLevel} from '../../../questionnaire/questions/floor-level-question/floor-level';
import {TenancyType} from '../../../questionnaire/questions/mees/tenancy-type-question/tenancy-type';
import {UserEpcRating} from '../../../questionnaire/questions/mees/property-epc-question/user-epc-rating';
import {LettingDomesticPropertyStage} from '../../../questionnaire/questions/mees/letting-domestic-property-question/letting-domestic-property-stage';
import {AgriculturalTenancyType} from '../../../questionnaire/questions/mees/agricultural-tenancy-type-question/agricultural-tenancy-type';
import {TenancyStartDate} from '../../../questionnaire/questions/mees/tenancy-start-date-question/tenancy-start-date';
import {BuiltFormAnswer} from "../../../questionnaire/questions/built-form-question/built-form-answer";
import {Epc} from "../../postcode-epc-service/model/epc";

describe('RdsapInput', () => {

    describe('#construct', () => {

        const numberOfAdultsUnder64 = 1;
        const numberOfAdults64To80 = 2;
        const numberOfAdultsOver80 = 3;
        const numberOfChildrenAged5AndAbove = 4;
        const numberOfChildrenUnder5 = 5;

        const responseData: ResponseData = {
            userJourneyType: UserJourneyType.ReduceEnergyBills,
            shouldIncludeGrantsQuestionnaire: false,
            shouldIncludeOptionalPropertyQuestions: false,
            postcode: 'sw1h0et',
            epc: null,
            localAuthorityCode: 'E09000033',
            confirmEpc: true,
            tenureType: TenureType.OwnerOccupancy,
            homeType: HomeType.FlatDuplexOrMaisonette,
            builtForm: BuiltFormAnswer.Detached,
            homeAge: HomeAge.pre1900,
            numberOfExposedWallsInFlat: FlatExposedWall.ThreeSidesExposedWholeSide,
            numberOfStoreys: 1,
            numberOfStoreysInBuilding: 5,
            numberOfBedrooms: 1,
            floorArea: undefined,
            floorAreaUnit: FloorAreaUnit.SquareMetre,
            floorLevels: [FloorLevel.TopFloor],
            fuelType: FuelType.MainsGas,
            hotWaterCylinder: false,
            condensingBoiler: false,
            electricityTariff: undefined,
            heatingPatternType: null,
            morningHeatingStartTime: null,
            morningHeatingDuration: null,
            eveningHeatingStartTime: null,
            eveningHeatingDuration: null,
            heatingHoursPerDay: null,
            normalDaysOffHours: null,
            numberOfAdultsAgedUnder64: numberOfAdultsUnder64,
            numberOfAdultsAged64To80: numberOfAdults64To80,
            numberOfAdultsAgedOver80: numberOfAdultsOver80,
            numberOfChildrenAged5AndAbove: numberOfChildrenAged5AndAbove,
            numberOfChildrenAgedUnder5: numberOfChildrenUnder5,
            numberOfShowersPerWeek: 0,
            numberOfBathsPerWeek: 45,
            livingRoomTemperature: 20,
            roofType: RoofType.DoNotKnow,
            wallType: WallType.DoNotKnow,
            glazingType: GlazingType.Double,
            waterTankSpace: WaterTankSpace.Sufficient,
            gardenAccessibility: GardenAccessibility.NotAccessible,
            gardenSizeSquareMetres: 100,
            roofSpace: RoofSpace.NoSpace,
            numberOfAdults: numberOfAdultsUnder64 + numberOfAdults64To80 + numberOfAdultsOver80,
            numberOfChildren: numberOfChildrenUnder5 + numberOfChildrenAged5AndAbove,

            receivePensionGuaranteeCredit: false,
            receiveIncomeRelatedBenefits: false,
            receiveSocietalBenefits: false,
            receiveDefenseRelatedBenefits: false,
            receiveChildBenefits: false,
            income: 123,

            name: 'Steve Rogers',
            emailAddress: 'steve.rogers@example.com',
            phoneNumber: '555 1234',

            hasLoft: true,
            hasLoftInsulation: true,
            isLoftAccessibleAndClearOfClutter: true,
            hasLoftHistoryOfInfestation: false,
            hasLoftHistoryOfWaterDamage: false,

            lettingDomesticPropertyStage: LettingDomesticPropertyStage.Currently,
            tenancyStartDate: TenancyStartDate.BeforeApril2018,
            propertyEpc: UserEpcRating.AtLeastE,
            isEpcRequired: false,
            confirmEpcNotFound: false,
            tenancyType: TenancyType.Other,
            agriculturalTenancyType: AgriculturalTenancyType.AssuredTenancy,
            saveToSessionStorage: () => {},
        };

        it('should set rented to true for private tenancy', () => {
            // given
            responseData.tenureType = TenureType.PrivateTenancy;

            // when
            const rdSapInput = new RdSapInput(responseData);

            // then
            expect(rdSapInput.rented).toEqual(true);
        });

        it('should set rented to true for social tenancy', () => {
            // given
            responseData.tenureType = TenureType.SocialTenancy;

            // when
            const rdSapInput = new RdSapInput(responseData);

            // then
            expect(rdSapInput.rented).toEqual(true);
        });

        it('should set rented to false for owner occupancy', () => {
            // given
            responseData.tenureType = TenureType.OwnerOccupancy;

            // when
            const rdSapInput = new RdSapInput(responseData);

            // then
            expect(rdSapInput.rented).toEqual(false);
        });

        it('should set property_type to undefined if there is epc', () => {
            // given
            responseData.epc = {} as Epc;

            // when
            const rdSapInput = new RdSapInput(responseData);

            // then
            expect(rdSapInput.property_type).toEqual(undefined);
        });

        it('should set property_type to home type if there is no epc', () => {
            // given
            responseData.epc = null;

            // when
            const rdSapInput = new RdSapInput(responseData);

            // then
            expect(rdSapInput.property_type).toEqual(toString(HomeType.FlatDuplexOrMaisonette));
        });
    });
});
