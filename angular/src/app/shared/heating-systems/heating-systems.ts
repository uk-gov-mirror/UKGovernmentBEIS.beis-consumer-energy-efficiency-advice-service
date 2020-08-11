import {ResponseData} from "../response-data/response-data";
import {GardenAccessibility} from "../../questionnaire/questions/garden-question/garden-accessibility";
import {GlazingType, RoofType, WallType} from "../../questionnaire/questions/construction-question/construction-types";
import {WaterTankSpace} from "../../questionnaire/questions/water-tank-question/water-tank-space";
import {RoofSpace} from "../../questionnaire/questions/roof-space-question/roof-space";

export function shouldRecommendGroundSourceHeatPump(responseData: ResponseData): boolean {
    return hasLargeGarden(responseData) && isWellInsulated(responseData);
}

export function shouldRecommendAirSourceHeatPump(responseData: ResponseData): boolean {
    return responseData.gardenAccessibility !== GardenAccessibility.NoGarden && isWellInsulated(responseData);
}

export function shouldRecommendSolarWaterHeater(responseData: ResponseData): boolean {
    return responseData.waterTankSpace !== WaterTankSpace.None && responseData.roofSpace !== RoofSpace.NoSpace;
}

function hasLargeGarden(responseData: ResponseData) {
    return responseData.gardenAccessibility === GardenAccessibility.Accessible &&
        responseData.gardenSizeSquareMetres >= 400;
}

function isWellInsulated(responseData: ResponseData) {
    return responseData.roofType !== RoofType.PitchedNoInsulation && responseData.roofType !== RoofType.FlatNoInsulation  &&
        responseData.wallType !== WallType.CavityNoInsulation  && responseData.wallType !== WallType.SolidNoInsulation &&
        responseData.glazingType !== GlazingType.Single;
}
