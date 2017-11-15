import {Epc} from "../../../shared/epc-api-service/model/epc";
export enum ElectricityTariff {
    Standard,
    OffPeak,
}

export function getElectricityTariffDescription(electricityTariff: ElectricityTariff) {
    switch (electricityTariff) {
        case ElectricityTariff.Standard: {
            return 'standard';
        }
        case ElectricityTariff.OffPeak: {
            return 'off peak';
        }
        default: {
            return null;
        }
    }
}

export function getElectricityTariffFromEpc(epc: Epc): ElectricityTariff {
    if (epc.hotWaterDescription && epc.hotWaterDescription.includes('off-peak')) {
        return ElectricityTariff.OffPeak;
    } else if (epc.hotWaterDescription && epc.hotWaterDescription.includes('standard tariff')) {
        return ElectricityTariff.Standard;
    } else {
        return null;
    }
}