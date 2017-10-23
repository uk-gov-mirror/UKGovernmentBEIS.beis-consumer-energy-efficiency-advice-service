import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {FlatPosition} from "./flat-position";
import {ResponseData} from "../../../common/response-data/response-data";

interface FlatPositionOption {
    name: string;
    value: FlatPosition;
    className: string;
}

@Component({
    selector: 'app-flat-position-question',
    templateUrl: './flat-position-question.component.html',
    styleUrls: ['./flat-position-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class FlatPositionQuestionComponent extends QuestionBaseComponent<FlatPosition> {
    flatPositionOptions: FlatPositionOption[];

    constructor(responseData: ResponseData) {
        super(responseData);
        this.flatPositionOptions = [
            {name: '1 Side Exposed', value: FlatPosition.OneSideExposed, className: 'one-side-exposed'},
            {name: '2 Sides Exposed', value: FlatPosition.TwoSidesExposed, className: 'two-sides-exposed'},
            {name: '3 Sides Exposed', value: FlatPosition.ThreeSidesExposed, className: 'three-sides-exposed'},
            {name: '4 Sides Exposed', value: FlatPosition.FourSidesExposed, className: 'four-sides-exposed'},
        ];
    }

    get response(): FlatPosition {
        return this.responseData.flatPosition;
    }

    set response(val: FlatPosition) {
        this.responseData.flatPosition = val;
    }
}
