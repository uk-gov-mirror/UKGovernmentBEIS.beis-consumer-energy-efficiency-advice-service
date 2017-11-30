import {Component} from "@angular/core";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {FlatExposedWall} from "./flat-exposed-wall";
import {ResponseData} from "../../../shared/response-data/response-data";

interface FlatExposedWallOption {
    name: string;
    value: FlatExposedWall;
    className: string;
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
            {name: '1 Side Exposed (Inset)', value: FlatExposedWall.OneSideExposedInset, className: 'one-side-exposed'},
            {name: '2 Sides Exposed (In a corner)', value: FlatExposedWall.TwoSidesExposedCorner, className: 'two-sides-exposed-corner'},
            {name: '2 Sides Exposed (Through building)', value: FlatExposedWall.TwoSidesExposedThroughBuilding, className: 'two-sides-exposed-through'},
            {name: '3 Sides Exposed (Whole side)', value: FlatExposedWall.ThreeSidesExposedWholeSide, className: 'three-sides-exposed'},
            {name: '4 Sides Exposed (Whole floor)', value: FlatExposedWall.FourSidesExposedWholeFloor, className: 'four-sides-exposed'},
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
