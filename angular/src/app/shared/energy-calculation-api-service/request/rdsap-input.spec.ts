import {RdSapInput} from './rdsap-input';
import {ResponseData} from '../../response-data/response-data';
import {UserJourneyType} from '../../response-data/user-journey-type';
import {HomeType} from '../../../questionnaire/questions/home-type-question/home-type';
import {HomeAge} from '../../../questionnaire/questions/home-age-question/home-age';
import {HouseExposedWall, } from '../../../questionnaire/questions/house-exposed-wall-question/house-exposed-wall';
import {FuelType} from '../../../questionnaire/questions/fuel-type-question/fuel-type';
import {ShowerType} from '../../../questionnaire/questions/shower-type-question/shower-type';
import {TenureType} from '../../../questionnaire/questions/tenure-type-question/tenure-type';
import {Benefits} from '../../../questionnaire/questions/benefits-question/benefits';
import toString from 'lodash-es/toString';
import {
    GlazingType,
    RoofType,
    WallType
} from '../../../questionnaire/questions/construction-question/construction-types';
import {WaterTankSpace} from '../../../questionnaire/questions/water-tank-question/water-tank-space';
import {GardenAccessibility} from '../../../questionnaire/questions/garden-question/garden-accessibility';
import {RoofSpace} from '../../../questionnaire/questions/roof-space-question/roof-space';
import {FloorAreaUnit} from '../../../questionnaire/questions/floor-area-question/floor-area-unit';
import {FlatExposedWall} from '../../../questionnaire/questions/flat-exposed-wall-question/flat-exposed-wall';
import {FloorLevel} from '../../../questionnaire/questions/floor-level-question/floor-level';
import {FlatLevel} from './flat-level';
import {TenancyType} from '../../../questionnaire/questions/mees/tenancy-type-question/tenancy-type';

describe('RdsapInput', () => {

    describe('#construct', () => {

        const numberOfAdultsUnder64 = 1;
        const numberOfAdults64To80 = 2;
        const numberOfAdultsOver80 = 3;
        const numberOfChildren = 3;

        const responseData: ResponseData = {
            userJourneyType: UserJourneyType.Calculator,
            shouldIncludeGrantsQuestionnaire: false,
            shouldIncludeOptionalPropertyQuestions: false,
            postcode: 'sw1h0et',
            epc: null,
            localAuthorityCode: 'E09000033',
            confirmEpc: true,
            tenureType: TenureType.OwnerOccupancy,
            homeType: HomeType.FlatDuplexOrMaisonette,
            homeAge: HomeAge.pre1900,
            numberOfExposedWallsInFlat: FlatExposedWall.ThreeSidesExposedWholeSide,
            numberOfExposedWallsInHouse: HouseExposedWall.ThreeSidesExposed,
            numberOfStoreys: 1,
            numberOfBedrooms: 1,
            floorArea: undefined,
            floorAreaUnit: FloorAreaUnit.SquareMetre,
            floorLevels: [FloorLevel.TopFloor],
            fuelType: FuelType.MainsGas,
            condensingBoiler: false,
            electricityTariff: undefined,
            heatingCost: undefined,
            detailedLengthOfHeatingOnEarlyHours: undefined,
            detailedLengthOfHeatingOnMorning: undefined,
            detailedLengthOfHeatingOnAfternoon: undefined,
            detailedLengthOfHeatingOnEvening: undefined,
            numberOfAdultsAgedUnder64: numberOfAdultsUnder64,
            numberOfAdultsAged64To80: numberOfAdults64To80,
            numberOfAdultsAgedOver80: numberOfAdultsOver80,
            numberOfChildren: numberOfChildren,
            showerType: ShowerType.None,
            numberOfShowersPerWeek: 0,
            numberOfBathsPerWeek: 45,
            tumbleDryPercentage: undefined,
            numberOfFridgeFreezers: 0,
            numberOfFridges: 0,
            numberOfFreezers: 0,
            livingRoomTemperature: 20,
            benefits: Benefits.None,
            income: 123,
            roofType: RoofType.DoNotKnow,
            wallType: WallType.DoNotKnow,
            glazingType: GlazingType.Double,
            waterTankSpace: WaterTankSpace.Sufficient,
            gardenAccessibility: GardenAccessibility.NotAccessible,
            gardenSizeSquareMetres: 100,
            roofSpace: RoofSpace.NoSpace,
            numberOfAdults: numberOfAdultsUnder64 + numberOfAdults64To80 + numberOfAdultsOver80,

            isDomesticPropertyAfter2018: false,
            isPropertyAfter2020: false,
            isEpcBelowE: false,
            isEpcRequired: false,
            willPropertyBeDevalued: false,
            hasRecommendedImprovements: false,
            hasImprovementsAtNoCost: false,
            hasTemporaryExclusions: false,
            tenancyType: TenancyType.Other,
            hasRelevantConsent: false,
            saveToSessionStorage: () => {},
        };

        it('should calculate the number of occupants correctly', () => {
            // given
            const expectedNumberOfOccupants = numberOfChildren + numberOfAdultsUnder64 +
                numberOfAdults64To80 + numberOfAdultsOver80;

            // when
            const rdSapInput = new RdSapInput(responseData);

            // then
            expect(rdSapInput.occupants).toBe(expectedNumberOfOccupants);
        });

        it('should calculate number of heating off hours normal correctly', () => {
            // given
            responseData.detailedLengthOfHeatingOnEarlyHours = 3;
            responseData.detailedLengthOfHeatingOnMorning = 6;
            responseData.detailedLengthOfHeatingOnAfternoon = 0;
            responseData.detailedLengthOfHeatingOnEvening = 0;

            // when
            const rdSapInput = new RdSapInput(responseData);

            // then
            expect(rdSapInput.number_of_heating_off_hours_normal).toEqual([3, 0, 6, 6]);
        });

        it('should calculate flat level correctly', () => {
            // given
            responseData.floorLevels = [FloorLevel.Basement, FloorLevel.Ground];

            // when
            const rdSapInput = new RdSapInput(responseData);

            // then
            expect(rdSapInput.flat_level).toEqual(toString(FlatLevel.Basement));
        });

        it('should calculate flat top storey correctly', () => {
            // given
            responseData.floorLevels = [FloorLevel.MidFloor, FloorLevel.TopFloor];

            // when
            const rdSapInput = new RdSapInput(responseData);

            // then
            expect(rdSapInput.flat_top_storey).toEqual('Y');
        });

        it('should calculate number of exposed walls correctly', () => {
            // given
            responseData.homeType = HomeType.ParkHomeOrMobileHome;

            // when
            let rdSapInput = new RdSapInput(responseData);

            // then
            expect(rdSapInput.number_of_exposed_walls).toEqual(4);

            // given
            responseData.homeType = HomeType.FlatDuplexOrMaisonette;
            responseData.numberOfExposedWallsInFlat = FlatExposedWall.ThreeSidesExposedWholeSide;

            // when
            rdSapInput = new RdSapInput(responseData);

            // then
            expect(rdSapInput.number_of_exposed_walls).toEqual(3);

            // given
            responseData.homeType = HomeType.SemiDetachedBungalow;
            responseData.numberOfExposedWallsInHouse = HouseExposedWall.TwoSidesExposed;

            // when
            rdSapInput = new RdSapInput(responseData);

            // then
            expect(rdSapInput.number_of_exposed_walls).toEqual(2);
        });

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
    });
});
