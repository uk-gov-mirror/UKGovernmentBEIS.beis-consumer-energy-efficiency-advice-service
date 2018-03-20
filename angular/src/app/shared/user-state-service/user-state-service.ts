import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ResponseData} from "../response-data/response-data";
import {UserState} from "../user-state-api-service/user-state";
import {UserStateApiService} from "../user-state-api-service/user-state-api-service";

@Injectable()
export class UserStateService {
    private reference: string;

    constructor(
        private userStateApiService: UserStateApiService,
        private location: Location,
        private router: Router,
        private responseData: ResponseData) {}

    sendState() {
        if (this.reference) {
            this.userStateApiService.sendStateUsingReference(this.reference, this.buildUserState());
        } else {
            this.userStateApiService.sendNewState(this.buildUserState())
                .subscribe(reference => {
                    this.reference = reference;
                });
        }
    }

    joinSession(reference: string) {
        this.userStateApiService.fetchUserStateByReference(reference)
            .subscribe(state => {
                this.reference = reference;
                // TODO BEISDEAS-179 Set reference data
                this.router.navigate([state.url]);
            });
    }

    private buildUserState(): UserState {
        return {
            responseData: this.responseData,
            url: this.location.path()
        };
    }
}
