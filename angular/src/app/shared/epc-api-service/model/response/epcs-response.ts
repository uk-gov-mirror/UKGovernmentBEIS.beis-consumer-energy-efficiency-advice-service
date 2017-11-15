import {EpcResponse} from "./epc-response";

export interface EpcsResponse {
    'column-names': string[];
    rows: EpcResponse[];
}
