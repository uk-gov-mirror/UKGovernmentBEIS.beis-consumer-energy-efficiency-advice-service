import {Injectable} from "@angular/core";
import {ResponseData} from "../shared/response-data/response-data";
import {getFuelTypeDescription} from "./questions/fuel-type-question/fuel-type";

@Injectable()
export class QuestionHeadingProcessor {
    private static readonly FUEL_TYPE_PLACEHOLDER = '{{fuel_type}}';

    constructor(private responseData: ResponseData) {
    }

    public replacePlaceholders(questionHeading) {
        const regex = new RegExp(QuestionHeadingProcessor.FUEL_TYPE_PLACEHOLDER, 'g');
        return questionHeading.replace(regex, getFuelTypeDescription(this.responseData.fuelType))
    }
}