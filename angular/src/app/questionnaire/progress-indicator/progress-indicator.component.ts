import {Component, Input, OnChanges} from '@angular/core';
import {Questionnaire} from '../base-questionnaire/questionnaire';
import {ResponseData} from '../../shared/response-data/response-data';

@Component({
    selector: 'app-progress-indicator',
    templateUrl: './progress-indicator.component.html',
    styleUrls: ['./progress-indicator.component.scss']
})
export class ProgressIndicatorComponent implements OnChanges {

    @Input() currentQuestionIndex: number;
    @Input() questionnaire: Questionnaire;
    currentPercentage: number = 0;

    constructor() {
    }

    ngOnChanges () {
        if (document.querySelector(".completion-bar-content")) {
            if (this.questionnaire.getQuestions().length !== 0) {
                this.currentPercentage = Math.floor((this.currentQuestionIndex / this.questionnaire.getQuestions().length) * 100);
            }
            (<HTMLElement>document.querySelector(".completion-bar-content")).style.width = this.currentPercentage + "%";
            (<HTMLElement>document.querySelector(".completion-bar-content")).style.background =
                "linear-gradient(to right, #00abce " + (100 - (this.currentPercentage / 2)) + "%, #1ee81e)";
        }
    }
}
