import {RdSapInput} from "./rdsap-input";
import {ResponseData} from "../../response-data/response-data";
import {UserJourneyType} from "../../response-data/user-journey-type";
import {HomeType} from "../../../questionnaire/questions/home-type-question/home-type";
import {HomeAge} from "../../../questionnaire/questions/home-age-question/home-age";
import {FlatPosition} from "../../../questionnaire/questions/flat-position-question/flat-position";
import {FuelType} from "../../../questionnaire/questions/fuel-type-question/fuel-type";
import {ShowerType} from "../../../questionnaire/questions/shower-type-question/shower-type";
import {TenureType} from "../../../questionnaire/questions/tenure-type-question/tenure-type";
import {Benefits} from "../../../questionnaire/questions/benefits-question/benefits";
import {
    GlazingType, RoofType,
    WallType
} from "../../../questionnaire/questions/construction-question/construction-types";
import {WaterTankSpace} from "../../../questionnaire/questions/water-tank-question/water-tank-space";
import {GardenAccessibility} from "../../../questionnaire/questions/garden-question/garden-accessibility";

describe('RdsapInput', () => {

    describe('#construct', () => {

        const numberOfAdultsUnder64 = 1;
        const numberOfAdults64To80 = 2;
        const numberOfAdultsOver80 = 3;
        const numberOfChildren = 3;

        const responseData: ResponseData = {
            userJourneyType: UserJourneyType.Calculator,
            shouldIncludeGrantsQuestionnaire: false,
            postcode: 'sw1h0et',
            epc: null,
            localAuthorityCode: 'E09000033',
            confirmEpc: true,
            tenureType: TenureType.OwnerOccupancy,
            homeType: HomeType.GroundFloorFlat,
            homeAge: HomeAge.pre1900,
            flatPosition: FlatPosition.ThreeSidesExposed,
            numberOfStoreys: 1,
            numberOfBedrooms: 1,
            fuelType: FuelType.MainsGas,
            condensingBoiler: false,
            electricityTariff: undefined,
            numberOfAdultsAgedUnder64: numberOfAdultsUnder64,
            numberOfAdultsAged64To80: numberOfAdults64To80,
            numberOfAdultsAgedOver80: numberOfAdultsOver80,
            numberOfChildren: numberOfChildren,
            showerType: ShowerType.None,
            numberOfShowersPerWeek: 0,
            numberOfBathsPerWeek: 45,
            numberOfFridgeFreezers: 0,
            numberOfFridges: 0,
            numberOfFreezers: 0,
            livingRoomTemperature: 20,
            benefits: Benefits.None,
            income: 123,
            roofType: RoofType.DontKnow,
            wallType: WallType.DontKnow,
            glazingType: GlazingType.Double,
            waterTankSpace: WaterTankSpace.Sufficient,
            gardenAccessibility: GardenAccessibility.NotAccessible,
            gardenSizeSquareMetres: 100,
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
    })
});