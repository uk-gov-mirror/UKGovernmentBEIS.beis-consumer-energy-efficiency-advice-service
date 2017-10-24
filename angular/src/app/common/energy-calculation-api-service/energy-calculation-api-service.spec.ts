import {async, getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpRequest} from '@angular/common/http';

import {WordpressApiService} from '../wordpress-api-service/wordpress-api-service';
import {EnergyCalculationApiService} from './energy-calculation-api-service';
import {RdSapInput} from './request/rdsap-input';

describe('EnergyCalculationApiService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: EnergyCalculationApiService;

    const rdSapInput: RdSapInput = {
        property_type:"2",
        built_form:"4",
        flat_level:"1",
        construction_date:"A",
        num_storeys:1,
        num_bedrooms:1,
        heating_fuel:"26",
        measures:"Y",
        floor_area: undefined,
        isMinimalDataSet: () => true
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EnergyCalculationApiService,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}} ],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(EnergyCalculationApiService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#fetchQuestionsContent', () => {

        it('calls API and returns data correctly', async(() => {
            // given
            const mockApiResponse = require('assets/test/energy-calculation-response.json');

            // when
            const actualResponse = service.fetchEnergyCalculation(rdSapInput).toPromise();
            let request = httpMock.expectOne(matchesExpectedRequest);
            request.flush(mockApiResponse);

            // then
            actualResponse.then((energyCalculationResponse) => {
                // match data in 'assets/test/energy-calculation-response.json'
                expect(energyCalculationResponse['Total-Energy-Consumption']).toBe(5990.53);
                expect(energyCalculationResponse['Total-Lighting-Cost']).toBe(102.01);
                expect(Object.keys(energyCalculationResponse.measures).length).toBe(13);
            });
            httpMock.verify();
        }));

        it('throws an error if API returns an error', async(() => {
            // given
            const expectedStatus = 400;
            const expectedStatusText = 'bad request';

            // when
            const actualResponse = service.fetchEnergyCalculation(rdSapInput).toPromise();
            let request = httpMock.expectOne(matchesExpectedRequest);
            request.error(
                new ErrorEvent('mock network error'),
                {
                    status: expectedStatus,
                    statusText: expectedStatusText
                }
            );

            // then
            actualResponse.catch((errorResponse) => {
                expect(errorResponse.statusText).toBe(expectedStatusText);
                expect(errorResponse.status).toBe(expectedStatus);
            });
            httpMock.verify();
        }));

        function matchesExpectedRequest(request: HttpRequest<any>): boolean {
            const matchesExpectedMethod = request.method === 'POST';
            const matchesExpectedUrl = request.urlWithParams === 'angular-theme/v1/energy-calculation';
            const matchesExpectedBody = request.body.includes(JSON.stringify(rdSapInput));
            return matchesExpectedMethod && matchesExpectedUrl && matchesExpectedBody;
        }
    });
});