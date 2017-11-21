import {Injectable} from "@angular/core";
import {ResponseData} from "../shared/response-data/response-data";
import {getFuelTypeDescription} from "./questions/fuel-type-question/fuel-type";
import {getHomeTypeDescription} from "./questions/home-type-question/home-type";

@Injectable()
export class QuestionHeadingProcessor {
    private static readonly FUEL_TYPE_PLACEHOLDER = '{{fuel_type}}';
    private static readonly PROPERTY_PLACEHOLDER = '{{property}}';

    constructor(private responseData: ResponseData) {
    }

    public replacePlaceholders(questionHeading) {
        const fuelTypeRegex = new RegExp(QuestionHeadingProcessor.FUEL_TYPE_PLACEHOLDER, 'g');
        const propertyRegex = new RegExp(QuestionHeadingProcessor.PROPERTY_PLACEHOLDER, 'g');

        return questionHeading.replace(fuelTypeRegex, getFuelTypeDescription(this.responseData.fuelType))
            .replace(propertyRegex, getHomeTypeDescription(this.responseData.homeType));
    }
}