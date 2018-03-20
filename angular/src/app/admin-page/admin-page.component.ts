import {Component} from '@angular/core';
import {UserStateService} from "../shared/user-state-service/user-state-service";
import * as log from 'loglevel';

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
    sessionReference: string;
    error: boolean = false;
    loading: boolean = false;

    constructor(private userStateService: UserStateService) { }

    handleFormSubmit() {
        this.error = false;
        this.loading = true;
        this.userStateService.joinSession(this.sessionReference, (error) => this.handleError(error));
    }

    private handleError(error) {
        this.error = true;
        this.loading = false;
        log.error(error);
    }
}
