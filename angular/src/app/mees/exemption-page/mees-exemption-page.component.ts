import {Component} from '@angular/core';

@Component({
    selector: 'app-mees-exemption-page',
    templateUrl: './mees-exemption-page.component.html',
    styleUrls: ['./mees-exemption-page.component.scss']
})
export class MeesExemptionPageComponent {
    public measureNotRelevantOpen: boolean = false;
    public hasNoRecommendedMeasuresOpen: boolean = false;
    public wallInsulationOpen: boolean = false;
    public consentOpen: boolean = false;
    public devaluationOpen: boolean = false;
    public recentLandlordOpen: boolean = false;
}
