import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {EpcApiResult} from "./epc-api-result";
import {WordpressApiService} from "../../common/wordpress-api-service/wordpress-api-service";

@Injectable()
export class PostcodeEpcService {
    private static readonly epcEndpoint = 'angular-theme/v1/postcode-epc';

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    getEpcData(postcode: string, number: number): Observable<EpcApiResult> {
        const params = new HttpParams().set('postcode', postcode).set('number', number.toString());
        return this.http.get(this.wordpressApiService.getFullApiEndpoint(PostcodeEpcService.epcEndpoint), {params: params});
    }
}
