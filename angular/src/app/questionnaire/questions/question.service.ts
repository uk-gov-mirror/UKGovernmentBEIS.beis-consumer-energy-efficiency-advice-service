import { Injectable } from '@angular/core';
import {Question} from "./question";
import {QuestionBaseComponent} from "./question.component";
import {DummyQuestion} from "./dummy-question/dummy-question";
import {DummyQuestionComponent} from "./dummy-question/dummy-question.component";

const DUMMY_QUESTION_1 = "dummy1";
const DUMMY_QUESTION_2 = "dummy2";
const DUMMY_QUESTION_3 = "dummy3";

@Injectable()
export class QuestionService {

    private readonly questions: { [s: string]: Question<any, QuestionBaseComponent<any>>; };
    private readonly questionOrder: {key: string, heading: string}[];

    constructor() {
        this.questions = {};
        this.questions[DUMMY_QUESTION_1] = new DummyQuestion(DummyQuestionComponent);
        this.questions[DUMMY_QUESTION_2] = new DummyQuestion(DummyQuestionComponent);
        this.questions[DUMMY_QUESTION_3] = new DummyQuestion(DummyQuestionComponent);
        this.questionOrder = [
            {key: DUMMY_QUESTION_1, heading: 'Dummy question 1'},
            {key: DUMMY_QUESTION_2, heading: 'Dummy question 2'},
            {key: DUMMY_QUESTION_3, heading: 'Dummy question 3'}
        ];
    }

    private getQuestionByKey(key: string): Question<any, QuestionBaseComponent<any>> {
        return this.questions[key];
    }

    public getQuestionByIndex(index: number): Question<any, QuestionBaseComponent<any>> {
        return this.questions[this.questionOrder[index].key];
    }

    public getHeading(index: number): string {
        return this.questionOrder[index].heading;
    }

    public isFinalQuestion(index: number): boolean {
        return index === this.questionOrder.length - 1;
    }

    public questionHasBeenAnswered(index: number): boolean {
        return this.getQuestionByIndex(index).response !== undefined;
    }

    public getFirstUnansweredQuestionIndex(): number {
        const index = this.questionOrder.findIndex(q => this.getQuestionByKey(q.key).response === undefined);
        return index === -1 ? this.questionOrder.length - 1 : index;
    }
}