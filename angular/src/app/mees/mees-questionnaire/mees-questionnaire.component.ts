import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-mees-page',
    templateUrl: './mees-questionnaire.component.html',
    styleUrls: ['./mees-questionnaire.component.scss']
})
/**
 * The entry point for the "Minimum Energy Efficiency Standards" questionnaire ("MEES"), aimed at landlords.
 */
export class MeesQuestionnaireComponent {

    constructor(private router: Router) {
    }

    onQuestionnaireComplete() {
        this.router.navigate(['/minimum-energy-efficiency-standards/results']);
    }
}
