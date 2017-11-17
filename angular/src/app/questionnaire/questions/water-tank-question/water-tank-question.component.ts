import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {Component} from "@angular/core";
import {WaterTankSpace} from "./water-tank-space";

interface SpaceOption {
    name: string;
    value: WaterTankSpace;
}

@Component({
    selector: 'app-water-tank-question',
    templateUrl: './water-tank-question.component.html',
    styleUrls: ['./water-tank-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class WaterTankQuestionComponent extends QuestionBaseComponent {

    readonly spaceOptions: SpaceOption[] = [
        {name: 'No space', value: WaterTankSpace.None},
        {name: 'About 4.5m³', value: WaterTankSpace.Sufficient},
        {name: 'Bigger', value: WaterTankSpace.Bigger},
    ];

    get response(): WaterTankSpace {
        return this.responseData.waterTankSpace;
    }

    set response(val: WaterTankSpace) {
        this.responseData.waterTankSpace = val;
    }
}