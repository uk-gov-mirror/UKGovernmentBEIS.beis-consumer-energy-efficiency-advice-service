import {Component, OnInit} from '@angular/core';
import {ResponseData} from '../../shared/response-data/response-data';
import {TenancyType} from '../../questionnaire/questions/mees/tenancy-type-question/tenancy-type';

@Component({
    selector: 'app-mees-results-page',
    templateUrl: './mees-results-page.component.html',
    styleUrls: ['./mees-results-page.component.scss']
})
export class MeesResultsPageComponent implements OnInit {
    actionRequired: boolean;

    constructor(private responseData: ResponseData) {
    }

    ngOnInit() {
        this.actionRequired = (this.responseData.isDomesticPropertyAfter2018 || this.responseData.isPropertyAfter2020)
            && this.responseData.isEpcRequired
            && this.responseData.tenancyType !== TenancyType.Other
            && this.responseData.isEpcBelowE;
    }
}
