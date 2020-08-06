import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component} from '@angular/core';
import {OwnHome} from "./ownHome";
import {MultipleChoiceOption} from "../../common-questions/multiple-choice-question/multiple-choice-option";

@Component({
    selector: 'app-own-home-question',
    templateUrl: './own-home-question.component.html',
    animations: [slideInOutAnimation]
})
export class OwnHomeQuestionComponent extends QuestionBaseComponent {
    readonly ownHomeOptions: MultipleChoiceOption[] = [
        {name: 'Yes, I own my home', value: OwnHome.Owner},
        {name: 'Yes, I am the landlord', value: OwnHome.Landlord},
        {name: 'No, I am a tenant', value: OwnHome.Tenant},
    ];

    get responseForAnalytics(): string {
        return OwnHome[this.response];
    }

    get response(): OwnHome {
        return this.responseData.ownsHome;
    }

    set response(val: OwnHome) {
        this.responseData.ownsHome = val;
    }
}
