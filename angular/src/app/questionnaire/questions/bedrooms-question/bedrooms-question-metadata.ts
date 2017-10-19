import {QuestionMetadata} from '../../base-question/question-metadata';
import {BedroomsQuestionComponent} from './bedrooms-question.component';
import {QuestionType} from '../../question-type';

export class BedroomsQuestionMetadata extends QuestionMetadata<number> {
    constructor() {
        super(
            BedroomsQuestionComponent,
            'How many bedrooms do you have?',
            QuestionType.House
        );
    }

    isApplicable(): boolean {
        return true;
    }
}