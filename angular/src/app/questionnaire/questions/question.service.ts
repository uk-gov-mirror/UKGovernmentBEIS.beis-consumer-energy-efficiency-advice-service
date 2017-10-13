import { Injectable } from '@angular/core';
import {Question} from "./question";
import {QuestionBaseComponent} from "./question.component";
import {HomeTypeQuestion} from "./home-type-question/home-type-question";
import {ResponseData} from "./response-data";

@Injectable()
export class QuestionService {

    private readonly questions: {heading: string, question: Question<any, QuestionBaseComponent<any>>}[];
    private responseData: ResponseData;

    constructor() {
        this.responseData = new ResponseData();
        this.questions = [
            {
                heading: "So what type of home do you have?",
                question: new HomeTypeQuestion(() => this.responseData.homeType, val => this.responseData.homeType = val)
            }
        ];
    }

    public getQuestion(index: number) {
        return this.questions[index].question;
    }

    public getHeading(index: number) {
        return this.questions[index].heading;
    }

    get numberOfQuestions() {
        return this.questions.length;
    }
}