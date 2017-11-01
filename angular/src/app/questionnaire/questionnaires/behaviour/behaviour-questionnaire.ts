import {Injectable} from "@angular/core";
import {Questionnaire} from "../../base-questionnaire/questionnaire";
import {ResponseData} from "../../../common/response-data/response-data";

@Injectable()
export class BehaviourQuestionnaire extends Questionnaire {
    constructor(responseData: ResponseData) {
        super(responseData, []);
    }
}
