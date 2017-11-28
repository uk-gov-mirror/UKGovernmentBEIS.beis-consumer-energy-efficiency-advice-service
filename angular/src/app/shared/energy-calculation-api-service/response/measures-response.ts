import {MeasureResponse} from "./measure-response";

export interface MeasuresResponse<T extends MeasureResponse> {
    [measureCode: string]: T;
}