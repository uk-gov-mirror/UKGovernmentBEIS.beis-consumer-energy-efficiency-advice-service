import {async, getTestBed, TestBed} from "@angular/core/testing";
import "rxjs/add/operator/toPromise";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpRequest} from "@angular/common/http";

import {WordpressApiService} from "../wordpress-api-service/wordpress-api-service";
import {EnergyCalculationApiService} from "./energy-calculation-api-service";
import {RdSapInput} from "./request/rdsap-input";

describe('EnergyCalculationApiService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: EnergyCalculationApiService;

    const rdSapInput: RdSapInput = {
        epc: undefined,
        property_type: "2",
        built_form: "4",
        flat_level: "1",
        flat_top_storey: "Y",
        number_of_exposed_walls: 3,
        construction_date: "A",
        num_storeys: 1,
        num_bedrooms: 1,
        heating_fuel: "26",
        heating_cost: 1000,
        number_of_heating_off_hours_normal: [4, 4],
        measures: true,
        rented: true,
        floor_area: undefined,
        occupants: 1,
        living_room_temperature: 25,
        baths_per_week: 0,
        showers_per_week: 123,
        shower_type: '4',
        tumble_dry_percentage: 50,
        fridge_freezers: 5,
        fridges: 0,
        freezers: 26,
        isMinimalDataSet: () => true
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EnergyCalculationApiService,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}}],
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

    describe('#fetchEnergyCalculation', () => {

        it('calls API and returns data correctly', async(() => {
            // given
            const mockApiResponse = require('assets/test/energy-calculation-response.json');

            // when
            const actualResponse = service.fetchEnergyCalculation(rdSapInput).toPromise();
            httpMock.expectOne(matchesExpectedRequest).flush(mockApiResponse);

            // then
            actualResponse.then((energyCalculationResponse) => {
                // match data in 'assets/test/energy-calculation-response.json'
                expect(energyCalculationResponse['Total-Energy-Consumption']).toBe(25703.62);
                expect(energyCalculationResponse['Total-Lighting-Cost']).toBe(67.28);
                expect(Object.keys(energyCalculationResponse.measures).length).toBe(6);
            });
            httpMock.verify();
        }));

        it('throws an error if API returns an error', async(() => {
            // given
            const expectedStatus = 400;
            const expectedStatusText = 'bad request';

            // when
            const actualResponse = service.fetchEnergyCalculation(rdSapInput).toPromise();
            httpMock.expectOne(matchesExpectedRequest)
                .error(
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
            const matchesExpectedBody = request.body === rdSapInput;
            return matchesExpectedMethod && matchesExpectedUrl && matchesExpectedBody;
        }
    });
});