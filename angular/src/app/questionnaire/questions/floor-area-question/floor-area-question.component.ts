import {Component, OnInit} from "@angular/core";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import toString from "lodash-es/toString";
import {FloorAreaUnit} from "./floor-area-unit";

export interface FloorAreaUnitOption {
    basicUnitDisplay: string;
    value: FloorAreaUnit;
}

@Component({
    selector: 'app-floor-area-question',
    templateUrl: './floor-area-question.component.html',
    styleUrls: ['./floor-area-question.component.scss'],
    animations: [slideInOutAnimation],
})
export class FloorAreaQuestionComponent extends QuestionBaseComponent implements OnInit {
    isInvalid: boolean;
    floorAreaDisplay: number;

    floorAreaUnits: FloorAreaUnitOption[] = [
        {basicUnitDisplay: 'm', value: FloorAreaUnit.SquareMetre},
        {basicUnitDisplay: 'ft', value: FloorAreaUnit.SquareFoot}
    ];

    get responseForAnalytics(): string {
        return toString(this.responseData.floorArea);
    }

    get selectedFloorAreaUnit(): FloorAreaUnit {
        return this.responseData.floorAreaUnit || FloorAreaUnit.SquareMetre;
    }

    set selectedFloorAreaUnit(val: FloorAreaUnit) {
        this.responseData.floorAreaUnit = val;
    }

    ngOnInit() {
        this.responseData.floorArea = this.responseData.floorArea || 0;
        if (this.responseData.floorAreaUnit === undefined) {
            this.responseData.floorAreaUnit = FloorAreaUnit.SquareMetre;
        }
        this.floorAreaDisplay = this.responseData.floorArea;
    }

    updateResponseData(value) {
        if (value < 0) {
            this.isInvalid = true;
            this.responseData.floorArea = undefined;
        } else {
            this.isInvalid = false;
            this.responseData.floorArea = value;
        }
    }

    handleFormSubmit() {
        if (this.responseData.floorArea !== undefined) {
            this.complete.emit();
        }
    }
}
