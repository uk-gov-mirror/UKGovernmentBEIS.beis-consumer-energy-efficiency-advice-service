import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component} from '@angular/core';
import {MultipleChoiceOption} from "../../common-questions/multiple-choice-question/multiple-choice-option";
import {FloorInsulation} from "./floor-insulation";

@Component({
    selector: 'app-floor-insulation-question',
    templateUrl: './floor-insulation-question.component.html',
    animations: [slideInOutAnimation]
})
export class FloorInsulationQuestionComponent extends QuestionBaseComponent {
    readonly floorInsulationOptions: MultipleChoiceOption[] = [
        {name: "Don't know", value: FloorInsulation.DontKnow},
        {name: 'Solid floor', value: FloorInsulation.SolidFloor},
        {name: 'Suspended floor', value: FloorInsulation.SuspendedFloor},
        {name: 'None', value: FloorInsulation.None},
    ];

    get responseForAnalytics(): string {
        return FloorInsulation[this.response];
    }

    get response(): FloorInsulation {
        return this.responseData.floorInsulation;
    }

    set response(val: FloorInsulation) {
        this.responseData.floorInsulation = val;
    }
}
