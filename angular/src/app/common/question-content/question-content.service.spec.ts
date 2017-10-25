import {TestBed, getTestBed, async} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpRequest} from "@angular/common/http";

import {QuestionContentService} from './question-content.service';
import {WordpressApiService} from '../wordpress-api-service/wordpress-api-service';

describe('QuestionContentService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: QuestionContentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [QuestionContentService,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}} ],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(QuestionContentService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#fetchQuestionsContent', () => {

        it('should return data from the wordpress API', async(() => {
            // given
            const mockApiResponse = require('assets/test/questions-response.json');

            // when
            const actualResponse = service.fetchQuestionsContent().toPromise();
            let request = httpMock.expectOne(matchesExpectedRequest);
            request.flush(mockApiResponse);

            // then
            actualResponse.then((questionsContent) => {
                // match data in 'assets/test/questions-response.json'
                expect(Object.keys(questionsContent).length).toBe(10);
                expect(questionsContent['boiler-type'].questionHeading).toBe('Do you have a condensing boiler?');
                expect(questionsContent['boiler-type'].helpText).toBe('Dummy help text for boiler type question');
            });
            httpMock.verify();
        }));

        function matchesExpectedRequest(request: HttpRequest<any>): boolean {
            const matchesExpectedMethod = request.method === 'GET';
            const matchesExpectedUrl = request.urlWithParams === 'acf/v3/question';
            return matchesExpectedMethod && matchesExpectedUrl;
        }
    });
});