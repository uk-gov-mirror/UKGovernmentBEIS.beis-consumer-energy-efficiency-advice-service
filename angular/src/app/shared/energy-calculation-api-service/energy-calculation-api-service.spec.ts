import {async, getTestBed, TestBed} from '@angular/core/testing';
import 'rxjs/add/operator/toPromise';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpRequest} from '@angular/common/http';
import {EnergyCalculationApiService} from './energy-calculation-api-service';
import {RdSapInput} from './request/rdsap-input';

describe('EnergyCalculationApiService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: EnergyCalculationApiService;
    (window as any).CONFIG = {apiRoot: "/api"};

    const rdSapInput: RdSapInput = {
        postcode: undefined,
        epc: undefined,
        property_type: '2',
        built_form: '4',
        flat_level: '1',
        flat_top_storey: 'Y',
        number_of_exposed_walls: 3,
        construction_date: 'A',
        num_storeys: 1,
        num_bedrooms: 1,
        heating_fuel: '26',
        heating_pattern_type: null,
        normal_days_off_hours: null,
        measures: true,
        rented: true,
        floor_area: undefined,
        occupants: 1,
        living_room_temperature: 25,
        baths_per_week: 0,
        showers_per_week: 123,
        shower_type: '4',
        condensing_boiler: false,
        electricity_tariff: undefined,
        roof_type: undefined,
        wall_type: undefined,
        glazing_type: undefined,
        hot_water_cylinder: false,
        isMinimalDataSet: () => true,
        measures_package: [],
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EnergyCalculationApiService],
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
            const matchesExpectedUrl = request.urlWithParams === '/api/energy-calculation';
            const matchesExpectedBody = request.body === rdSapInput;
            return matchesExpectedMethod && matchesExpectedUrl && matchesExpectedBody;
        }
    });
});
