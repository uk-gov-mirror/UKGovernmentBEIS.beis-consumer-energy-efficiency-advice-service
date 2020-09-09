import {MeasureResponse} from './measure-response';

export interface EnergySavingMeasureResponse extends MeasureResponse {
    number: string;
    lifetime: number;
    max_installation_cost: number;
    min_installation_cost: number;
    FIT: number;
    RHI: number;
    isBreRange: boolean;
}

export function isEnergySavingMeasureResponse(measure: MeasureResponse): measure is EnergySavingMeasureResponse {
    return (<EnergySavingMeasureResponse>measure).number !== undefined;
}
