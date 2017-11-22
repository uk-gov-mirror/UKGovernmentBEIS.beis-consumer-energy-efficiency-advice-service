import {getTestBed, TestBed} from "@angular/core/testing";
import "rxjs/add/operator/toPromise";

import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {WordpressApiService} from "../../shared/wordpress-api-service/wordpress-api-service";
import {HttpRequest} from "@angular/common/http";
import {BoilerTypesService} from "./boiler-types.service";
import {AllBoilerTypes, BoilerType} from "./boiler-type";

describe('EpcApiService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: BoilerTypesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BoilerTypesService,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}}],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(BoilerTypesService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#fetchBoilerTypes', () => {

        it('returns boiler types from the WP backend', () => {
            // given
            const boilerTypesResponse = require('assets/test/boiler-types-response.json');

            // when
            const actualResponse = service.fetchBoilerTypes().toPromise();
            let request = httpMock.expectOne(matchesExpectedRequest);
            request.flush(boilerTypesResponse);

            // then
            actualResponse.then(response =>
                expect(response).toEqual(new AllBoilerTypes(boilerTypesResponse))
            );
        });

        function matchesExpectedRequest(request: HttpRequest<any>): boolean {
            const matchesExpectedMethod = request.method === 'GET';
            const matchesExpectedUrl = request.urlWithParams === 'acf/v3/boiler?per_page=1000';
            return matchesExpectedMethod && matchesExpectedUrl;
        }
    });
});
