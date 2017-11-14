import {EnergySavingMeasureResponse} from "./energy-saving-measure-response";

export interface EnergyCalculationResponse {
    'Total-Energy-Consumption': number,
    'Total-CO2-Emissions': number,
    'Total-Lighting-Cost': number,
    'Total-Energy-Cost': number,
    'Total-Heating-Cost': number,
    'Total-Hot-Water-Cost': number,
    'Current-SAP-Band': string,
    'Potential-SAP-Band': string,
    measures: {
        [measureCode: string]: EnergySavingMeasureResponse
    }
}