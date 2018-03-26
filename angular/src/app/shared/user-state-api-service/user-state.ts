import {ResponseData} from "../response-data/response-data";

export interface UserState {
    responseData: ResponseData;
    url: string;
    questionIndex?: number;
}
