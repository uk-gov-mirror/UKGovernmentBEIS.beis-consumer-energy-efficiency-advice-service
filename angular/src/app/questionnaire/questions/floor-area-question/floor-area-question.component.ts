import {Component, OnInit} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import toString from 'lodash-es/toString';
import {FloorAreaUnit, getBasicUnitDisplay} from './floor-area-unit';

class FloorAreaUnitOption {
    public readonly basicUnitDisplay: string;

    constructor(public readonly value: FloorAreaUnit, public readonly className: string) {
        this.basicUnitDisplay = getBasicUnitDisplay(value);
    }
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
        new FloorAreaUnitOption(FloorAreaUnit.SquareMetre, 'square-metre'),
        new FloorAreaUnitOption(FloorAreaUnit.SquareFoot, 'square-foot')
    ];

    get responseForAnalytics(): string {
        return toString(this.responseData.floorArea);
    }

    get selectedFloorAreaUnit(): FloorAreaUnit {
        return this.responseData.floorAreaUnit;
    }

    set selectedFloorAreaUnit(val: FloorAreaUnit) {
        this.responseData.floorAreaUnit = val;
    }

    ngOnInit() {
        this.responseData.floorArea = this.responseData.floorArea || 0;
        this.responseData.floorAreaUnit = this.responseData.floorAreaUnit || FloorAreaUnit.SquareMetre;
        this.floorAreaDisplay = this.responseData.floorArea;
    }

    updateFloorArea(value) {
        if (value < 0) {
            this.isInvalid = true;
            this.responseData.floorArea = undefined;
        } else {
            this.isInvalid = false;
            this.responseData.floorArea = value;
        }
    }

    isFloorAreaUnitSelected(val: FloorAreaUnit) {
        return this.selectedFloorAreaUnit === val;
    }

    handleFormSubmit() {
        if (this.responseData.floorArea !== undefined) {
            this.complete.emit();
        }
    }
}
