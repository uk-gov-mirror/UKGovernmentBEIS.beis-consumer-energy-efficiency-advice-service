import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component, OnInit} from '@angular/core';
import {WallType} from '../construction-question/construction-types';

interface DropdownOption<T> {
    name: string;
    value: T;
}

@Component({
    selector: 'app-wall-type-question',
    templateUrl: './wall-type-question.component.html',
    animations: [slideInOutAnimation]
})
export class WallTypeQuestionComponent extends QuestionBaseComponent implements OnInit {

    readonly wallTypes: DropdownOption<WallType>[] = [
        {name: 'I don’t know', value: WallType.DoNotKnow},
        {name: 'Cavity wall - no insulation', value: WallType.CavityNoInsulation},
        {name: 'Cavity wall - insulated', value: WallType.CavityInsulated},
        {name: 'Solid wall - no insulation', value: WallType.SolidNoInsulation},
        {name: 'Solid wall - insulated', value: WallType.SolidInsulated},
    ];

    ngOnInit() {
        this.wallType = WallType.DoNotKnow;
    }

    get responseForAnalytics(): string {
        return JSON.stringify({
            wallType: WallType[this.wallType]
        });
    }

    get wallType(): WallType {
        return this.responseData.wallType;
    }

    set wallType(val: WallType) {
        this.responseData.wallType = val;
    }
}
