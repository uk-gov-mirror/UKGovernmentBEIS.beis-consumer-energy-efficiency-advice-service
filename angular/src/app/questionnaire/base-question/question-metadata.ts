import {Type} from "@angular/core";
import {QuestionBaseComponent} from "./question-base-component";
import {QuestionType} from "../question-type";
import {ResponseData} from "../../common/response-data/response-data";

export abstract class QuestionMetadata<S> {
    constructor(public componentType: Type<QuestionBaseComponent<S>>,
                public questionId: string,
                public questionType: QuestionType,) {
    }

    isApplicable(responseData: ResponseData): boolean {
        return true;
    }

    abstract hasBeenAnswered(responseData: ResponseData): boolean;
}
