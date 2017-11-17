import {Injectable} from "@angular/core";
import {ResponseData} from "../shared/response-data/response-data";
import {getFuelTypeDescription} from "./questions/fuel-type-question/fuel-type";

@Injectable()
export class QuestionHeadingProcessor {
    private static readonly FUEL_TYPE_PLACEHOLDER = '/{{fuel_type}}/g';

    constructor(private responseData: ResponseData) {
    }

    public replacePlaceholders(questionHeading) {
        return questionHeading.replace(QuestionHeadingProcessor.FUEL_TYPE_PLACEHOLDER, getFuelTypeDescription(this.responseData.fuelType))
    }
}