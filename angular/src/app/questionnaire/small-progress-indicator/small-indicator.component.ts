import {Component, Input, OnChanges} from '@angular/core';
import {Questionnaire} from '../base-questionnaire/questionnaire';
import {ResponseData} from '../../shared/response-data/response-data';

@Component({
    selector: 'app-small-indicator',
    templateUrl: './small-indicator.component.html',
    styleUrls: ['./small-indicator.component.scss']
})
export class SmallIndicatorComponent implements OnChanges {

    @Input() currentQuestionIndex: number;
    @Input() questionnaire: Questionnaire;
    currentPercentage: number = 0;

    constructor() {
    }

    ngOnChanges () {
        if (this.questionnaire.getQuestions().length !== 0) {
            this.currentPercentage = Math.floor((this.currentQuestionIndex / this.questionnaire.getQuestions().length) * 100);
        }
        (<HTMLElement>document.querySelector(".completion-bar-content")).style.width = this.currentPercentage + "%";
    }
}
