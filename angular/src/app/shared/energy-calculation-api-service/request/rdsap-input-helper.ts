import {HomeType} from "../../../questionnaire/questions/home-type-question/home-type";
import {PropertyType} from "./property-type";
import {ResponseData} from "../../response-data/response-data";
import {BuiltForm} from "./built-form";
import {FlatExposedWall} from "../../../questionnaire/questions/flat-exposed-wall-question/flat-exposed-wall";
import {FloorLevel} from "../../../questionnaire/questions/floor-level-question/floor-level";
import {FlatLevel} from "./flat-level";
import toString from 'lodash-es/toString';
import {FloorAreaUnit} from "../../../questionnaire/questions/floor-area-question/floor-area-unit";
import {FuelType} from "../../../questionnaire/questions/fuel-type-question/fuel-type";
import {HomeAge} from "../../../questionnaire/questions/home-age-question/home-age";
import {RdSapInput} from "./rdsap-input";
import {BuiltFormAnswer} from "../../../questionnaire/questions/built-form-question/built-form-answer";

export class RdsapInputHelper {
    public static readonly SQUARE_FOOT_PER_SQUARE_METRE: number = 10.7639;

    public static getPropertyType(homeType: HomeType): PropertyType {
        switch (homeType) {
            case HomeType.House: {
                return PropertyType.House;
            }
            case HomeType.Bungalow: {
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
            case HomeType.House:
            case HomeType.Bungalow: {
                return RdsapInputHelper.getBuiltFormForHouseOrBungalow(responseData.builtForm);
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

    public static getAdditionalRequirementsForMissingEpc(rdsapInput: RdSapInput): string[] {
        const output: string[] = [];

        output.push(rdsapInput.property_type);
        output.push(rdsapInput.built_form);

        if (!rdsapInput.floor_area) {
            output.push(toString(rdsapInput.num_bedrooms));
        }

        return output;
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

    private static getBuiltFormForHouseOrBungalow(builtForm: BuiltFormAnswer): BuiltForm {
        switch (builtForm) {
            case BuiltFormAnswer.Detached: {
                return BuiltForm.Detached;
            }
            case BuiltFormAnswer.SemiDetached: {
                return BuiltForm.SemiDetached;
            }
            case BuiltFormAnswer.MidTerrace: {
                return BuiltForm.MidTerrace;
            }
            case BuiltFormAnswer.EndTerrace: {
                return BuiltForm.EndTerrace;
            }
            case BuiltFormAnswer.EnclosedMidTerrace: {
                return BuiltForm.EnclosedMidTerrace;
            }
            case BuiltFormAnswer.EnclosedEndTerrace: {
                return BuiltForm.EnclosedEndTerrace;
            }
            default: {
                return null;
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
