import { Injectable } from '@angular/core';
import {Question} from "./question";
import {QuestionBaseComponent} from "./question.component";
import {DummyQuestion} from "./dummy-question/dummy-question";
import {DummyQuestionComponent} from "./dummy-question/dummy-question.component";

export const DUMMY_QUESTION_1 = "dummy1";
export const DUMMY_QUESTION_2 = "dummy2";
export const DUMMY_QUESTION_3 = "dummy3";

@Injectable()
export class QuestionService {

    public readonly questions: { [s: string]: Question<any, QuestionBaseComponent<any>>; };

    constructor() {
        this.questions = {};
        this.questions[DUMMY_QUESTION_1] = new DummyQuestion(DummyQuestionComponent);
        this.questions[DUMMY_QUESTION_2] = new DummyQuestion(DummyQuestionComponent);
        this.questions[DUMMY_QUESTION_3] = new DummyQuestion(DummyQuestionComponent);
    }

    public getQuestion(name): Question<any, QuestionBaseComponent<any>> {
        return this.questions[name];
    }
}