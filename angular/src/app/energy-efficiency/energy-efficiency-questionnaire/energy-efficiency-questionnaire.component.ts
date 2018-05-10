import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResponseData} from '../../shared/response-data/response-data';

@Component({
    selector: 'app-energy-efficiency-questionnaire',
    templateUrl: './energy-efficiency-questionnaire.component.html',
    styleUrls: ['./energy-efficiency-questionnaire.component.scss']
})
export class EnergyEfficiencyQuestionnaireComponent implements OnInit {

    questionnaireName: string;

    constructor(
        private responseData: ResponseData,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.questionnaireName = route.snapshot.paramMap.get('name');
    }

    ngOnInit(): void {
        if (!['home-basics', 'behaviour'].includes(this.questionnaireName)) {
            this.router.navigate(['/404'], {skipLocationChange: true});
        }
    }

    onQuestionnaireComplete(): void {
        if (this.responseData.shouldIncludeGrantsQuestionnaire) {
            this.router.navigate(['/grants/questionnaire']);
        } else {
            this.router.navigate(['/energy-efficiency/results']);
        }
    }
}
