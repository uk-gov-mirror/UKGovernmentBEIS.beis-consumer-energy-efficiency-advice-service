export enum FuelType {
    Electricity,
    MainsGas,
    LPGGas,
    HeatingOil,
    SolidFuel
}

export function isGasOrOil(fuelType: FuelType) {
    return fuelType === FuelType.MainsGas ||
        fuelType === FuelType.LPGGas ||
        fuelType === FuelType.HeatingOil;
}

export function isElectric(fuelType: FuelType) {
    return fuelType === FuelType.Electricity;
}