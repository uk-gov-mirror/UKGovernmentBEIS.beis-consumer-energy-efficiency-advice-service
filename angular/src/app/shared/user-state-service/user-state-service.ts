import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {replaceOldResponseData, ResponseData} from "../response-data/response-data";
import {UserState} from "../user-state-api-service/user-state";
import {UserStateApiService} from "../user-state-api-service/user-state-api-service";

@Injectable()
export class UserStateService {
    // The user's unique session reference
    private reference: string;

    constructor(
        private userStateApiService: UserStateApiService,
        private location: Location,
        private router: Router,
        private responseData: ResponseData) {}

    sendState() {
        if (this.reference) {
            this.userStateApiService.sendStateUsingSessionReference(this.reference, this.buildUserState());
        } else {
            this.userStateApiService.sendNewState(this.buildUserState())
                .subscribe(reference => {
                    this.reference = reference;
                });
        }
    }

    joinSession(reference: string, onError: () => void) {
        this.userStateApiService.fetchUserStateBySessionReference(reference)
            .subscribe(state => {
                this.reference = reference;
                replaceOldResponseData(this.responseData, state.responseData);
                this.router.navigate([state.url]);
            }, onError);
    }

    private buildUserState(): UserState {
        return {
            responseData: this.responseData,
            url: this.location.path()
        };
    }
}
