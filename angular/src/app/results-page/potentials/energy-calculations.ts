import {EnergyCalculationResponse} from '../../common/energy-calculation-api-service/response/energy-calculation-response';

export class EnergyCalculations {
    currentEnergyBillPoundsPerYear: number;
    potentialEnergyBillSavingPoundsPerYear: number;
    currentEpcRating: string;
    potentialEpcRating: string;

    constructor(
        energyCalculationResponse: EnergyCalculationResponse,
        potentialEnergyBillSavingPoundsPerYear: number
    ) {
        this.currentEnergyBillPoundsPerYear = Math.round(
            energyCalculationResponse['Total-Lighting-Cost'] +
            energyCalculationResponse['Total-Heating-Cost'] +
            energyCalculationResponse['Total-Hot-Water-Cost']);
        this.potentialEnergyBillSavingPoundsPerYear = Math.round(potentialEnergyBillSavingPoundsPerYear);
        this.currentEpcRating = energyCalculationResponse['SAP-Band'];
        // TODO: get potential EPC rating from Energy Calculation API too
        this.potentialEpcRating = null;
    }
}