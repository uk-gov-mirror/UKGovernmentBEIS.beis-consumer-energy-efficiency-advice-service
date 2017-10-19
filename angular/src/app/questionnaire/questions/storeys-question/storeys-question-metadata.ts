import {QuestionMetadata} from '../../base-question/question-metadata';
import {StoreysQuestionComponent} from './storeys-question.component';
import {QuestionType} from '../../question-type';

export class StoreysQuestionMetadata extends QuestionMetadata<number> {
    constructor() {
        super(
            StoreysQuestionComponent,
            'How many storeys does your home have?',
            QuestionType.House
        );
    }

    isApplicable(): boolean {
        return true;
    }
}