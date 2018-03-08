import {Epc} from '../../../shared/postcode-epc-service/model/epc';
import includes from 'lodash-es/includes';

export enum FuelType {
    Electricity = 29,
    MainsGas = 26,
    LPGGas = 27,
    HeatingOil = 28,
    SolidFuel = 9
}

export function isGasOrOil(fuelType: FuelType) {
    return fuelType === FuelType.MainsGas ||
        fuelType === FuelType.LPGGas ||
        fuelType === FuelType.HeatingOil;
}

export function isElectric(fuelType: FuelType) {
    return fuelType === FuelType.Electricity;
}

export function getFuelTypeDescription(fuelType: FuelType): string {
    switch (fuelType) {
        case FuelType.Electricity:  { return 'electricity'; }
        case FuelType.MainsGas:     { return 'mains gas'; }
        case FuelType.LPGGas:       { return 'LPG gas'; }
        case FuelType.HeatingOil:   { return 'heating oil'; }
        case FuelType.SolidFuel:    { return 'solid fuel'; }
        default:                    { return null; }
    }
}

export function getFuelTypeFromEpc(epc: Epc): FuelType {
    // TODO:BEIS-15 this is very fragile!
    if (epc.mainHeatDescription && includes(epc.mainHeatDescription, 'mains gas')) {
        return FuelType.MainsGas;
    } else if (epc.mainFuel && includes(epc.mainFuel, 'mains gas')) {
        return FuelType.MainsGas;
    } else if (epc.mainHeatDescription && includes(epc.mainHeatDescription, 'electric')) {
        return FuelType.Electricity;
    } else if (epc.mainFuel && includes(epc.mainFuel, 'electric')) {
        return FuelType.Electricity;
    } else {
        return null;
    }
}
