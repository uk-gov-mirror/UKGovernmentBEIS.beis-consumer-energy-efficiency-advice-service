import { Component, OnInit } from '@angular/core';
import {UserStateService} from "../shared/user-state-service/user-state-service";

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
    reference: string;
    error: boolean = false;
    loading: boolean = false;

    constructor(private userStateService: UserStateService) { }

    handleFormSubmit() {
        this.error = false;
        this.loading = true;
        this.userStateService.joinSession(this.reference, () => this.handleError());
    }

    private handleError() {
        this.error = true;
        this.loading = false;
    }
}
