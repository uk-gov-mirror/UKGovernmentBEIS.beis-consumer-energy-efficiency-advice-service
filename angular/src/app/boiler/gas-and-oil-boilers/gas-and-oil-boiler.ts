import {FuelType} from "../../questionnaire/questions/fuel-type-question/fuel-type";
import {BoilerJson} from "./gas-and-oil-boilers.service";

export class GasAndOilBoiler {
    constructor(public productIndexNumber: string,
                public name: string,
                public fuelType: FuelType,
                public efficiency: number) {
    }

    private static readonly fuelCodes = {
        1: FuelType.MainsGas,
        2: FuelType.LPGGas,
        3: FuelType.LPGGas,
        9: FuelType.LPGGas,
        4: FuelType.HeatingOil,
    };

    private static fuelTypeFromCode(fuelCode: string) {
        if (GasAndOilBoiler.fuelCodes.hasOwnProperty(fuelCode)) {
            return GasAndOilBoiler.fuelCodes[fuelCode]
        } else {
            return undefined;
        }
    }

    static fromJson(boilerJson: BoilerJson) {
        return new GasAndOilBoiler(
            boilerJson.productIndexNumber,
            boilerJson.name,
            GasAndOilBoiler.fuelTypeFromCode(boilerJson.fuel),
            +boilerJson.sap2005SeasonalEfficiency,
        );
    }
}