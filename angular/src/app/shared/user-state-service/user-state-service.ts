import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
    replaceOldResponseData,
    ResponseData,
} from '../response-data/response-data';
import {UserState} from '../user-state-api-service/user-state';
import {UserStateApiService} from '../user-state-api-service/user-state-api-service';

@Injectable()
export class UserStateService {
    // The user's unique session reference
    private reference: string;
    private referencePromise: Promise<string>;
    private resolveReference: (reference: string) => void;

    constructor(
        private userStateApiService: UserStateApiService,
        private location: Location,
        private router: Router,
        private responseData: ResponseData) {

        // The "need-help" component may request the reference before it has been generated
        // We instead return a promise of the reference, that is resolved once the backend has generated it
        this.referencePromise = new Promise(resolve => {
            this.resolveReference = resolve;
        });
    }

    saveState(questionIndex?: number) {
        this.responseData.saveToSessionStorage();

        if (this.reference) {
            this.userStateApiService.sendStateUsingSessionReference(this.reference, this.buildUserState(questionIndex));
        } else {
            this.userStateApiService.sendNewState(this.buildUserState(questionIndex))
                .subscribe(reference => {
                    this.reference = reference;
                    this.resolveReference(reference);
                });
        }
    }

    joinSession(reference: string, onError: (error) => void) {
        this.userStateApiService.fetchUserStateBySessionReference(reference)
            .subscribe(state => {
                this.reference = reference;
                this.referencePromise = Promise.resolve( this.reference);
                replaceOldResponseData(this.responseData, state.responseData);
                if (state.questionIndex) {
                    this.router.navigate([state.url], {queryParams: {startingQuestion: state.questionIndex}});
                } else {
                    this.router.navigate([state.url]);
                }
            }, onError);
    }

    getSessionReference() {
        return this.referencePromise;
    }

    private buildUserState(questionIndex?: number): UserState {
        const userState: UserState = {
            responseData: this.responseData,
            // Remove any query params from the current url
            url: this.location.path().split('?')[0]
        };
        if (questionIndex) {
            userState.questionIndex = questionIndex;
        }
        return userState;
    }
}
