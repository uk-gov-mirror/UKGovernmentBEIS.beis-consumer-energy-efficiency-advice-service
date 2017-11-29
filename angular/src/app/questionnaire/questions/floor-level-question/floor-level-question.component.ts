import {Component} from "@angular/core";
import {FloorLevel, getFloorLevelDescription} from "./floor-level";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {ResponseData} from "../../../shared/response-data/response-data";

class FloorLevelOption {
    public readonly name: string;

    constructor(public readonly value: FloorLevel, public readonly className: string) {
        this.name = getFloorLevelDescription(value);
    }
}

@Component({
    selector: 'app-floor-level-question',
    templateUrl: './floor-level-question.component.html',
    styleUrls: ['./floor-level-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class FloorLevelQuestionComponent extends QuestionBaseComponent {
    floorLevelOptions: FloorLevelOption[];

    get responseForAnalytics(): string {
        return this.responseData.floorLevels.toString();
    }

    constructor(responseData: ResponseData) {
        super(responseData);
        this.floorLevelOptions = [
            new FloorLevelOption(FloorLevel.Basement, 'basement'),
            new FloorLevelOption(FloorLevel.Ground, 'ground'),
            new FloorLevelOption(FloorLevel.MidFloor, 'mid-floor'),
            new FloorLevelOption(FloorLevel.TopFloor, 'top-floor')
        ];
    }

    get response(): FloorLevel {
        return this.responseData.floorLevels && this.responseData.floorLevels[0];
    }

    set response(val: FloorLevel) {
        this.responseData.floorLevels = [val];
    }
}
