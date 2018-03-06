import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {getHouseSharedWallDescription, HouseExposedWall} from './house-exposed-wall';

class HouseExposedWallOption {
    public readonly name: string;

    constructor(public readonly value: HouseExposedWall, public readonly className: string) {
        this.name = getHouseSharedWallDescription(value);
    }
}

@Component({
    selector: 'app-house-exposed-wall-question',
    templateUrl: './house-exposed-wall-question.component.html',
    styleUrls: ['./house-exposed-wall-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class HouseExposedWallQuestionComponent extends QuestionBaseComponent {
    houseExposedWallOptions: HouseExposedWallOption[];

    constructor(responseData: ResponseData) {
        super(responseData);
        this.houseExposedWallOptions = [
            new HouseExposedWallOption(HouseExposedWall.ThreeSidesExposed, 'one-side-shared'),
            new HouseExposedWallOption(HouseExposedWall.TwoSidesExposed, 'two-sides-shared'),
            new HouseExposedWallOption(HouseExposedWall.OneSideExposed, 'three-sides-shared')
        ];
    }

    get responseForAnalytics(): string {
        return HouseExposedWall[this.response];
    }

    get response(): HouseExposedWall {
        return this.responseData.numberOfExposedWallsInHouse;
    }

    set response(val: HouseExposedWall) {
        this.responseData.numberOfExposedWallsInHouse = val;
    }
}
