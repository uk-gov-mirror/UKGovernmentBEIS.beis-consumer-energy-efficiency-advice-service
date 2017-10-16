import {Injectable} from "@angular/core";
import {findIndex, findLastIndex} from 'lodash'
import {Question} from "./question";
import {QuestionBaseComponent} from "./question.component";
import {HomeTypeQuestion} from "./home-type-question/home-type-question";
import {ResponseData} from "./response-data";
import {StoreysQuestion} from "./storeys-question/storeys-question";
import {FuelTypeQuestion} from "./fuel-type-question/fuel-type-question";
import {PostcodeEpcQuestion} from "./postcode-epc-question/postcode-epc-question";
import {FlatPositionQuestion} from "./flat-position-question/flat-position-question";

@Injectable()
export class QuestionService {

    private readonly questions: Question<any, QuestionBaseComponent<any>>[];

    constructor(responseData: ResponseData) {
        this.questions = [
            new PostcodeEpcQuestion(responseData),
            new HomeTypeQuestion(responseData),
            new FlatPositionQuestion(responseData),
            new StoreysQuestion(responseData),
            new FuelTypeQuestion(responseData)
        ];
    }

    public getQuestion(index: number) {
        return this.questions[index];
    }

    public getPreviousQuestionIndex(index: number) {
        return findLastIndex(this.questions, q => q.isApplicable(), index - 1);
    }

    public getNextQuestionIndex(index: number) {
        return findIndex(this.questions, q => q.isApplicable(), index + 1);
    }

    public getHeading(index: number) {
        return this.questions[index].heading;
    }

    get numberOfQuestions() {
        return this.questions.length;
    }
}