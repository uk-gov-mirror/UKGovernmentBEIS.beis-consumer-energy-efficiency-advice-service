import {QuestionMetadata} from '../../base-question/question-metadata';
import {PostcodeEpcQuestionComponent} from './postcode-epc-question.component';
import {PostcodeEpc} from './model/postcode-epc';
import {QuestionType} from '../../question-type';

export class PostcodeEpcQuestionMetadata extends QuestionMetadata<PostcodeEpc> {
    constructor() {
        super(
            PostcodeEpcQuestionComponent,
            'What\'s your postcode?',
            QuestionType.User
        );
    }

    isApplicable(): boolean {
        return true;
    }
}