import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-mees-page',
    templateUrl: './mees-questionnaire.component.html',
    styleUrls: ['./mees-questionnaire.component.scss']
})
export class MeesQuestionnaireComponent {

    constructor(private router: Router) {
    }

    onQuestionnaireComplete() {
        this.router.navigate(['/js/minimum-energy-efficiency-standards/results']);
    }
}
