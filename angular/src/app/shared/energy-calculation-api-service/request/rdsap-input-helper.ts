import {HomeType, isDetached} from "../../../questionnaire/questions/home-type-question/home-type";
import {PropertyType} from "./property-type";
import {ResponseData} from "../../response-data/response-data";
import {BuiltForm} from "./built-form";
import {HouseExposedWall} from "../../../questionnaire/questions/house-exposed-wall-question/house-exposed-wall";
import {
    FlatExposedWall,
    getNumberOfExposedWallsInFlat
} from "../../../questionnaire/questions/flat-exposed-wall-question/flat-exposed-wall";
import {FloorLevel} from "../../../questionnaire/questions/floor-level-question/floor-level";
import {FlatLevel} from "./flat-level";

import includes from 'lodash-es/includes';
import {FloorAreaUnit} from "../../../questionnaire/questions/floor-area-question/floor-area-unit";
import {FuelType} from "../../../questionnaire/questions/fuel-type-question/fuel-type";
import {HomeAge} from "../../../questionnaire/questions/home-age-question/home-age";

export class RdsapInputHelper {
    public static readonly SQUARE_FOOT_PER_SQUARE_METRE: number = 10.7639;
    public static readonly NUMBER_OF_EXPOSED_WALLS_IN_DETACHED_PROPERTY: number = 4;

    public static getPropertyType(homeType: HomeType): PropertyType {
        switch (homeType) {
            case HomeType.DetachedHouse: {
                return PropertyType.House;
            }
            case HomeType.SemiDetachedOrTerracedHouse: {
                return PropertyType.House;
            }
            case HomeType.DetachedBungalow: {
                return PropertyType.Bungalow;
            }
            case HomeType.SemiDetachedBungalow: {
                return PropertyType.Bungalow;
            }
            case HomeType.FlatDuplexOrMaisonette: {
                return PropertyType.Flat;
            }
            case HomeType.ParkHomeOrMobileHome: {
                return PropertyType.ParkHome;
            }
            default: {
                return null;
            }
        }
    }

    public static getBuiltForm(responseData: ResponseData): BuiltForm {
        const homeType = responseData.homeType;
        switch (homeType) {
            case HomeType.DetachedHouse: {
                return BuiltForm.Detached;
            }
            case HomeType.SemiDetachedOrTerracedHouse: {
                return RdsapInputHelper.getBuiltFormForSemiDetachedOrTerracedHouse(responseData.numberOfExposedWallsInHouse);
            }
            case HomeType.DetachedBungalow: {
                return BuiltForm.Detached;
            }
            case HomeType.SemiDetachedBungalow: {
                return BuiltForm.SemiDetached;
            }
            case HomeType.FlatDuplexOrMaisonette: {
                return RdsapInputHelper.getBuiltFormForFlatDuplexOrMaisonette(responseData.numberOfExposedWallsInFlat);
            }
            case HomeType.ParkHomeOrMobileHome: {
                return BuiltForm.Detached;
            }
            default: {
                return null;
            }
        }
    }

    public static getFlatLevel(floorLevels: FloorLevel[]): FlatLevel {
        // For now, we use the lowest floor level as the flat level
        if (!floorLevels) {
            return null;
        }

        const lowestFloorLevel: FloorLevel = floorLevels.sort()[0];
        switch (lowestFloorLevel) {
            case FloorLevel.Basement: {
                return FlatLevel.Basement;
            }
            case FloorLevel.Ground: {
                return FlatLevel.GroundFloor;
            }
            case FloorLevel.MidFloor: {
                return FlatLevel.MidFloor;
            }
            case FloorLevel.TopFloor: {
                return FlatLevel.TopFloor;
            }
        }
    }

    public static getConstructionDateEncoding(homeAge: HomeAge): string {
        const encodingCharacters = 'ABCDEFGHIJKL';
        return encodingCharacters.charAt(homeAge);
    }

    public static getFuelTypeEncoding(fuelType: FuelType): string {
        if (fuelType !== undefined) {
            return fuelType.toString(10);
        }
        return undefined;
    }

    public static getFloorArea(area: number, unit: FloorAreaUnit): number {
        if (area === undefined || unit === undefined) {
            return undefined;
        }

        if (unit === FloorAreaUnit.SquareMetre) {
            return area;
        } else {
            return area / RdsapInputHelper.SQUARE_FOOT_PER_SQUARE_METRE;
        }
    }

    public static getOccupants(responseData: ResponseData): number {
        return responseData.numberOfChildrenAgedUnder5 +
            responseData.numberOfChildrenAged5AndAbove +
            responseData.numberOfAdultsAgedUnder64 +
            responseData.numberOfAdultsAged64To80 +
            responseData.numberOfAdultsAgedOver80;
    }

    public static getWithVulnerableOccupants(responseData: ResponseData): boolean {
        const totalNumberOfVulnerableOccupants =
            responseData.numberOfChildrenAgedUnder5 +
            responseData.numberOfAdultsAged64To80 +
            responseData.numberOfAdultsAgedOver80;
        return totalNumberOfVulnerableOccupants > 0;
    }

    private static getBuiltFormForSemiDetachedOrTerracedHouse(numberOfExposedWallsInHouse: HouseExposedWall): BuiltForm {
        switch (numberOfExposedWallsInHouse) {
            case HouseExposedWall.OneSideExposed: {
                return BuiltForm.EnclosedMidTerrace;
            }
            case HouseExposedWall.TwoSidesExposed: {
                return BuiltForm.MidTerrace;
            }
            case HouseExposedWall.ThreeSidesExposed: {
                return BuiltForm.SemiDetached;
            }
        }
    }

    private static getBuiltFormForFlatDuplexOrMaisonette(numberOfExposedWallsInFlat: FlatExposedWall): BuiltForm {
        switch (numberOfExposedWallsInFlat) {
            case FlatExposedWall.OneSideExposedInset: {
                return BuiltForm.EnclosedMidTerrace;
            }
            case FlatExposedWall.TwoSidesExposedThroughBuilding: {
                return BuiltForm.MidTerrace;
            }
            case FlatExposedWall.TwoSidesExposedCorner: {
                return BuiltForm.MidTerrace;
            }
            case FlatExposedWall.ThreeSidesExposedWholeSide: {
                return BuiltForm.SemiDetached;
            }
            case FlatExposedWall.FourSidesExposedWholeFloor: {
                return BuiltForm.Detached;
            }
        }
    }
}
