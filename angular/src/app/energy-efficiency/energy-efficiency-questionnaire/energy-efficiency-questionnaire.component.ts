import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-grants-questionnaire',
    templateUrl: './energy-efficiency-questionnaire.component.html',
    styleUrls: ['./energy-efficiency-questionnaire.component.scss']
})
export class EnergyEfficiencyQuestionnaireComponent {

    questionnaireName: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.questionnaireName = route.snapshot.paramMap.get('name');
    }

    onQuestionnaireComplete() {
        this.router.navigate(['/js/energy-efficiency/results']);
    }
}