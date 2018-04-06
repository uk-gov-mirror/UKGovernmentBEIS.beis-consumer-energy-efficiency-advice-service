import {Component, Input, OnInit} from '@angular/core';
import {UserStateService} from "../user-state-service/user-state-service";

@Component({
    selector: 'app-need-help',
    templateUrl: './need-help.component.html',
    styleUrls: ['./need-help.component.scss']
})
export class NeedHelpComponent implements OnInit {

    expanded: boolean;
    reference: string = "";

    constructor(private userStateService: UserStateService) {
    }

    async ngOnInit() {
        this.reference = await this.userStateService.getSessionReference();
    }
}
