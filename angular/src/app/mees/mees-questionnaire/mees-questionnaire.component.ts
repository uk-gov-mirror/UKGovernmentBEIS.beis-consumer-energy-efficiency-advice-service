import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {clearMeesResponseData, ResponseData} from '../../shared/response-data/response-data';

@Component({
    selector: 'app-mees-page',
    templateUrl: './mees-questionnaire.component.html',
    styleUrls: ['./mees-questionnaire.component.scss']
})
/**
 * The entry point for the "Minimum Energy Efficiency Standards" questionnaire ("MEES"), aimed at landlords.
 */
export class MeesQuestionnaireComponent implements OnInit {

    constructor(private responseData: ResponseData,
        private router: Router) {
    }

    ngOnInit() {
        clearMeesResponseData(this.responseData);
    }

    onQuestionnaireComplete() {
        this.router.navigate(['/minimum-energy-efficiency-standards/results']);
    }
}
