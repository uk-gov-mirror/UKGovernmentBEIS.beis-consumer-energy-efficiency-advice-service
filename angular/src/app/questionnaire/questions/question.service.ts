import { Injectable } from '@angular/core';
import {Question} from "./question";
import {QuestionBaseComponent} from "./question.component";
import {HomeTypeQuestionComponent} from "./home-type-question/home-type-question.component";
import {HomeTypeQuestion} from "./home-type-question/home-type-question";

const HOME_TYPE_QUESTION = 'home-type';

@Injectable()
export class QuestionService {

    private readonly questions: { [s: string]: Question<any, QuestionBaseComponent<any>>; };
    private readonly questionOrder: {key: string, heading: string}[];

    constructor() {
        this.questions = {};
        this.questions[HOME_TYPE_QUESTION] = new HomeTypeQuestion(HomeTypeQuestionComponent);
        this.questionOrder = [
            {key: HOME_TYPE_QUESTION, heading: 'So what type of home do you have?'}
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