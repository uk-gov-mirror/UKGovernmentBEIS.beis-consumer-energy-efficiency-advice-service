import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {WordpressApiService} from "../wordpress-api-service/wordpress-api-service";
import {NationalGrantResponse} from "./national-grants-response";

@Injectable()
export class NationalGrantsService {
    private static readonly nationalGrantsEndpoint = 'acf/v3/national_grant';
    private nationalGrants: Observable<NationalGrantResponse[]>;

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    fetchNationalGrants(): Observable<NationalGrantResponse[]> {
        if (!this.nationalGrants) {
            this.nationalGrants = this.http.get(this.wordpressApiService.getFullApiEndpoint(NationalGrantsService.nationalGrantsEndpoint))
                .shareReplay(1);
        }
        return this.nationalGrants;
    }
}
