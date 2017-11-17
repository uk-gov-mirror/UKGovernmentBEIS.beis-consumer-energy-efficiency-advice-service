import {Epc} from "../../../../shared/epc-api-service/model/epc";

export interface PostcodeEpc {
    epc: Epc;
    postcode: string;
    localAuthorityCode: string;
}