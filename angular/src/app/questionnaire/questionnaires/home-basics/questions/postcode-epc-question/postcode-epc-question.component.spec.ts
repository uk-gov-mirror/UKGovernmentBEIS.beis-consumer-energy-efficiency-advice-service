import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/defer';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

import {PostcodeEpcQuestionComponent} from './postcode-epc-question.component';
import {ResponseData} from '../../../../../common/response-data/response-data';
import {Epc} from './model/epc';
import {FeatureFlagService} from "../../../../../common/feature-flag/feature-flag.service";
import {EpcApiService} from '../../../../questions/postcode-epc-question/epc-api-service/epc-api.service';
import {PostcodeApiService} from '../../../../questions/postcode-epc-question/postcode-api-service/postcode-api.service';

describe('PostcodeEpcQuestionComponent', () => {

    const VALID_POSTCODE = 'SW1H 0ET';

    let component: PostcodeEpcQuestionComponent;
    let fixture: ComponentFixture<PostcodeEpcQuestionComponent>;
    let fetchEpcFeatureFlag: boolean;

    const dummyEpcsResponse = require('assets/test/dummy-epcs-response.json');
    const dummyPostcodeResponse = require('assets/test/dummy-postcode-response.json');
    let epcApiServiceStub = {
        getEpcData: (postcode) => Observable.of(dummyEpcsResponse)
    };
    let postcodeApiServiceStub = {
        getPostcodeDetails: (postcode) => Observable.of(dummyPostcodeResponse)
    };

    const mockFeatureFlagsObservable = Observable.defer(() => Observable.of({'fetch_epc_data': fetchEpcFeatureFlag}));
    const featureFlagServiceStub = {
        fetchFeatureFlags: () => mockFeatureFlagsObservable
    };

    beforeEach(async(() => {
        spyOn(epcApiServiceStub, 'getEpcData').and.callThrough();
        spyOn(postcodeApiServiceStub, 'getPostcodeDetails').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [PostcodeEpcQuestionComponent],
            imports: [FormsModule],
            providers: [ResponseData]
        })
            .overrideComponent(PostcodeEpcQuestionComponent, {
            set: {
                providers: [
                    {provide: FeatureFlagService, useValue: featureFlagServiceStub},
                    {provide: EpcApiService, useValue: epcApiServiceStub},
                    {provide: PostcodeApiService, useValue: postcodeApiServiceStub}
                ]
            }
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fetchEpcFeatureFlag = true;
        fixture = TestBed.createComponent(PostcodeEpcQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        spyOn(component, 'lookupBasicPostcodeDetails').and.callThrough();
        fixture.detectChanges();
    });

    describe('#construct', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('#handlePostcodeEntered', () => {
        it('should trim leading spaces from the postcode input', () => {
            // given
            component.postcodeInput = '   ' + VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();

            // then
            expect(component.postcodeInput).toEqual(VALID_POSTCODE);
        });

        it('should trim trailing spaces from the postcode input', () => {
            // given
            component.postcodeInput = VALID_POSTCODE + '   ';

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();

            // then
            expect(component.postcodeInput).toEqual(VALID_POSTCODE);
        });

        it('should recognise a correct postcode as valid', () => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();

            // then
            expect(component.error).toBeNull();
        });

        it('should recognise a correct postcode without space as valid', () => {
            // given
            component.postcodeInput = 'SW1H0ET';

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();

            // then
            expect(component.error).toBeNull();
        });

        it('should recognise a lowercase postcode as valid', () => {
            // given
            component.postcodeInput = 'sw1h 0et';

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();

            // then
            expect(component.error).toBeNull();
        });

        it('should recognise a correct shorter postcode as valid', () => {
            // given
            component.postcodeInput = 's1 0et';

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();

            // then
            expect(component.error).toBeNull();
        });

        it('should recognise an incorrect postcode as invalid', () => {
            // given
            component.postcodeInput = 's1 0e';

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();

            // then
            expect(component.error).toEqual(PostcodeEpcQuestionComponent.ERROR_VALIDATION);
        });

        it('should recognise a postcode input with special characters as invalid', () => {
            // given
            component.postcodeInput = 'SW!H 0ET';

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();

            // then
            expect(component.error).toEqual(PostcodeEpcQuestionComponent.ERROR_VALIDATION);
        });

        it('should call epc api if postcode is valid and feature flag is on', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();

            // then
            fixture.whenStable().then(() => {
                expect(epcApiServiceStub.getEpcData).toHaveBeenCalledTimes(1);
                expect(epcApiServiceStub.getEpcData).toHaveBeenCalledWith(VALID_POSTCODE);
            });
        }));

        it('should not call epc api if postcode is not valid', async(() => {
            // given
            component.postcodeInput = 'invalid';

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();

            // then
            fixture.whenStable().then(() => {
                expect(epcApiServiceStub.getEpcData).not.toHaveBeenCalled();
            });
        }));

        it('should not call epc api if feature flag is turned off', async(() => {
            // given
            fetchEpcFeatureFlag = false;
            component.postcodeInput = VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();
            fixture.detectChanges();

            // then
            fixture.whenStable().then(() => {
                expect(epcApiServiceStub.getEpcData).not.toHaveBeenCalled();
            });
        }));

        it('should display all epcs which are returned', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();

            // then
            fixture.whenStable().then(() => {
                // matches data in dummy-epcs-response.json
                expect(component.allEpcsForPostcode.length).toEqual(3);
            });
        }));

        it('should order epcs by address', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();

            // then
            fixture.whenStable().then(() => {
                // matches data in dummy-epcs-response.json
                expect(component.allEpcsForPostcode[0].address1).toEqual('Apartment 1');
                expect(component.allEpcsForPostcode[1].address1).toEqual('Apartment 2');
                expect(component.allEpcsForPostcode[2].address1).toEqual('Apartment 3');
            });
        }));

        it('should display epcs correctly', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();

            // then
            fixture.whenStable().then(() => {
                // matches data in dummy-epcs-response.json
                expect(component.allEpcsForPostcode[0].getDisplayAddress()).toEqual('Apartment 1, 1 Test Street');
            });
        }));

        it('should lookup basic postcode details if epc api returns an error', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;
            let mockApiService = fixture.debugElement.injector.get(EpcApiService);
            mockApiService.getEpcData = () => ErrorObservable.create('error');

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();

            // then
            fixture.whenStable().then(() => {
                expect(component.lookupBasicPostcodeDetails).toHaveBeenCalled();
            });
        }));

        it('should lookup basic postcode details if no epcs are returned', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;
            let mockApiService = fixture.debugElement.injector.get(EpcApiService);
            mockApiService.getEpcData = (postcode) => Observable.of(null);

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();
            fixture.detectChanges();

            // then
            fixture.whenStable().then(() => {
                expect(component.lookupBasicPostcodeDetails).toHaveBeenCalled();
            });
        }));

        it('should lookup basic postcode details if feature flag is turned off', async(() => {
            // given
            fetchEpcFeatureFlag = false;
            component.postcodeInput = VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();
            fixture.detectChanges();

            // then
            fixture.whenStable().then(() => {
                expect(component.lookupBasicPostcodeDetails).toHaveBeenCalled();
            });
        }));
    });

    describe('#select-epc', () => {
        it('should set the response when an epc is selected', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;
            const expectedEpc = new Epc(dummyEpcsResponse.rows[0]);
            const expectedLocalAuthorityCode = dummyEpcsResponse.rows[0]['local-authority'];

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const allEpcs = fixture.debugElement.query(By.css('.list-select')).children;
                allEpcs[0].nativeElement.click();

                // then
                expect(component.response.postcode).toEqual(VALID_POSTCODE);
                expect(component.response.epc).toEqual(expectedEpc);
                expect(component.response.localAuthorityCode).toEqual(expectedLocalAuthorityCode);
            });
        }));

        it('should notify of completion when an epc is selected', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const allEpcs = fixture.debugElement.query(By.css('.list-select')).children;
                allEpcs[0].nativeElement.click();

                // then
                expect(component.complete.emit).toHaveBeenCalled();
            });
        }));

        it('should lookup basic postcode details when address-not-listed is selected', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.debugElement.query(By.css('.address-not-listed')).nativeElement.click();

                // then
                expect(component.lookupBasicPostcodeDetails).toHaveBeenCalled();
            });
        }));
    });

    describe('#lookupBasicPostcodeDetails', () => {
        it('should lookup the postcode details', () => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            component.lookupBasicPostcodeDetails();

            // then
            expect(postcodeApiServiceStub.getPostcodeDetails).toHaveBeenCalled();
            expect(postcodeApiServiceStub.getPostcodeDetails).toHaveBeenCalledWith(VALID_POSTCODE);
        });

        it('should set the response if postcode details are returned', () => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            component.lookupBasicPostcodeDetails();

            // then
            // Match data in 'assets/test/dummy-postcode-repsonse.json'
            const expectedLocalAuthorityCode = 'E09000033';
            expect(component.response.postcode).toEqual(VALID_POSTCODE);
            expect(component.response.epc).toBeNull();
            expect(component.response.localAuthorityCode).toEqual(expectedLocalAuthorityCode);
        });

        it('should notify of completion if postcode details are returned', () => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            component.lookupBasicPostcodeDetails();

            // then
            expect(component.complete.emit).toHaveBeenCalled();
        });

        it('should display validation error message if postcode api returns with postcode-not-found', () => {
            // given
            component.postcodeInput = 'W11AA';
            let injectedMockPostcodeApiService = fixture.debugElement.injector.get(PostcodeApiService);
            injectedMockPostcodeApiService.getPostcodeDetails = () => ErrorObservable.create({status: 404, error: 'Postcode not found'});

            // when
            component.lookupBasicPostcodeDetails();

            // then
            expect(component.error).toEqual(PostcodeEpcQuestionComponent.ERROR_VALIDATION);
        });

        it('should set the response if postcode api returns with unknown error', () => {
            // given
            component.postcodeInput = VALID_POSTCODE;
            let injectedMockPostcodeApiService = fixture.debugElement.injector.get(PostcodeApiService);
            injectedMockPostcodeApiService.getPostcodeDetails = () => ErrorObservable.create('unknown error');

            // when
            component.lookupBasicPostcodeDetails();

            // then
            expect(component.response.postcode).toEqual(VALID_POSTCODE);
            expect(component.response.epc).toBeNull();
            expect(component.response.localAuthorityCode).toBeNull();
        });

        it('should notify of completion if postcode api returns with unknown error', () => {
            // given
            component.postcodeInput = VALID_POSTCODE;
            let injectedMockPostcodeApiService = fixture.debugElement.injector.get(PostcodeApiService);
            injectedMockPostcodeApiService.getPostcodeDetails = () => ErrorObservable.create('unknown error');

            // when
            component.lookupBasicPostcodeDetails();

            // then
            expect(component.complete.emit).toHaveBeenCalled();
        });
    });
});
