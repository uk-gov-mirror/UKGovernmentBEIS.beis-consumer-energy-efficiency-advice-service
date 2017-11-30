import {Component, OnInit} from "@angular/core";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {ResponseData} from "../../../shared/response-data/response-data";
import {FloorLevel, getFloorLevelDescription} from "../floor-level-question/floor-level";
import {pull} from "lodash";

class FloorLevelOption {
    public readonly name: string;

    constructor(public readonly value: FloorLevel, public readonly displayName: string) {
        this.name = getFloorLevelDescription(value);
    }
}

@Component({
    selector: 'app-floor-span-question',
    templateUrl: './floor-span-question.component.html',
    styleUrls: ['./floor-span-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class FloorSpanQuestionComponent extends QuestionBaseComponent implements OnInit {
    floorLevelOptions: FloorLevelOption[];

    readonly FloorLevel = FloorLevel;

    ngOnInit() {
        this.responseData.floorLevels = this.responseData.floorLevels || [];
    }

    get responseForAnalytics(): string {
        return this.responseData.floorLevels.map(floorLevel => FloorLevel[floorLevel]).toString();
    }

    constructor(responseData: ResponseData) {
        super(responseData);
        this.floorLevelOptions = [
            new FloorLevelOption(FloorLevel.Basement, 'Basement'),
            new FloorLevelOption(FloorLevel.Ground, 'Ground'),
            new FloorLevelOption(FloorLevel.MidFloor, 'Mid-floor'),
            new FloorLevelOption(FloorLevel.TopFloor, 'Top-floor')
        ];
    }

    onFloorLevelOptionChange(option: FloorLevelOption) {
        if (this.responseData.floorLevels.includes(option.value)) {
            pull(this.responseData.floorLevels, option.value);
        } else {
            this.responseData.floorLevels.push(option.value);
        }
    }

    getFloorLevelOptionValue(option: FloorLevelOption) {
        return this.responseData.floorLevels.includes(option.value);
    }
}
