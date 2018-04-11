import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-boiler-questionnaire',
    templateUrl: './boiler-questionnaire.component.html',
    styleUrls: ['./boiler-questionnaire.component.scss']
})
export class BoilerQuestionnaireComponent {

    constructor(private router: Router) {
    }

    onQuestionnaireComplete() {
        this.router.navigate(['/boiler/results']);
    }
}
