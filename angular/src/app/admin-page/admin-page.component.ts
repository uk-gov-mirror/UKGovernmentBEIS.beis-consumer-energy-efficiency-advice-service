import { Component, OnInit } from '@angular/core';
import {UserStateService} from "../shared/user-state-service/user-state-service";

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
    reference: string;

    constructor(private userStateService: UserStateService) { }

    ngOnInit() {
    }

    handleFormSubmit() {
        this.userStateService.joinSession(this.reference);
    }
}
