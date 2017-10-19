import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ResponseData} from '../response-data';
import {ConfirmEpcQuestionComponent} from './confirm-epc-question.component';
import {ConfirmEpcQuestion} from './confirm-epc-question';
import {Epc} from '../postcode-epc-question/model/epc';
import {EpcResponse} from '../postcode-epc-question/model/response/epc-response';
import {HomeType} from '../home-type-question/home-type';
import {FuelType} from '../fuel-type-question/fuel-type';
import {ElectricityTariff} from '../electricity-tariff-question/electricity-tariff';

describe('ConfirmEpcQuestionComponent', () => {
    let component: ConfirmEpcQuestionComponent;
    let fixture: ComponentFixture<ConfirmEpcQuestionComponent>;
    let responseData: ResponseData = new ResponseData();
    let epcResponse: EpcResponse;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfirmEpcQuestionComponent],
            providers: [ {provide: ResponseData, useValue: responseData } ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmEpcQuestionComponent);
        component = fixture.componentInstance;
        epcResponse = require('assets/test/dummy-epc-response.json');
        responseData = new ResponseData();
        component.question = new ConfirmEpcQuestion(responseData);
        component.notifyOfCompletion = jasmine.createSpy('notifyOfCompletion');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // TODO: add more tests once the intended behaviour of this page is more certain

    it('should display EPC results if there is an epc', async(() => {
        // given
        let injectedResponseData = fixture.debugElement.injector.get(ResponseData);
        injectedResponseData.epc = new Epc(epcResponse);

        // when
        fixture.detectChanges();

        // then
        fixture.whenStable().then(() => {
            expect(component.isEpcAvailable).toBeTruthy();
        });
    }));

    it('should not display EPC results if there is no epc', async(() => {
        // given
        let injectedResponseData = fixture.debugElement.injector.get(ResponseData);
        injectedResponseData.epc = null;

        // when
        fixture.detectChanges();

        // then
        fixture.whenStable().then(() => {
            expect(component.isEpcAvailable).toBeFalsy();
        });
    }));

    it('should display the EPC rating', async(() => {
        // given
        const expectedEpcRating = 'C';
        epcResponse['current-energy-rating'] = expectedEpcRating;
        let injectedResponseData = fixture.debugElement.injector.get(ResponseData);
        injectedResponseData.epc = new Epc(epcResponse);

        // when
        fixture.detectChanges();

        // then
        fixture.whenStable().then(() => {
            expect(component.epcRating).toEqual(expectedEpcRating);
        });
    }));

    it('should display the home type if available', async(() => {
        // given
        epcResponse['property-type'] = 'Flat';
        epcResponse['flat-top-storey'] = 'N';
        epcResponse['floor-level'] = '1';
        let injectedResponseData = fixture.debugElement.injector.get(ResponseData);
        injectedResponseData.epc = new Epc(epcResponse);

        // when
        fixture.detectChanges();

        // then
        fixture.whenStable().then(() => {
            expect(component.homeType).toEqual(HomeType.MidFloorFlat);
        });
    }));

    it('should display the fuel type if available', async(() => {
        // given
        epcResponse['mainheat-description'] = 'mains gas';
        let injectedResponseData = fixture.debugElement.injector.get(ResponseData);
        injectedResponseData.epc = new Epc(epcResponse);

        // when
        fixture.detectChanges();

        // then
        fixture.whenStable().then(() => {
            expect(component.fuelType).toEqual(FuelType.MainsGas);
        });
    }));

    it('should display the electricity tariff if available', async(() => {
        // given
        epcResponse['mainheat-description'] = 'electric storage heaters';
        epcResponse['hotwater-description'] = 'electric, off-peak tariff';
        let injectedResponseData = fixture.debugElement.injector.get(ResponseData);
        injectedResponseData.epc = new Epc(epcResponse);

        // when
        fixture.detectChanges();

        // then
        fixture.whenStable().then(() => {
            expect(component.electricityTariff).toEqual(ElectricityTariff.OffPeak);
        });
    }));

    it('should display the number of habitable rooms if available', async(() => {
        // given
        const expectedNumberHabitableRooms = 12;
        epcResponse['number-habitable-rooms'] = expectedNumberHabitableRooms.toString();
        let injectedResponseData = fixture.debugElement.injector.get(ResponseData);
        injectedResponseData.epc = new Epc(epcResponse);

        // when
        fixture.detectChanges();

        // then
        fixture.whenStable().then(() => {
            expect(component.numberHabitableRooms).toEqual(expectedNumberHabitableRooms);
        });
    }));

    it('should display the local authority if available', async(() => {
        // given
        const expectedLocalAuthority = 'Westminster';
        epcResponse['local-authority-label'] = expectedLocalAuthority;
        let injectedResponseData = fixture.debugElement.injector.get(ResponseData);
        injectedResponseData.epc = new Epc(epcResponse);

        // when
        fixture.detectChanges();

        // then
        fixture.whenStable().then(() => {
            expect(component.localAuthorityDescription).toEqual(expectedLocalAuthority);
        });
    }));

    describe('#confirmEpcDetails', () => {

        beforeEach(() => fixture.detectChanges());

        it('should autopopulate future questions', async(() => {
            // given
            component.fuelType = FuelType.LPGGas;
            component.homeType = HomeType.ParkHome;
            component.electricityTariff = ElectricityTariff.OffPeak;

            // when
            component.confirmEpcDetails();

            // then
            fixture.whenStable().then(() => {
                expect(component.question.response.fuelType).toBe(FuelType.LPGGas);
                expect(component.question.response.homeType).toBe(HomeType.ParkHome);
                expect(component.question.response.electricityTariff).toBe(ElectricityTariff.OffPeak);
            });
        }));

        it('should notify of completion', () => {
            // when
            component.confirmEpcDetails();

            // then
            expect(component.notifyOfCompletion).toHaveBeenCalled();
        });
    });
});