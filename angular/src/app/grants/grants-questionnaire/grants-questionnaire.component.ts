import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'app-grants-questionnaire',
    templateUrl: './grants-questionnaire.component.html',
    styleUrls: ['./grants-questionnaire.component.scss']
})
export class GrantsQuestionnaireComponent {

    constructor(private router: Router) {
    }

    onQuestionnaireComplete() {
        // TODO: add grants eligibility calculations here
        this.router.navigate(['/js/energy-efficiency/results']);
    }
}