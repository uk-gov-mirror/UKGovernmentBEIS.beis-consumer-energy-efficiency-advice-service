import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {EpcsResponse} from "../model/response/epc/epcs-response";
import {WordpressApiService} from "../../../../../../shared/wordpress-api-service/wordpress-api-service";

@Injectable()
export class EpcApiService {
    private static readonly epcEndpoint = 'angular-theme/v1/epc';
    static readonly MAX_NUMBER_OF_EPCS_PER_RESPONSE: number = 100;

    private epcs: {[postcode: string]: Observable<EpcsResponse>} = {};

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    getEpcData(postcode: string): Observable<EpcsResponse> {
        if (!this.epcs[postcode]) {
            const params = new HttpParams()
                .set('postcode', postcode)
                .set('size', EpcApiService.MAX_NUMBER_OF_EPCS_PER_RESPONSE.toString());
            this.epcs[postcode] = this.http.get(this.wordpressApiService.getFullApiEndpoint(EpcApiService.epcEndpoint), {params: params})
                .shareReplay(1);
        }
        return this.epcs[postcode];
    }
}
