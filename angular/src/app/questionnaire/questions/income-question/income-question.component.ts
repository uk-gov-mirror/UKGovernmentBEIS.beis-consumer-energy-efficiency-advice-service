import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component, OnInit} from '@angular/core';
import toString from 'lodash-es/toString';

@Component({
    selector: 'app-income-question',
    templateUrl: './income-question.component.html',
    styleUrls: ['./income-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class IncomeQuestionComponent extends QuestionBaseComponent implements OnInit {
    get responseForAnalytics(): string {
        return toString(this.response);
    }

    ngOnInit() {
        this.response = this.response || 0;
    }

    get response() {
        return this.responseData.income;
    }

    set response(val: number) {
        this.responseData.income = val;
    }

    handleFormSubmit() {
        if (this.responseData.income !== undefined) {
            this.complete.emit();
        }
    }
}
