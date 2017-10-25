import {Epc} from './epc';

export interface PostcodeEpc {
    epc: Epc;
    postcode: string;
    localAuthorityCode: string;
}