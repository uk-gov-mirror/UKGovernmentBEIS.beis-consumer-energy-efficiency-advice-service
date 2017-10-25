import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ResponseData} from '../../../../../common/response-data/response-data';
import {ConfirmEpcQuestionComponent} from './confirm-epc-question.component';
import {Epc} from '../postcode-epc-question/model/epc';
import {HomeType} from '../home-type-question/home-type';
import {FuelType} from '../fuel-type-question/fuel-type';
import {ElectricityTariff} from '../electricity-tariff-question/electricity-tariff';
import {EpcResponse} from '../../../../questions/postcode-epc-question/model/response/epc/epc-response';

describe('ConfirmEpcQuestionComponent', () => {
    let component: ConfirmEpcQuestionComponent;
    let fixture: ComponentFixture<ConfirmEpcQuestionComponent>;
    let epcResponse: EpcResponse;

    function injectEpcAndDetectChanges(epc: Epc) {
        let injectedResponseData = fixture.debugElement.injector.get(ResponseData);
        injectedResponseData.epc = epc;
        fixture.detectChanges();
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfirmEpcQuestionComponent],
            providers: [ResponseData],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmEpcQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        epcResponse = require('assets/test/dummy-epc-response.json');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // TODO: add more tests once the intended behaviour of this page is more certain

    it('should display EPC results if there is an epc', async(() => {
        // when
        injectEpcAndDetectChanges(new Epc(epcResponse));

        // then
        fixture.whenStable().then(() => {
            expect(component.isEpcAvailable).toBeTruthy();
        });
    }));

    it('should not display EPC results if there is no epc', async(() => {
        // when
        injectEpcAndDetectChanges(null);

        // then
        fixture.whenStable().then(() => {
            expect(component.isEpcAvailable).toBeFalsy();
        });
    }));

    it('should display the EPC rating', async(() => {
        // given
        const expectedEpcRating = 'C';
        epcResponse['current-energy-rating'] = expectedEpcRating;

        // when
        injectEpcAndDetectChanges(new Epc(epcResponse));

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

        // when
        injectEpcAndDetectChanges(new Epc(epcResponse));

        // then
        fixture.whenStable().then(() => {
            expect(component.homeType).toEqual(HomeType.MidFloorFlat);
        });
    }));

    it('should display the fuel type if available', async(() => {
        // given
        epcResponse['mainheat-description'] = 'mains gas';

        // when
        injectEpcAndDetectChanges(new Epc(epcResponse));

        // then
        fixture.whenStable().then(() => {
            expect(component.fuelType).toEqual(FuelType.MainsGas);
        });
    }));

    it('should display the electricity tariff if available', async(() => {
        // given
        epcResponse['mainheat-description'] = 'electric storage heaters';
        epcResponse['hotwater-description'] = 'electric, off-peak tariff';

        // when
        injectEpcAndDetectChanges(new Epc(epcResponse));

        // then
        fixture.whenStable().then(() => {
            expect(component.electricityTariff).toEqual(ElectricityTariff.OffPeak);
        });
    }));

    it('should display the number of habitable rooms if available', async(() => {
        // given
        const expectedNumberHabitableRooms = 12;
        epcResponse['number-habitable-rooms'] = expectedNumberHabitableRooms.toString();

        // when
        injectEpcAndDetectChanges(new Epc(epcResponse));

        // then
        fixture.whenStable().then(() => {
            expect(component.numberHabitableRooms).toEqual(expectedNumberHabitableRooms);
        });
    }));

    it('should display the local authority if available', async(() => {
        // given
        const expectedLocalAuthority = 'Westminster';
        epcResponse['local-authority-label'] = expectedLocalAuthority;

        // when
        injectEpcAndDetectChanges(new Epc(epcResponse));

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
                expect(component.response.fuelType).toBe(FuelType.LPGGas);
                expect(component.response.homeType).toBe(HomeType.ParkHome);
                expect(component.response.electricityTariff).toBe(ElectricityTariff.OffPeak);
            });
        }));

        it('should notify of completion', () => {
            // when
            component.confirmEpcDetails();

            // then
            expect(component.complete.emit).toHaveBeenCalled();
        });
    });
});