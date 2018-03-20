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

    fetchUserStateByReference(reference: string): Observable<UserState> {
        return this.http.get<UserStateResponse>(this.getFullApiEndpoint(reference))
            .map(response => response.state);
    }

    sendNewState(state: UserState): Observable<string> {
        return this.http.post(
            this.getFullApiEndpoint(),
            state,
            // Response type is needed for an empty response, see https://github.com/angular/angular/issues/18680
            {observe: 'response', responseType: 'text'}
        ).map(response =>
            UserStateApiService.getReferenceFromLocationHeader(response.headers.get('location'))
        );
    }

    sendStateUsingReference(reference: string, state: UserState) {
        this.http.put(this.getFullApiEndpoint(reference), state, {responseType: 'text'})
            .subscribe();
    }

    private getFullApiEndpoint(path?: string): string {
        if (path) {
            const encodedPath = encodeURIComponent(path);
            return this.location.prepareExternalUrl(UserStateApiService.USER_STATE_API_ROOT + encodedPath);
        }
        return this.location.prepareExternalUrl(UserStateApiService.USER_STATE_API_ROOT);
    }

    private static getReferenceFromLocationHeader(header: string) {
        const locationComponents = header.split(UserStateApiService.USER_STATE_API_ROOT);
        return locationComponents[locationComponents.length - 1];
    }
}
