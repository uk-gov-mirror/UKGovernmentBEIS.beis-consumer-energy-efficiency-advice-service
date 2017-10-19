import {QuestionMetadata} from '../../base-question/question-metadata';
import {HomeAgeQuestionComponent} from './home-age-question.component';
import {HomeAge} from './home-age';
import {QuestionType} from '../../question-type';

export class HomeAgeQuestionMetadata extends QuestionMetadata<HomeAge> {
    constructor() {
        super(
            HomeAgeQuestionComponent,
            'How old is your home?',
            QuestionType.House
        );
    }

    isApplicable(): boolean {
        return true;
    }
}