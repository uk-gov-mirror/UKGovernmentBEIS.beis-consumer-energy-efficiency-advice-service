import {QuestionMetadata} from "../../base-question/question-metadata";
import {FlatStoreysQuestionComponent} from "./flat-storeys-question.component";
import {QuestionType} from "../question-type";
import {ResponseData} from "../../../shared/response-data/response-data";
import {HomeType} from "../home-type-question/home-type";

export class FlatStoreysQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            FlatStoreysQuestionComponent,
            'flat_storeys',
            QuestionType.House
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.numberOfStoreys !== undefined;
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.homeType === HomeType.FlatDuplexOrMaisonette || responseData.homeType === undefined;
    }
}