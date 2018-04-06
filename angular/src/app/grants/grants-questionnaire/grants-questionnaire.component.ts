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
        if (!isComplete(this.responseData)) {
            alert("TODO:BEIS-213 there is not yet a separate grants results page. " +
                "You can view grants by completing the main questionnaire " +
                "and selecting an improvement plan.");
        }


        this.router.navigate(['/js/energy-efficiency/results']);
    }
}
