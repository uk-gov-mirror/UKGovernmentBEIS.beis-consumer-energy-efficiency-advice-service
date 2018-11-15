import {HomeType} from '../home-type-question/home-type';
import {FuelType} from '../fuel-type-question/fuel-type';
import {ElectricityTariff} from '../electricity-tariff-question/electricity-tariff';

export interface EpcConfirmation {
    confirmed: boolean;
    fuelType: FuelType;
    electricityTariff: ElectricityTariff;
}
