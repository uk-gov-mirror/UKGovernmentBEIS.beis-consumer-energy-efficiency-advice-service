import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ResponseData} from "../../shared/response-data/response-data";

@Component({
    selector: 'app-grants-questionnaire',
    templateUrl: './energy-efficiency-questionnaire.component.html',
    styleUrls: ['./energy-efficiency-questionnaire.component.scss']
})
export class EnergyEfficiencyQuestionnaireComponent {

    questionnaireName: string;

    constructor(
        private responseData: ResponseData,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.questionnaireName = route.snapshot.paramMap.get('name');
    }

    onQuestionnaireComplete(): void {
        if(this.responseData.shouldIncludeGrantsQuestionnaire) {
            this.router.navigate(['/js/grants/questionnaire']);
        } else {
            this.router.navigate(['/js/energy-efficiency/results']);
        }
    }
}