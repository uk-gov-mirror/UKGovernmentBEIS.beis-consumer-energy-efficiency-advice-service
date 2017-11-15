import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {EpcsResponse} from "./model/response/epcs-response";
import {WordpressApiService} from "../wordpress-api-service/wordpress-api-service";
import {Epc} from "./model/epc";
import {EpcParserService} from "./epc-parser.service";
import groupBy from "lodash-es/groupBy";
import keys from "lodash-es/keys";
import orderBy from "lodash-es/orderBy";
import head from "lodash-es/head";

@Injectable()
export class EpcApiService {
    private static readonly epcEndpoint = 'angular-theme/v1/epc';
    static readonly MAX_NUMBER_OF_EPCS_PER_RESPONSE: number = 100;

    private epcs: {[postcode: string]: Observable<Epc[]>} = {};

    constructor(private http: HttpClient,
                private wordpressApiService: WordpressApiService) {
    }

    getEpcData(postcode: string): Observable<Epc[]> {
        if (!this.epcs[postcode]) {
            const params = new HttpParams()
                .set('postcode', postcode)
                .set('size', EpcApiService.MAX_NUMBER_OF_EPCS_PER_RESPONSE.toString());
            this.epcs[postcode] = this.http
                .get(this.wordpressApiService.getFullApiEndpoint(EpcApiService.epcEndpoint), {params: params})
                .map(result => EpcParserService.parse(result as EpcsResponse))
                .map(epcs => this.getMostRecentEpcs(epcs))
                .shareReplay(1);
        }
        return this.epcs[postcode];
    }

    private getMostRecentEpcs(epcs: Epc[]): Epc[] {
        const epcsByAddress: {[address: string]: Epc[]} = groupBy(epcs, epc => epc.getDisplayAddress());
        return keys(epcsByAddress)
            .map(address => {
                const allEpcsForPostcodeSortedByDate = orderBy(epcsByAddress[address], ['epcDate'], ['desc']);
                return head(allEpcsForPostcodeSortedByDate)
            });
    }
}
