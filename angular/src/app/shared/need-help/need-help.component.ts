import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {UserStateService} from "../user-state-service/user-state-service";
import {GoogleAnalyticsService} from "../analytics/google-analytics.service";
import Config from "../../config";

@Component({
    selector: 'app-need-help',
    templateUrl: './need-help.component.html',
    styleUrls: ['./need-help.component.scss']
})
export class NeedHelpComponent implements OnInit {

    expanded: boolean;
    reference: string = "";
    phoneNumber: string = Config().phoneNumber;

    constructor(private userStateService: UserStateService,
                private googleAnalyticsService: GoogleAnalyticsService,
                private location: Location) {
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
        // Send the current path as the label
        const path = this.location.path() ? this.location.path() : '/';
        this.googleAnalyticsService.sendEvent(eventName, 'assisted-digital', path);
    }

    getPhoneNumberForLink() {
        return this.phoneNumber
            ? this.phoneNumber.replace(/\s/g, '')
            : '';
    }
}
