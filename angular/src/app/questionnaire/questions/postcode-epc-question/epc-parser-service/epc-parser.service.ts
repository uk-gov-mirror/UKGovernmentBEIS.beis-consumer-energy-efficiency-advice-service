import {EpcsResponse} from '../model/response/epcs-response';
import {Epc} from '../model/epc';

export abstract class EpcParserService {

    public static parse(epcApiResponse: EpcsResponse): Epc[] {
        if (!epcApiResponse) {
            return [];
        }
        return epcApiResponse.rows
            .map(epcResponse => new Epc(epcResponse))
            .sort(EpcParserService.sortEpcsByAddress);
    }

    static sortEpcsByAddress(a: Epc, b: Epc): number {
        if (a.address2 < b.address2) { return -1 ; }
        if (a.address2 > b.address2) { return 1; }
        if (a.address1 < b.address1) { return -1; }
        if (a.address1 > b.address1) { return 1; }
    }
}
