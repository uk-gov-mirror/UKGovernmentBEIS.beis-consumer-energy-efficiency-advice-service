import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component} from '@angular/core';
import {WaterTankSpace} from './water-tank-space';
import {MultipleChoiceOption} from "../../common-questions/multiple-choice-question/multiple-choice-option";

@Component({
    selector: 'app-water-tank-question',
    templateUrl: './water-tank-question.component.html',
    styleUrls: ['./water-tank-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class WaterTankQuestionComponent extends QuestionBaseComponent {

    readonly spaceOptions: MultipleChoiceOption[] = [
        {name: 'No space', value: WaterTankSpace.None},
        {name: 'About 4.5 cubic metres', description: 'You could fit a large fridge-freezer in it', value: WaterTankSpace.Sufficient},
        {name: 'Bigger', value: WaterTankSpace.Bigger},
    ];

    get responseForAnalytics(): string {
        return WaterTankSpace[this.response];
    }

    get response(): WaterTankSpace {
        return this.responseData.waterTankSpace;
    }

    set response(val: WaterTankSpace) {
        this.responseData.waterTankSpace = val;
    }
}
