import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component} from '@angular/core';
import {RoofSpace} from './roof-space';

interface SpaceOption {
    name: string;
    helpText?: string;
    value: RoofSpace;
}

@Component({
    selector: 'app-roof-space-question',
    templateUrl: './roof-space-question.component.html',
    styleUrls: ['./roof-space-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class RoofSpaceQuestionComponent extends QuestionBaseComponent {

    readonly spaceOptions: SpaceOption[] = [
        {name: 'No space', value: RoofSpace.NoSpace},
        {name: 'Flat roof', helpText: 'With no trees or blockages', value: RoofSpace.FlatRoof},
        {name: 'Pitched roof', helpText: 'Facing South / South-East / South-West', value: RoofSpace.PitchedRoof},
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
