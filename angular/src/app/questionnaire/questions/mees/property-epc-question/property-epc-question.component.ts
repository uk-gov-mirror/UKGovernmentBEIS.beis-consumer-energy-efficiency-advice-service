import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';
import {getUserEpcRatingDescription, UserEpcRating} from './user-epc-rating';
import {MultipleChoiceOption} from "../../../common-questions/multiple-choice-question/multiple-choice-option";

class PropertyEpcOption implements MultipleChoiceOption {
    public readonly name: string;

    constructor(public readonly value: UserEpcRating, public readonly className: string) {
        this.name = getUserEpcRatingDescription(value);
    }
}

@Component({
    selector: 'app-property-epc-question',
    templateUrl: './property-epc-question.component.html',
    animations: [slideInOutAnimation]
})
export class PropertyEpcQuestionComponent extends QuestionBaseComponent {
    propertyEpcOptions = [
        new PropertyEpcOption(UserEpcRating.AtLeastE, 'at-least-e'),
        new PropertyEpcOption(UserEpcRating.BelowE, 'below-e'),
        new PropertyEpcOption(UserEpcRating.NoRating, 'no-rating'),
        new PropertyEpcOption(UserEpcRating.DontKnow, 'dont-know'),
    ];

    get responseForAnalytics(): string {
        return UserEpcRating[this.response];
    }

    get response(): UserEpcRating {
        return this.responseData.propertyEpc;
    }

    set response(val: UserEpcRating) {
        this.responseData.propertyEpc = val;
    }
}
