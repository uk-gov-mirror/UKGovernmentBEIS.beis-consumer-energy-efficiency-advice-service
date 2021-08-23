import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component, OnInit} from '@angular/core';
import {FloorInsulation, RoofType, WallType} from './construction-types';

interface DropdownOption<T> {
    name: string;
    value: T;
}

@Component({
    selector: 'app-construction-question',
    templateUrl: './construction-question.component.html',
    styleUrls: ['./construction-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class ConstructionQuestionComponent extends QuestionBaseComponent implements OnInit {

    readonly roofTypes: DropdownOption<RoofType>[] = [
        {name: 'I don\'t know', value: RoofType.DoNotKnow},
        {name: 'Pitched roof - no insulation', value: RoofType.PitchedNoInsulation},
        {name: 'Pitched roof - insulated', value: RoofType.PitchedInsulated},
        {name: 'Flat roof - no insulation', value: RoofType.FlatNoInsulation},
        {name: 'Flat roof - insulated', value: RoofType.FlatInsulated},
    ];

    readonly wallTypes: DropdownOption<WallType>[] = [
        {name: 'I don\'t know', value: WallType.DoNotKnow},
        {name: 'Cavity wall - no insulation', value: WallType.CavityNoInsulation},
        {name: 'Cavity wall - insulated', value: WallType.CavityInsulated},
        {name: 'Solid wall - no insulation', value: WallType.SolidNoInsulation},
        {name: 'Solid wall - insulated', value: WallType.SolidInsulated},
    ];

    readonly floorTypes: DropdownOption<FloorInsulation>[] = [
        {name: "I don\'t know", value: FloorInsulation.DontKnow},
        {name: 'Solid floor', value: FloorInsulation.SolidFloor},
        {name: 'Suspended floor', value: FloorInsulation.SuspendedFloor},
        {name: 'None', value: FloorInsulation.None},
    ];

    ngOnInit() {
        this.roofType = this.responseData.roofType || RoofType.DoNotKnow;
        this.wallType = this.responseData.wallType || WallType.DoNotKnow;
        this.floorType = this.responseData.floorInsulation || FloorInsulation.DontKnow;
    }

    get responseForAnalytics(): string {
        return JSON.stringify({
            roofType: RoofType[this.roofType],
            wallType: WallType[this.wallType],
            floorType: FloorInsulation[this.floorType],
        });
    }

    get roofType(): RoofType {
        return this.responseData.roofType;
    }

    set roofType(val: RoofType) {
        this.responseData.roofType = val;
    }

    get wallType(): WallType {
        return this.responseData.wallType;
    }

    set wallType(val: WallType) {
        this.responseData.wallType = val;
    }

    get floorType(): FloorInsulation {
        return this.responseData.floorInsulation;
    }

    set floorType(val: FloorInsulation) {
        this.responseData.floorInsulation = val;
    }
}
