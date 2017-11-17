import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {WordpressApiService} from "../wordpress-api-service/wordpress-api-service";
import {LocalAuthorityResponse, LocalGrantResponse} from "./local-authority-response";
import {LocalAuthority} from "./local-authority";
import {LocalAuthorityGrantViewModel} from "../grant/local-authority-grant-view-model";

@Injectable()
export class LocalAuthorityService {
    private static readonly localAuthorityEndpoint = 'angular-theme/v1/local-authority/';
    private localAuthorities: {
        [localAuthorityCode: string]: Observable<LocalAuthority>
    };

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
        this.localAuthorities = {};
    }

    fetchLocalAuthorityDetails(localAuthorityCode: string): Observable<LocalAuthority> {
        if (!this.localAuthorities[localAuthorityCode]) {
            const endpoint = LocalAuthorityService.localAuthorityEndpoint + localAuthorityCode;
            this.localAuthorities[localAuthorityCode] = this.http.get(this.wordpressApiService.getFullApiEndpoint(endpoint))
                .map((response: LocalAuthorityResponse) => new LocalAuthority(response))
                .shareReplay(1);
        }
        return this.localAuthorities[localAuthorityCode];
    }
}