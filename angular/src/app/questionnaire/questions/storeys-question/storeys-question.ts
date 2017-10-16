import {Question} from "../question";
import {StoreysQuestionComponent} from "./storeys-question.component";
import {ResponseData} from "../response-data";
import {QuestionType} from '../../question-type';

export class StoreysQuestion extends Question<number, StoreysQuestionComponent> {
    constructor(responseData: ResponseData) {
        super(StoreysQuestionComponent, 'How many storeys does your home have?', QuestionType.House, responseData);
    }

    get response(): number {
        return this.responseData.numberOfStoreys;
    }

    set response(val: number) {
        this.responseData.numberOfStoreys = val;
    }
}