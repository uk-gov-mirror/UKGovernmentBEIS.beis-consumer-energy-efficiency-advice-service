import {TestBed, getTestBed} from "@angular/core/testing"

import {QuestionHeadingProcessor} from "./questionHeadingProcessor.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ResponseData} from "../shared/response-data/response-data";
import {FuelType} from "./questions/fuel-type-question/fuel-type";
import {HomeType} from "./questions/home-type-question/home-type";

fdescribe('questionHeadingProcessor', () => {
    let injector: TestBed;
    let service: QuestionHeadingProcessor;
    let responseData: ResponseData;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [QuestionHeadingProcessor, ResponseData]
        });
        injector = getTestBed();
        service = TestBed.get(QuestionHeadingProcessor);
        responseData = TestBed.get(ResponseData);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        })
    });

    describe('#replacePlaceholders', () => {
        it('replaces fuel type placeholder in aquestion', () => {
            // given
            const question = 'What do you pay a month for your {{fuel_type}}?';
            responseData.fuelType = FuelType.Electricity;

            // when
            const processedQuestion = service.replacePlaceholders(question);

            // then
            expect(processedQuestion).toBe('What do you pay a month for your electricity?');
        });

        it('replaces multiple placeholders in a question', () => {
            // given
            const question = 'Is your fuel type {{fuel_type}} and your property {{property}}?';
            responseData.fuelType = FuelType.Electricity;
            responseData.homeType = HomeType.TopFloorFlat;

            // when
            const processedQuestion = service.replacePlaceholders(question);

            // then
            expect(processedQuestion).toBe('Is your fuel type electricity and your property top floor flat?');
        });

        it('replaces placeholder that appears multiple times in a question', () => {
            // given
            const question = 'You have indicated that you use {{fuel_type}}. Is {{fuel_type}} what you actually want to use?';
            responseData.fuelType = FuelType.Electricity;

            // when
            const processedQuestion = service.replacePlaceholders(question);

            // then
            expect(processedQuestion).toBe('You have indicated that you use electricity. Is electricity what you actually want to use?');
        })
    })
});