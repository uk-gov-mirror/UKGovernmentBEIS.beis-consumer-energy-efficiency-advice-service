import {Epc} from '../../../shared/postcode-epc-service/model/epc';
import includes from 'lodash-es/includes';

// The indices here are BRE constants; do not change them unless BRE have changed
export enum ElectricityTariff {
    Standard = 1,
    OffPeak = 2,
}

export function getElectricityTariffDescription(electricityTariff: ElectricityTariff) {
    switch (electricityTariff) {
        case ElectricityTariff.Standard: {
            return 'a standard';
        }
        case ElectricityTariff.OffPeak: {
            return 'an off peak';
        }
        default: {
            return null;
        }
    }
}

export function getElectricityTariffFromEpc(epc: Epc): ElectricityTariff {
    if (epc.hotWaterDescription && includes(epc.hotWaterDescription, 'off-peak')) {
        return ElectricityTariff.OffPeak;
    } else if (epc.hotWaterDescription && includes(epc.hotWaterDescription, 'standard tariff')) {
        return ElectricityTariff.Standard;
    } else {
        return null;
    }
}
