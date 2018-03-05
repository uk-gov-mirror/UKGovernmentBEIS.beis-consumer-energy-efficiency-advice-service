import {Injectable} from '@angular/core';
import {ResponseData} from '../shared/response-data/response-data';
import {getFuelTypeDescription} from './questions/fuel-type-question/fuel-type';
import {getHomeTypeDescription} from './questions/home-type-question/home-type';

export interface ReplacementProcedures {
    placeholder: RegExp;
    replacementFinder: (ResponseData) => string;
}

@Injectable()
export class QuestionHeadingProcessor {
    private static readonly FUEL_TYPE_PLACEHOLDER = '{{fuel_type}}';
    private static readonly PROPERTY_PLACEHOLDER = '{{property}}';

    private static readonly REPLACEMENT_PROCEDURES: ReplacementProcedures[] =
        [
            {
                placeholder: new RegExp(QuestionHeadingProcessor.FUEL_TYPE_PLACEHOLDER, 'g'),
                replacementFinder: (responseData: ResponseData): string => {
                    return getFuelTypeDescription(responseData.fuelType);
                }
            },
            {
                placeholder: new RegExp(QuestionHeadingProcessor.PROPERTY_PLACEHOLDER, 'g'),
                replacementFinder: (responseData: ResponseData): string => {
                    return getHomeTypeDescription(responseData.homeType);
                }
            }
        ];

    constructor(private responseData: ResponseData) {
    }

    public replacePlaceholders(questionHeading) {
        QuestionHeadingProcessor.REPLACEMENT_PROCEDURES.forEach(
            (replacement: ReplacementProcedures): void => {
                questionHeading = questionHeading.replace(replacement.placeholder, replacement.replacementFinder(this.responseData));
            }
        );

        return questionHeading;
    }
}
