import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {RecommendedImprovementsQuestionComponent} from "./recommended-improvements-question.component";

export class RecommendedImprovementsQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            RecommendedImprovementsQuestionComponent,
            'recommended-improvements',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return true; // TODO
        // return responseData.homeType == null ||
        //     (!isDetached(responseData.homeType) && responseData.homeType !== HomeType.FlatDuplexOrMaisonette);
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.hasRecommendedImprovements != null;
    }
}
