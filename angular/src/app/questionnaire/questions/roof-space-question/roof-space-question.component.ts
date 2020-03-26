import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component} from '@angular/core';
import {RoofSpace} from './roof-space';
import {MultipleChoiceOption} from "../../common-questions/multiple-choice-question/multiple-choice-option";

@Component({
    selector: 'app-roof-space-question',
    templateUrl: './roof-space-question.component.html',
    animations: [slideInOutAnimation]
})
export class RoofSpaceQuestionComponent extends QuestionBaseComponent {

    readonly spaceOptions: MultipleChoiceOption[] = [
        {name: 'No space', value: RoofSpace.NoSpace},
        {name: 'Flat roof', description: 'With no trees or blockages', value: RoofSpace.FlatRoof},
        {name: 'Pitched roof', description: 'Facing South / South-East / South-West', value: RoofSpace.PitchedRoof},
        {name: 'Other', value: RoofSpace.Other},
    ];

    get responseForAnalytics(): string {
        return RoofSpace[this.response];
    }

    get response(): RoofSpace {
        return this.responseData.roofSpace;
    }

    set response(val: RoofSpace) {
        this.responseData.roofSpace = val;
    }
}
