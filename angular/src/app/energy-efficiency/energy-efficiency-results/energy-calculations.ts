import {EnergyCalculationResponse} from '../../shared/energy-calculation-api-service/response/energy-calculation-response';

export class EnergyCalculations {
    currentEnergyBillPoundsPerYear: number;
    potentialEnergyBillSavingPoundsPerYear: number;
    currentScore: number;
    currentEpcRating: string;
    potentialEpcRating: string;

    currentMonthlyBillPoundsRounded: number;
    currentCo2EmissionsPerYearTonnes: number;

    constructor(energyCalculationResponse: EnergyCalculationResponse,
                potentialEnergyBillSavingPoundsPerYear: number) {
        this.currentEnergyBillPoundsPerYear = Math.round(
            energyCalculationResponse['Total-Lighting-Cost'] +
            energyCalculationResponse['Total-Heating-Cost'] +
            energyCalculationResponse['Total-Hot-Water-Cost']);
        const currentMonthlyBillPoundsUnrounded = this.currentEnergyBillPoundsPerYear / 12;
        this.currentMonthlyBillPoundsRounded = Math.round(currentMonthlyBillPoundsUnrounded * 100) / 100;
        this.potentialEnergyBillSavingPoundsPerYear = Math.round(potentialEnergyBillSavingPoundsPerYear);
        this.currentEpcRating = energyCalculationResponse['Current-SAP-Band'];
        this.currentScore = parseInt(energyCalculationResponse['Current-SAP-Rating']);
        this.potentialEpcRating = null;
        const co2EmissionsPerYearTonnesUnrounded = energyCalculationResponse['Total-CO2-Emissions'] / 1000;
        this.currentCo2EmissionsPerYearTonnes = Math.round(co2EmissionsPerYearTonnesUnrounded * 10) / 10;
    }
}
