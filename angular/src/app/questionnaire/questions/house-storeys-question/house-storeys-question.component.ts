import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component, OnInit} from '@angular/core';
import toString from 'lodash-es/toString';
import {HomeType} from '../home-type-question/home-type';

@Component({
    selector: 'app-house-storeys-question',
    templateUrl: './house-storeys-question.component.html',
    animations: [slideInOutAnimation]
})
export class HouseStoreysQuestionComponent extends QuestionBaseComponent implements OnInit {
    get responseForAnalytics(): string {
        return toString(this.response);
    }

    ngOnInit() {
        if (this.responseData.homeType === HomeType.Bungalow ||
            this.responseData.homeType === HomeType.ParkHomeOrMobileHome) {
            this.response = this.response || 1;
        } else {
            this.response = this.response || 2;
        }
    }

    get response(): number {
        return this.responseData.numberOfStoreys;
    }

    set response(val: number) {
        this.responseData.numberOfStoreys = val;
    }

    handleFormSubmit() {
        if (this.response) {
            this.complete.emit();
        }
    }
}
