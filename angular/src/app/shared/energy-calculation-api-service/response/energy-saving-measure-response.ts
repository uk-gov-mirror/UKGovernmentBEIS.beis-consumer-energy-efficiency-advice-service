import {MeasureResponse} from "./measure-response";

export class EnergySavingMeasureResponse implements MeasureResponse {
    constructor(public cost_saving: number,
                public energy_saving: number,
                public number: string,
                public FIT: number,
                public RHI: number) {
    }
}