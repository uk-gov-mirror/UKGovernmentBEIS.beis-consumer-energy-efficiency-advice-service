import {Component} from "@angular/core";

@Component({
    selector: 'app-grants-questionnaire',
    templateUrl: './grants-questionnaire.component.html',
    styleUrls: ['./grants-questionnaire.component.scss']
})
export class GrantsQuestionnaireComponent {

    onQuestionnaireComplete() {
        // TODO: add grants eligibility calculations here
        console.log('Questionnaire complete');
    }
}