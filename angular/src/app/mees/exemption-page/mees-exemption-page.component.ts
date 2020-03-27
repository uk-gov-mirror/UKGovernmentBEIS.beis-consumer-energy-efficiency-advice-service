import {Component, OnInit} from '@angular/core';
import {PageTitleService} from "../../shared/page-title-service/page-title.service";

@Component({
    selector: 'app-mees-exemption-page',
    templateUrl: './mees-exemption-page.component.html',
    styleUrls: ['./mees-exemption-page.component.scss']
})
export class MeesExemptionPageComponent implements OnInit {
    public measureNotRelevantOpen: boolean = false;
    public hasNoRecommendedMeasuresOpen: boolean = false;
    public wallInsulationOpen: boolean = false;
    public consentOpen: boolean = false;
    public devaluationOpen: boolean = false;
    public recentLandlordOpen: boolean = false;

    constructor(private pageTitle: PageTitleService) {
    }

    ngOnInit(): void {
        this.pageTitle.set('PRS Exemptions');
    }
}
