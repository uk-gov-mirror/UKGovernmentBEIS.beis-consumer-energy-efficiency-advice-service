import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {WordpressApiService} from "../wordpress-api-service/wordpress-api-service";
import {LocalAuthorityResponse, LocalGrantResponse} from "./local-authority-response";

@Injectable()
export class LocalAuthorityService {
    private static readonly localAuthorityEndpoint = 'angular-theme/v1/local-authority/';
    private localAuthorities: {
        [localAuthorityCode: string]: Observable<LocalAuthorityResponse>
    };

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
        this.localAuthorities = {};
    }

    fetchLocalAuthorityGrants(localAuthorityCode: string): Observable<LocalGrantResponse[]> {
        return this.fetchLocalAuthorityDetails(localAuthorityCode)
            .map(response => response.grants);
    }

    fetchLocalAuthorityName(localAuthorityCode: string): Observable<string> {
        return this.fetchLocalAuthorityDetails(localAuthorityCode)
            .map(response => response.display_name);
    }

    fetchLocalAuthorityEcoFlexStatus(localAuthorityCode: string): Observable<boolean> {
        return this.fetchLocalAuthorityDetails(localAuthorityCode)
            .map(response => response.is_eco_flex_active);
    }

    private fetchLocalAuthorityDetails(localAuthorityCode: string): Observable<LocalAuthorityResponse> {
        if (!this.localAuthorities[localAuthorityCode]) {
            const endpoint = LocalAuthorityService.localAuthorityEndpoint + localAuthorityCode;
            this.localAuthorities[localAuthorityCode] = this.http.get(this.wordpressApiService.getFullApiEndpoint(endpoint))
                .shareReplay(1);
        }
        return this.localAuthorities[localAuthorityCode];
    }
}
