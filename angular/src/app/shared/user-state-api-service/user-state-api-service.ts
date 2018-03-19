import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseData} from "../response-data/response-data";
import {UserState} from "./user-state";

@Injectable()
export class UserStateApiService {
    private static readonly USER_STATE_API_ROOT = '/api/userState/';

    private reference: string;

    constructor(private http: HttpClient, private location: Location, private responseData: ResponseData) {
    }

    sendState() {
        if (this.reference) {
            this.sendStateUsingReference();
        } else {
            this.sendNewState();
        }
    }

    private sendNewState() {
        this.http.post(
            this.getFullApiEndpoint(),
            this.getUserState(),
            // Response type is needed for an empty response, see https://github.com/angular/angular/issues/18680
            {observe: 'response', responseType: 'text'}
        )
            .subscribe(response => {
                this.reference = UserStateApiService.getReferenceFromLocationHeader(response.headers.get('location'));
                console.log(this.reference);
            });
    }

    private sendStateUsingReference() {
        this.http.put(this.getFullApiEndpoint(this.reference), this.getUserState(), {responseType: 'text'})
            .subscribe();
    }

    private getUserState(): UserState {
        return {
            responseData: this.responseData,
            url: this.location.path()
        };
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
