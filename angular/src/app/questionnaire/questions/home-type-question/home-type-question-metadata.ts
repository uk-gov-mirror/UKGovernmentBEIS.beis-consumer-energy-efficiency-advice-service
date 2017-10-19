import {QuestionMetadata} from '../../base-question/question-metadata';
import {HomeTypeQuestionComponent} from './home-type-question.component';
import {HomeType} from './home-type';
import {QuestionType} from '../../question-type';

export class HomeTypeQuestionMetadata extends QuestionMetadata<HomeType> {
    constructor() {
        super(
            HomeTypeQuestionComponent,
            'So what type of home do you have?',
            QuestionType.House
        );
    }

    isApplicable(): boolean {
        return true;
    }
}