import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-green-homes-grant-questionnaire',
    templateUrl: './green-homes-grant-questionnaire.component.html',
    styleUrls: ['./green-homes-grant-questionnaire.component.scss']
})
export class GreenHomesGrantQuestionnaireComponent {

    constructor(private router: Router) {
    }

    onQuestionnaireComplete() {
        this.router.navigate(['/green-homes-grant/results']);
    }
}
