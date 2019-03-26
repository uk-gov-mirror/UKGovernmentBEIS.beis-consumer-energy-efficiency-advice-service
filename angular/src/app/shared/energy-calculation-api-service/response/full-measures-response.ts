import {MeasureResponse} from './measure-response';
import {MeasuresResponse} from "./measures-response";

export interface FullMeasuresResponse<T extends MeasureResponse> {
    userMeasures: MeasuresResponse<T>;
    landlordMeasures: MeasuresResponse<T>;
}
