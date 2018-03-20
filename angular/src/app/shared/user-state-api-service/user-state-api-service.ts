import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserState} from "./user-state";
import {Observable} from "rxjs/Observable";
import {UserStateResponse} from "./user-state-response";

@Injectable()
export class UserStateApiService {
    private static readonly USER_STATE_API_ROOT = '/api/userState/';

    constructor(private http: HttpClient, private location: Location) {
    }

    fetchUserStateBySessionReference(sessionReference: string): Observable<UserState> {
        return this.http.get<UserStateResponse>(this.getFullApiEndpoint(sessionReference))
            .map(response => JSON.parse(response.state));
    }

    sendNewState(state: UserState): Observable<string> {
        return this.http.post(
            this.getFullApiEndpoint(),
            state,
            // Response type is needed for an empty response, see https://github.com/angular/angular/issues/18680
            {observe: 'response', responseType: 'text'}
        ).map(response =>
            UserStateApiService.getSessionIdFromLocationHeader(response.headers.get('location'))
        );
    }

    sendStateUsingSessionReference(sessionReference: string, state: UserState) {
        this.http.put(this.getFullApiEndpoint(sessionReference), state, {responseType: 'text'})
            .subscribe();
    }

    private getFullApiEndpoint(path?: string): string {
        if (path) {
            const encodedPath = encodeURIComponent(path);
            return this.location.prepareExternalUrl(UserStateApiService.USER_STATE_API_ROOT + encodedPath);
        }
        return this.location.prepareExternalUrl(UserStateApiService.USER_STATE_API_ROOT);
    }

    private static getSessionIdFromLocationHeader(header: string) {
        const result = /\/api\/userState\/(.*)/.exec(header);
        if (result) {
            return decodeURIComponent(result[1]);
        } else {
            throw new Error(`Bad header format: ${header}`);
        }
    }
}
