import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {isComplete, ResponseData} from "../../shared/response-data/response-data";

@Component({
    selector: 'app-grants-questionnaire',
    templateUrl: './grants-questionnaire.component.html',
    styleUrls: ['./grants-questionnaire.component.scss']
})
export class GrantsQuestionnaireComponent {

    constructor(private responseData: ResponseData,
                private router: Router) {
    }

    onQuestionnaireComplete() {
        this.router.navigate(['/energy-efficiency/results']);
    }
}
