import {Question} from "../question";
import {BoilerTypeQuestionComponent} from "./boiler-type-question.component";
import {ResponseData} from "../response-data";

export class BoilerTypeQuestion extends Question<boolean, BoilerTypeQuestionComponent> {
    constructor(responseData: ResponseData) {
        super(BoilerTypeQuestionComponent, 'Do you have a condensing boiler?', responseData);
    }

    get response(): boolean {
        return this.responseData.condensingBoiler;
    }

    set response(val: boolean) {
        this.responseData.condensingBoiler = val;
    }
}