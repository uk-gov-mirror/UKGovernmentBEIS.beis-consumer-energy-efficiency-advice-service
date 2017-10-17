import {Question} from "../question";
import {ResponseData} from "../response-data";
import {BedroomsQuestionComponent} from "./bedrooms-question.component";

export class BedroomsQuestion extends Question<number, BedroomsQuestionComponent> {
    constructor(responseData: ResponseData) {
        super(BedroomsQuestionComponent, 'How many bedrooms do you have?', responseData);
    }

    get response(): number {
        return this.responseData.numberOfBedrooms;
    }

    set response(val: number) {
        this.responseData.numberOfBedrooms = val;
    }
}