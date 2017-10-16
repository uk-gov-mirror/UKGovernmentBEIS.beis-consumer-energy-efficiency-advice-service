import {Question} from "../question";
import {FlatPositionQuestionComponent} from "./flat-position-question.component";
import {FlatPosition} from './flat-position';
import {ResponseData} from "../response-data";
import {isFlat} from "../home-type-question/home-type";

export class FlatPositionQuestion extends Question<FlatPosition, FlatPositionQuestionComponent> {
    constructor(responseData: ResponseData) {
        super(FlatPositionQuestionComponent, 'You\'ve selected a flat. What\'s its position?', responseData);
    }

    get response(): FlatPosition {
        return this.responseData.flatPosition;
    }

    set response(val: FlatPosition) {
        this.responseData.flatPosition = val;
    }

    isApplicable(): boolean {
        return isFlat(this.responseData.homeType);
    }
}