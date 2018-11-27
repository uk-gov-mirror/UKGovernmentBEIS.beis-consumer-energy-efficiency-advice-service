import {FloorLevel} from "../../../questionnaire/questions/floor-level-question/floor-level";
import {RdsapInputHelper} from "./rdsap-input-helper";
import {FlatLevel} from "./flat-level";
import {HomeType} from "../../../questionnaire/questions/home-type-question/home-type";
import {ResponseData} from "../../response-data/response-data";
import {FlatExposedWall} from "../../../questionnaire/questions/flat-exposed-wall-question/flat-exposed-wall";
import {BuiltForm} from "./built-form";
import {PropertyType} from "./property-type";
import {BuiltFormAnswer} from "../../../questionnaire/questions/built-form-question/built-form-answer";

describe('RdsapInputHelper', () => {

    describe('#getFlatLevel', () => {
        it('should calculate flat level correctly', () => {
            // given
            const floorLevels = [FloorLevel.Basement, FloorLevel.Ground];

            // when
            const flatLevel = RdsapInputHelper.getFlatLevel(floorLevels);

            // then
            expect(flatLevel).toEqual(FlatLevel.Basement);
        });
    });

    describe('#getBuiltForm', () => {
        let responseData: ResponseData;

        beforeEach(() => {
            responseData = {} as ResponseData;
        });

        it('should return built form specified by builtForm for house', () => {
           // given
            responseData.homeType = HomeType.House;
            responseData.builtForm = BuiltFormAnswer.Detached;

            // when
            const builtForm = RdsapInputHelper.getBuiltForm(responseData);

            // then
            expect(builtForm).toEqual(BuiltForm.Detached);
        });

        it('should return built form specified by builtForm for bungalow', () => {
            // given
            responseData.homeType = HomeType.Bungalow;
            responseData.builtForm = BuiltFormAnswer.Detached;

            // when
            const builtForm = RdsapInputHelper.getBuiltForm(responseData);

            // then
            expect(builtForm).toEqual(BuiltForm.Detached);
        });

        it('should return detached for flat sharing 0 sides', () => {
            // given
            responseData.homeType = HomeType.FlatDuplexOrMaisonette;
            responseData.numberOfExposedWallsInFlat = FlatExposedWall.FourSidesExposedWholeFloor;

            // when
            const builtForm = RdsapInputHelper.getBuiltForm(responseData);

            // then
            expect(builtForm).toEqual(BuiltForm.Detached);
        });

        it('should return semi-detached for flat sharing 1 side', () => {
            // given
            responseData.homeType = HomeType.FlatDuplexOrMaisonette;
            responseData.numberOfExposedWallsInFlat = FlatExposedWall.ThreeSidesExposedWholeSide;

            // when
            const builtForm = RdsapInputHelper.getBuiltForm(responseData);

            // then
            expect(builtForm).toEqual(BuiltForm.SemiDetached);
        });

        it('should return mid-terrace for flat sharing 2 sides and located at corner', () => {
            // given
            responseData.homeType = HomeType.FlatDuplexOrMaisonette;
            responseData.numberOfExposedWallsInFlat = FlatExposedWall.TwoSidesExposedCorner;

            // when
            const builtForm = RdsapInputHelper.getBuiltForm(responseData);

            // then
            expect(builtForm).toEqual(BuiltForm.MidTerrace);
        });

        it('should return mid-terrace for flat sharing 2 sides and through building', () => {
            // given
            responseData.homeType = HomeType.FlatDuplexOrMaisonette;
            responseData.numberOfExposedWallsInFlat = FlatExposedWall.TwoSidesExposedThroughBuilding;

            // when
            const builtForm = RdsapInputHelper.getBuiltForm(responseData);

            // then
            expect(builtForm).toEqual(BuiltForm.MidTerrace);
        });

        it('should return enclosed mid-terrace for flat sharing 3 sides', () => {
            // given
            responseData.homeType = HomeType.FlatDuplexOrMaisonette;
            responseData.numberOfExposedWallsInFlat = FlatExposedWall.OneSideExposedInset;

            // when
            const builtForm = RdsapInputHelper.getBuiltForm(responseData);

            // then
            expect(builtForm).toEqual(BuiltForm.EnclosedMidTerrace);
        });

        it('should return detached for park home or mobile home', () => {
            // given
            responseData.homeType = HomeType.ParkHomeOrMobileHome;

            // when
            const builtForm = RdsapInputHelper.getBuiltForm(responseData);

            // then
            expect(builtForm).toEqual(BuiltForm.Detached);
        });
    });

    describe('#getPropertyType', () => {
        let responseData: ResponseData;

        beforeEach(() => {
            responseData = {} as ResponseData;
        });

        it('should return house for house', () => {
            // given
            const homeType = HomeType.House;

            // when
            const propertyType = RdsapInputHelper.getPropertyType(homeType);

            // then
            expect(propertyType).toEqual(PropertyType.House);
        });

        it('should return bungalow for bungalow', () => {
            // given
            const homeType = HomeType.Bungalow;

            // when
            const propertyType = RdsapInputHelper.getPropertyType(homeType);

            // then
            expect(propertyType).toEqual(PropertyType.Bungalow);
        });

        it('should return flat for flat, duplex or maisonette', () => {
            // given
            const homeType = HomeType.FlatDuplexOrMaisonette;

            // when
            const propertyType = RdsapInputHelper.getPropertyType(homeType);

            // then
            expect(propertyType).toEqual(PropertyType.Flat);
        });

        it('should return park home for park home or mobile home', () => {
            // given
            const homeType = HomeType.ParkHomeOrMobileHome;

            // when
            const propertyType = RdsapInputHelper.getPropertyType(homeType);

            // then
            expect(propertyType).toEqual(PropertyType.ParkHome);
        });
    });

    describe('#getOccupants', () => {
        let responseData: ResponseData;

        beforeEach(() => {
            responseData = {} as ResponseData;
        });

        it('should calculate the number of occupants correctly', () => {
            // given
            responseData.numberOfChildrenAgedUnder5 = 1;
            responseData.numberOfChildrenAged5AndAbove = 2;
            responseData.numberOfAdultsAgedUnder64 = 3;
            responseData.numberOfAdultsAged64To80 = 4;
            responseData.numberOfAdultsAgedOver80 = 5;

            const expectedTotalNumberOfOccupants = 15;

            // when
            const occupants = RdsapInputHelper.getOccupants(responseData);

            // then
            expect(occupants).toEqual(expectedTotalNumberOfOccupants);
        });
    });

    describe('#getWithVulnerableOccupants', () => {
        let responseData: ResponseData;

        beforeEach(() => {
            responseData = {} as ResponseData;
            responseData.numberOfChildrenAgedUnder5 = 0;
            responseData.numberOfChildrenAged5AndAbove = 0;
            responseData.numberOfAdultsAgedUnder64 = 0;
            responseData.numberOfAdultsAged64To80 = 0;
            responseData.numberOfAdultsAgedOver80 = 0;
        });

        it('should return true if there are children under 5', () => {
            // given
            responseData.numberOfChildrenAgedUnder5 = 1;

            // when
            const withVulnerableOccupants = RdsapInputHelper.getWithVulnerableOccupants(responseData);

            // then
            expect(withVulnerableOccupants).toBe(true);
        });

        it('should return true if there are adults aged 64 to 80', () => {
            // given
            responseData.numberOfAdultsAged64To80 = 1;

            // when
            const withVulnerableOccupants = RdsapInputHelper.getWithVulnerableOccupants(responseData);

            // then
            expect(withVulnerableOccupants).toBe(true);
        });

        it('should return true if there are adults over 80', () => {
            // given
            responseData.numberOfAdultsAgedOver80 = 1;

            // when
            const withVulnerableOccupants = RdsapInputHelper.getWithVulnerableOccupants(responseData);

            // then
            expect(withVulnerableOccupants).toBe(true);
        });

        it('should return false if there are only adults under 64', () => {
            // given
            responseData.numberOfAdultsAgedUnder64 = 1;

            // when
            const withVulnerableOccupants = RdsapInputHelper.getWithVulnerableOccupants(responseData);

            // then
            expect(withVulnerableOccupants).toBe(false);
        });
    });
});
