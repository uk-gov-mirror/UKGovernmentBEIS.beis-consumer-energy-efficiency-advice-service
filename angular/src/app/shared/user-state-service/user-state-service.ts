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

    sendState(questionIndex?: number) {
        if (this.reference) {
            this.userStateApiService.sendStateUsingSessionReference(this.reference, this.buildUserState(questionIndex));
        } else {
            this.userStateApiService.sendNewState(this.buildUserState(questionIndex))
                .subscribe(reference => {
                    this.reference = reference;
                });
        }
    }

    joinSession(reference: string, onError: (error) => void) {
        this.userStateApiService.fetchUserStateBySessionReference(reference)
            .subscribe(state => {
                this.reference = reference;
                replaceOldResponseData(this.responseData, state.responseData);
                if (state.questionIndex) {
                    this.router.navigate([state.url], {queryParams: {startingQuestion: state.questionIndex}});
                } else {
                    this.router.navigate([state.url]);
                }
            }, onError);
    }

    private buildUserState(questionIndex?: number): UserState {
        const userState: UserState = {
            responseData: this.responseData,
            // TODO BEISDEAS-180 Make this more robust
            url: this.location.path().split('?')[0]
        };
        if (questionIndex) {
            userState.questionIndex = questionIndex;
        }
        return userState;
    }
}
