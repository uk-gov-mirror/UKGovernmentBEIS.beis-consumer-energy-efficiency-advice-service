import { Injectable } from '@angular/core';
import {Question} from "./question";
import {QuestionBaseComponent} from "./question.component";
import {DummyQuestion} from "./dummy-question/dummy-question";
import {DummyQuestionComponent} from "./dummy-question/dummy-question.component";
import {ResponseData} from "./response-data";

@Injectable()
export class QuestionService {

    private readonly questions: {heading: string, question: Question<any, QuestionBaseComponent<any>>}[];
    private responseData: ResponseData;

    constructor() {
        this.responseData = new ResponseData();
        this.questions = [
            {
                heading: "Dummy question 1",
                question: new DummyQuestion(DummyQuestionComponent, () => this.responseData.dummy1, val => this.responseData.dummy1 = val)
            },
            {
                heading: "Dummy question 2",
                question: new DummyQuestion(DummyQuestionComponent, () => this.responseData.dummy2, val => this.responseData.dummy2 = val)
            },
            {
                heading: "Dummy question 3",
                question: new DummyQuestion(DummyQuestionComponent, () => this.responseData.dummy3, val => this.responseData.dummy3 = val)
            },
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