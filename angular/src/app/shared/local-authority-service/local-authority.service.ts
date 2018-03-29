import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {LocalAuthorityResponse} from './local-authority-response';
import {LocalAuthority} from './local-authority';
import Config from '../../config';

@Injectable()
export class LocalAuthorityService {
    private readonly localAuthorityEndpoint = Config().apiRoot + '/local-authority/';
    private localAuthorities: {
        [localAuthorityCode: string]: Observable<LocalAuthority>
    };

    constructor(private http: HttpClient) {
        this.localAuthorities = {};
    }

    fetchLocalAuthorityDetails(localAuthorityCode: string): Observable<LocalAuthority> {
        if (!this.localAuthorities[localAuthorityCode]) {
            const endpoint = this.localAuthorityEndpoint +
                encodeURIComponent(localAuthorityCode);
            this.localAuthorities[localAuthorityCode] = this.http.get(endpoint)
                .map((response: LocalAuthorityResponse) => new LocalAuthority(response))
                .shareReplay(1);
        }
        return this.localAuthorities[localAuthorityCode];
    }
}
