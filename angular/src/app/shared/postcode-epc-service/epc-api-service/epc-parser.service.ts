import {Epc} from "../model/epc";
import {EpcsResponse} from "../model/response/epcs-response";

export abstract class EpcParserService {

    public static parse(epcApiResponse: EpcsResponse): Epc[] {
        if (!epcApiResponse) {
            return [];
        }
        return epcApiResponse.rows
            .map(epcResponse => new Epc(epcResponse));
    }

    static sortEpcsByHouseNumberOrAlphabetically(a: Epc, b: Epc): number {
        const houseNumberA = a.getHouseNumber();
        const houseNumberB = b.getHouseNumber();
        if (houseNumberA && houseNumberB) {
            if (a.getHouseNumber() < b.getHouseNumber()) { return -1; }
            if (a.getHouseNumber() > b.getHouseNumber()) { return 1; }
            return EpcParserService.sortEpcsAlphabetically(a, b);
        }
        if (houseNumberA) { return -1; }
        if (houseNumberB) { return 1; }
        return EpcParserService.sortEpcsAlphabetically(a, b);
    }

    static sortEpcsAlphabetically(a: Epc, b: Epc): number {
        if (a.address2 < b.address2) { return -1 ; }
        if (a.address2 > b.address2) { return 1; }
        if (a.address1 < b.address1) { return -1; }
        if (a.address1 > b.address1) { return 1; }
        return 0;
    }
}
