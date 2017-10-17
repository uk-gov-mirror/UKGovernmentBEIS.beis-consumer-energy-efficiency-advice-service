export enum FuelType {
    Electricity,
    MainsGas,
    LPGGas,
    HeatingOil,
    SolidFuel
}

export function isElectric(fuelType: FuelType) {
    return fuelType === FuelType.Electricity;
}