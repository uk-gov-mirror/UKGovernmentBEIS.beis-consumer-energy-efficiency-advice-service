import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component} from '@angular/core';
import {MultipleChoiceOption} from "../../common-questions/multiple-choice-question/multiple-choice-option";
import {GlazingType} from "./glazing-type";

@Component({
    selector: 'app-glazing-type-question',
    templateUrl: './glazing-type-question.component.html',
    animations: [slideInOutAnimation]
})
export class GlazingTypeQuestionComponent extends QuestionBaseComponent {
    readonly glazingTypeOptions: MultipleChoiceOption[] = [
        {name: 'I don\'t know', value: GlazingType.DoNotKnow},
        {name: 'Single glazing', value: GlazingType.Single},
        {name: 'Double glazing', value: GlazingType.Double},
        {name: 'Triple glazing', value: GlazingType.Triple}
    ];

    get responseForAnalytics(): string {
        return GlazingType[this.response];
    }

    get response(): GlazingType {
        return this.responseData.glazingType;
    }

    set response(val: GlazingType) {
        this.responseData.glazingType = val;
    }
}
