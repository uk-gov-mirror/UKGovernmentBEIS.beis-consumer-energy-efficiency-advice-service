import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

import {PostcodeEpcQuestionComponent} from './postcode-epc-question.component';
import {ResponseData} from '../../../response-data/response-data';
import {PostcodeEpcService} from './api-service/postcode-epc.service';
import {Epc} from './model/epc';

describe('PostcodeEpcQuestionComponent', () => {

    const VALID_POSTCODE = 'SW1H 0ET';

    let component: PostcodeEpcQuestionComponent;
    let fixture: ComponentFixture<PostcodeEpcQuestionComponent>;

    const dummyEpcsResponse = require('assets/test/dummy-epcs-response.json');
    let apiServiceStub = {
        getEpcData: (postcode) => Observable.of(dummyEpcsResponse)
    };

    beforeEach(async(() => {
        spyOn(apiServiceStub, 'getEpcData').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [PostcodeEpcQuestionComponent],
            imports: [FormsModule],
            providers: [ResponseData]
        })
            .overrideComponent(PostcodeEpcQuestionComponent, {
            set: {
                providers: [{provide: PostcodeEpcService, useValue: apiServiceStub}]
            }
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PostcodeEpcQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    describe('#construct', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('#search-by-postcode', () => {
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

        it('should call epc api if postcode is valid', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();

            // then
            fixture.whenStable().then(() => {
                expect(apiServiceStub.getEpcData).toHaveBeenCalledTimes(1);
                expect(apiServiceStub.getEpcData).toHaveBeenCalledWith(VALID_POSTCODE);
            });
        }));

        it('should not call epc api if postcode is not valid', async(() => {
            // given
            component.postcodeInput = 'invalid';

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();

            // then
            fixture.whenStable().then(() => {
                expect(apiServiceStub.getEpcData).toHaveBeenCalledTimes(0);
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

        it('should display error message if epc api returns an error', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;
            let mockApiService = fixture.debugElement.injector.get(PostcodeEpcService);
            mockApiService.getEpcData = () => ErrorObservable.create('error');

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();

            // then
            fixture.whenStable().then(() => {
                expect(component.error).toEqual(PostcodeEpcQuestionComponent.ERROR_EPC_API_FAILURE);
            });
        }));

        it('should set the postcode response if epc api returns an error', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;
            let mockApiService = fixture.debugElement.injector.get(PostcodeEpcService);
            mockApiService.getEpcData = () => ErrorObservable.create('error');

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();

            // then
            fixture.whenStable().then(() => {
                expect(component.response.postcode).toEqual(VALID_POSTCODE);
            });
        }));

        it('should set the response if no epcs are returned', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;
            let mockApiService = fixture.debugElement.injector.get(PostcodeEpcService);
            mockApiService.getEpcData = (postcode) => Observable.of(null);

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {

                // then
                expect(component.response.postcode).toEqual(VALID_POSTCODE);
                expect(component.response.epc).toBeNull();
            });
        }));

        it('should notify of completion if no epcs are returned', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;
            let mockApiService = fixture.debugElement.injector.get(PostcodeEpcService);
            mockApiService.getEpcData = (postcode) => Observable.of(null);

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {

                // then
                expect(component.complete.emit).toHaveBeenCalled();
            });
        }));
    });

    describe('#select-epc', () => {
        it('should set the response when an epc is selected', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;
            const expectedEpc = new Epc(dummyEpcsResponse.rows[0]);

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const allEpcs = fixture.debugElement.query(By.css('.list-select')).children;
                allEpcs[0].nativeElement.click();

                // then
                expect(component.response.postcode).toEqual(VALID_POSTCODE);
                expect(component.response.epc).toEqual(expectedEpc);
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

        it('should set the response when address-not-listed is selected', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.debugElement.query(By.css('.address-not-listed')).nativeElement.click();

                // then
                expect(component.response.postcode).toEqual(VALID_POSTCODE);
                expect(component.response.epc).toEqual(null);
            });
        }));

        it('should notify of completion when address-not-listed is selected', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.debugElement.query(By.css('.address-not-listed')).nativeElement.click();

                // then
                expect(component.complete.emit).toHaveBeenCalled();
            });
        }));
    });
});
