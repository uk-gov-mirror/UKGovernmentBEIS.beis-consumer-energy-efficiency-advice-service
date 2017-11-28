import {Component} from "@angular/core";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {FlatPosition} from "./flat-position";
import {ResponseData} from "../../../shared/response-data/response-data";

interface FlatPositionOption {
    name: string;
    value: FlatPosition;
    className: string;
}

@Component({
    selector: 'app-flat-exposed-wall-question',
    templateUrl: './flat-exposed-wall-question.component.html',
    styleUrls: ['./flat-exposed-wall-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class FlatExposedWallQuestionComponent extends QuestionBaseComponent {
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

    get responseForAnalytics(): string {
        return FlatPosition[this.response];
    }

    get response(): FlatPosition {
        return this.responseData.flatPosition;
    }

    set response(val: FlatPosition) {
        this.responseData.flatPosition = val;
    }
}
