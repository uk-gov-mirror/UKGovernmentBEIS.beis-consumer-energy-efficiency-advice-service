import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {WordpressApiService} from "../../shared/wordpress-api-service/wordpress-api-service";
import {LocalAuthorityResponse} from "./local-authority-response";

@Injectable()
export class LocalAuthorityService {
    private static readonly localAuthorityEndpoint = 'angular-theme/v1/local-authority/';
    private localAuthorities: {
        [localAuthorityCode: string]: Observable<LocalAuthorityResponse>
    };

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
        this.localAuthorities = {};
    }

    fetchLocalAuthorityDetails(localAuthorityCode: string): Observable<LocalAuthorityResponse> {
        if (!this.localAuthorities[localAuthorityCode]) {
            const endpoint = LocalAuthorityService.localAuthorityEndpoint + localAuthorityCode;
            this.localAuthorities[localAuthorityCode] = this.http.get(this.wordpressApiService.getFullApiEndpoint(endpoint))
                .shareReplay(1);
        }
        return this.localAuthorities[localAuthorityCode];
    }
}
