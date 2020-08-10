import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component, OnInit} from '@angular/core';
import {GlazingType, RoofType, WallType} from './construction-types';

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

    readonly glazingTypes: DropdownOption<GlazingType>[] = [
        {name: 'I don\'t know', value: GlazingType.DoNotKnow},
        {name: 'Single glazing', value: GlazingType.Single},
        {name: 'Double glazing', value: GlazingType.Double},
        {name: 'Triple glazing', value: GlazingType.Triple},
    ];

    ngOnInit() {
        this.roofType = this.responseData.roofType || RoofType.DoNotKnow;
        this.wallType = this.responseData.wallType || WallType.DoNotKnow;
        this.glazingType = this.responseData.glazingType || GlazingType.DoNotKnow;
    }

    get responseForAnalytics(): string {
        return JSON.stringify({
            roofType: RoofType[this.roofType],
            wallType: WallType[this.wallType],
            glazingType: GlazingType[this.glazingType],
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

    get glazingType(): GlazingType {
        return this.responseData.glazingType;
    }

    set glazingType(val: GlazingType) {
        this.responseData.glazingType = val;
    }
}
