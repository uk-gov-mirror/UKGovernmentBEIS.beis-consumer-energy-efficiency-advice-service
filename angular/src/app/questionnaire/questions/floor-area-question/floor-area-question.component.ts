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

    get doesNotKnow(): boolean {
        return this.responseData.doesNotKnowFloorArea || false;
    }

    ngOnInit() {
        this.populateFloorArea();
        this.floorAreaDisplay = this.responseData.floorArea;
    }

    updateFloorArea(value) {
        if (value < 0) {
            this.isInvalid = true;
            this.responseData.floorArea = undefined;
        } else {
            this.responseData.doesNotKnowFloorArea = false;
            this.isInvalid = false;
            this.responseData.floorArea = value;
        }
    }

    handleDontKnow() {
        this.responseData.floorArea = 0;
        this.responseData.doesNotKnowFloorArea = true;
    }

    handleFormSubmit() {
        if (this.responseData.floorArea !== undefined) {
            this.complete.emit();
        }
    }

    private populateFloorArea(): void {
        if (this.responseData.floorArea === undefined) {
            this.responseData.floorArea = this.responseData.epc
                ? parseInt(this.responseData.epc.totalFloorArea)
                : 0;
            this.responseData.floorAreaUnit = FloorAreaUnit.SquareMetre;
        }
    }
}
