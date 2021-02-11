import {Component, OnInit} from '@angular/core';
import { Input } from '@angular/core';
import { InstallerInfo } from './installer-info';
import {GoogleAnalyticsService} from "../../shared/analytics/google-analytics.service";

@Component({
    selector: 'app-installer-card',
    templateUrl: './installer-card.component.html',
    styleUrls: ['./installer-card.component.scss']
})
export class InstallerCardComponent {
    @Input() installerInfo: InstallerInfo;
    @Input() selectedInstallerId: number;
    constructor(private googleAnalyticsService: GoogleAnalyticsService) {
    }

    sendAnalyticsEvent() {
        this.googleAnalyticsService.sendEvent('trustmark-link_clicked', 'installer-search', this.installerInfo.id.toString());
    }
}
