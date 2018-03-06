import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {FlatExposedWall, getFlatExposedWallDescription} from './flat-exposed-wall';
import {ResponseData} from '../../../shared/response-data/response-data';

class FlatExposedWallOption {
    public readonly name: string;

    constructor(public readonly value: FlatExposedWall, public readonly className: string) {
        this.name = getFlatExposedWallDescription(value);
    }
}
@Component({
    selector: 'app-flat-exposed-wall-question',
    templateUrl: './flat-exposed-wall-question.component.html',
    styleUrls: ['./flat-exposed-wall-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class FlatExposedWallQuestionComponent extends QuestionBaseComponent {
    flatExposedWallOptions: FlatExposedWallOption[];

    constructor(responseData: ResponseData) {
        super(responseData);
        this.flatExposedWallOptions = [
            new FlatExposedWallOption(FlatExposedWall.OneSideExposedInset, 'one-side-exposed'),
            new FlatExposedWallOption(FlatExposedWall.TwoSidesExposedCorner, 'two-sides-exposed-corner'),
            new FlatExposedWallOption(FlatExposedWall.TwoSidesExposedThroughBuilding, 'two-sides-exposed-through'),
            new FlatExposedWallOption(FlatExposedWall.ThreeSidesExposedWholeSide, 'three-sides-exposed'),
            new FlatExposedWallOption(FlatExposedWall.FourSidesExposedWholeFloor, 'four-sides-exposed')
        ];
    }

    get responseForAnalytics(): string {
        return FlatExposedWall[this.response];
    }

    get response(): FlatExposedWall {
        return this.responseData.numberOfExposedWallsInFlat;
    }

    set response(val: FlatExposedWall) {
        this.responseData.numberOfExposedWallsInFlat = val;
    }
}
