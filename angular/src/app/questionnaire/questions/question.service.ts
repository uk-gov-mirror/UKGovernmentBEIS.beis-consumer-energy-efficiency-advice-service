import { Injectable } from '@angular/core';
import {Question} from "./question";
import {QuestionBaseComponent} from "./question.component";
import {HomeTypeQuestion} from "./home-type-question/home-type-question";
import {ResponseData} from "./response-data";

@Injectable()
export class QuestionService {

    private readonly questions: Question<any, QuestionBaseComponent<any>>[];

    constructor(responseData: ResponseData) {
        this.questions = [
            new HomeTypeQuestion(responseData),
        ];
    }

    public getQuestion(index: number) {
        return this.questions[index];
    }

    public getHeading(index: number) {
        return this.questions[index].heading;
    }

    get numberOfQuestions() {
        return this.questions.length;
    }
}