import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {EpcParserService} from './epc-parser.service';
import groupBy from 'lodash-es/groupBy';
import keys from 'lodash-es/keys';
import orderBy from 'lodash-es/orderBy';
import head from 'lodash-es/head';
import {Epc} from '../model/epc';
import {EpcRecommendation} from '../../epc-api-service/model/response/epc-recommendation';
import {WordpressApiService} from '../../wordpress-api-service/wordpress-api-service';
import {JsonApiResponse} from '../../epc-api-service/model/response/json-api-response';
import {EpcResponse} from '../model/response/epc-response';
import {EpcRecommendationResponse} from '../../epc-api-service/model/response/epc-recommendation-response';

@Injectable()
export class EpcApiService {
    private static readonly epcSearchEndpoint = 'angular-theme/v1/epc';
    private static readonly recommendationEndpoint = 'angular-theme/v1/epc-recommendations';
    static readonly MAX_NUMBER_OF_EPCS_PER_RESPONSE: number = 100;

    private epcs: {[postcode: string]: Observable<Epc[]>} = {};
    private recommendations: {[lmkKey: string]: Observable<EpcRecommendation[]>} = {};

    constructor(private http: HttpClient,
                private wordpressApiService: WordpressApiService) {
    }

    getEpcsForPostcode(postcode: string): Observable<Epc[]> {
        if (!this.epcs[postcode]) {
            const params = new HttpParams()
                .set('postcode', postcode)
                .set('size', EpcApiService.MAX_NUMBER_OF_EPCS_PER_RESPONSE.toString());
            this.epcs[postcode] = this.http
                .get(this.wordpressApiService.getFullApiEndpoint(EpcApiService.epcSearchEndpoint), {params: params})
                .map((result: JsonApiResponse<EpcResponse>) => EpcParserService.parse(result))
                .map(epcs => this.getMostRecentEpcs(epcs))
                .shareReplay(1);
        }
        return this.epcs[postcode];
    }

    getRecommendationsForLmkKey(lmkKey: string): Observable<EpcRecommendation[]> {
        if (!this.recommendations[lmkKey]) {
            const params = new HttpParams().set('lmkKey', lmkKey);
            this.recommendations[lmkKey] = this.http
                .get(this.wordpressApiService.getFullApiEndpoint(EpcApiService.recommendationEndpoint), {params: params})
                .map((result: JsonApiResponse<EpcRecommendationResponse>) =>
                    result.rows.map(recResponse => new EpcRecommendation(recResponse)))
                .shareReplay(1);
        }
        return this.recommendations[lmkKey];
    }

    private getMostRecentEpcs(epcs: Epc[]): Epc[] {
        const epcsByAddress: {[address: string]: Epc[]} = groupBy(epcs, epc => epc.getDisplayAddress());
        return keys(epcsByAddress)
            .map(address => {
                const allEpcsForPostcodeSortedByDate = orderBy(epcsByAddress[address], ['epcDate'], ['desc']);
                return head(allEpcsForPostcodeSortedByDate);
            });
    }
}
