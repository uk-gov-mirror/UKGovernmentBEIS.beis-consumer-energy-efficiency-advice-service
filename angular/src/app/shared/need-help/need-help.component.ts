import {Component, Input, OnInit} from '@angular/core';
import {UserStateService} from "../user-state-service/user-state-service";
import {GoogleAnalyticsService} from "../analytics/google-analytics.service";

@Component({
    selector: 'app-need-help',
    templateUrl: './need-help.component.html',
    styleUrls: ['./need-help.component.scss']
})
export class NeedHelpComponent implements OnInit {

    expanded: boolean;
    reference: string = "";

    constructor(private userStateService: UserStateService,
                private googleAnalyticsService: GoogleAnalyticsService) {
    }

    async ngOnInit() {
        this.reference = await this.userStateService.getSessionReference();
    }

    toggleExpanded() {
        this.expanded = !this.expanded;
        if (this.expanded) {
            this.sendEventToAnalytics('help-button_opened');
        }
    }

    sendEventToAnalytics(eventName: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'assisted-digital');
    }

}
