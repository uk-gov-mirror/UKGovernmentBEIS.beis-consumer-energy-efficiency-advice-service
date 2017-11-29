import {Component} from "@angular/core";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {ResponseData} from "../../../shared/response-data/response-data";
import {HouseExposedWall} from "./house-exposed-wall";

interface HouseExposedWallOption {
    name: string;
    value: HouseExposedWall;
    className: string;
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
            {name: '1 Side', value: HouseExposedWall.ThreeSidesExposed, className: 'one-side-shared'},
            {name: '2 Sides', value: HouseExposedWall.TwoSidesExposed, className: 'two-sides-shared'},
            {name: '3 Sides', value: HouseExposedWall.OneSideExposed, className: 'three-sides-shared'}
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
