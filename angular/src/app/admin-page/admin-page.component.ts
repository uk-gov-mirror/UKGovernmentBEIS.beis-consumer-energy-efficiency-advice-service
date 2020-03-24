import {Component, OnInit} from '@angular/core';
import {UserStateService} from "../shared/user-state-service/user-state-service";
import * as log from 'loglevel';
import {PageTitleService} from "../shared/page-title-service/page-title.service";

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
    sessionReference: string;
    error: boolean = false;
    loading: boolean = false;
    errorMessage: string = "Unable to load the user's session. Is the reference (including spaces) definitely correct?";

    constructor(private userStateService: UserStateService, private pageTitle: PageTitleService) {
    }

    ngOnInit(): void {
        this.pageTitle.set('Admin Page');
    }

    handleFormSubmit() {
        this.error = false;
        this.loading = true;
        this.userStateService.joinSession(this.sessionReference, (error) => this.handleError(error));
        this.loading = false;
    }

    private handleError(error) {
        this.error = true;
        log.error(error);
    }
}
