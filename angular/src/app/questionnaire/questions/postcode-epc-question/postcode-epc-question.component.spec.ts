import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

import {PostcodeEpcQuestionComponent} from './postcode-epc-question.component';
import {ResponseData} from '../response-data';
import {PostcodeEpcQuestion} from './postcode-epc-question';
import {PostcodeEpcService} from './api-service/postcode-epc.service';

describe('PostcodeEpcQuestionComponent', () => {

    const VALID_POSTCODE = 'SW1H 0ET';

    let component: PostcodeEpcQuestionComponent;
    let fixture: ComponentFixture<PostcodeEpcQuestionComponent>;
    let responseData: ResponseData;

    let apiServiceStub;

    let dummyEpcResponse = require('../../assets/test/dummy-epc-response.json');

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PostcodeEpcQuestionComponent],
            imports: [FormsModule]
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
        responseData = new ResponseData();
        component.question = new PostcodeEpcQuestion(responseData);
        component.notifyOfCompletion = jasmine.createSpy('notifyOfCompletion');
        fixture.detectChanges();
        apiServiceStub = {
            getEpcData: (postcode) => Observable.of(dummyEpcResponse)
        };
    });

    describe('#construct', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('#handlePostcodeEntered', () => {
        it('should recognise a correct postcode as valid', () => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            component.handlePostcodeEntered();

            // then
            expect(component.error).toBeNull();
        });

        it('should recognise a correct postcode without space as valid', () => {
            // given
            component.postcodeInput = 'SW1H0ET';

            // when
            component.handlePostcodeEntered();

            // then
            expect(component.error).toBeNull();
        });

        it('should recognise a lowercase postcode as valid', () => {
            // given
            component.postcodeInput = 'sw1h 0et';

            // when
            component.handlePostcodeEntered();

            // then
            expect(component.error).toBeNull();
        });

        it('should recognise a correct shorter postcode as valid', () => {
            // given
            component.postcodeInput = 's1 0et';

            // when
            component.handlePostcodeEntered();

            // then
            expect(component.error).toBeNull();
        });

        it('should recognise an incorrect postcode as invalid', () => {
            // given
            component.postcodeInput = 's1 0e';

            // when
            component.handlePostcodeEntered();

            // then
            expect(component.error).toEqual(PostcodeComponent.ERROR_VALIDATION);
        });

        it('should recognise a postcode input with special characters as invalid', () => {
            // given
            component.postcodeInput = 'SW!H 0ET';

            // when
            component.handlePostcodeEntered();

            // then
            expect(component.error).toEqual(PostcodeComponent.ERROR_VALIDATION);
        });

        it('should call epc api if postcode is valid', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;
            let mockApiService = fixture.debugElement.injector.get(PostcodeEpcService);
            spyOn(mockApiService, 'getEpcData').and.callThrough();

            // when
            component.handlePostcodeEntered();

            // then
            fixture.whenStable().then(() => {
                expect(mockApiService.getEpcData).toHaveBeenCalledTimes(1);
                expect(mockApiService.getEpcData).toHaveBeenCalledWith(VALID_POSTCODE);
            });
        }));

        it('should not call epc api if postcode is not valid', async(() => {
            // given
            component.postcodeInput = 'invalid';
            let mockApiService = fixture.debugElement.injector.get(PostcodeEpcService);
            spyOn(mockApiService, 'getEpcData').and.callThrough();

            // when
            component.handlePostcodeEntered();

            // then
            fixture.whenStable().then(() => {
                expect(mockApiService.getEpcData).toHaveBeenCalledTimes(0);
            });
        }));

        it('should display all epcs which are returned', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            component.handlePostcodeEntered();

            // then
            fixture.whenStable().then(() => {
                // matches data in dummy-epc-response.json
                expect(component.allEpcsForPostcode.length).toEqual(3);
            });
        }));

        it('should order epcs by address', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            component.handlePostcodeEntered();

            // then
            fixture.whenStable().then(() => {
                // matches data in dummy-epc-response.json
                expect(component.allEpcsForPostcode[0].address1).toEqual('Apartment 1');
                expect(component.allEpcsForPostcode[1].address1).toEqual('Apartment 2');
                expect(component.allEpcsForPostcode[2].address1).toEqual('Apartment 3');
            });
        }));

        it('should display epcs correctly', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            component.handlePostcodeEntered();

            // then
            fixture.whenStable().then(() => {
                // matches data in dummy-epc-response.json
                expect(component.allEpcsForPostcode[0].getDisplayAddress()).toEqual('Apartment 1, 1 Test Street');
            });
        }));

        it('should display error message if no epcs are returned', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;
            let mockApiService = fixture.debugElement.injector.get(PostcodeEpcService);
            mockApiService.getEpcData = (postcode) => Observable.of(null);

            // when
            component.handlePostcodeEntered();

            // then
            fixture.whenStable().then(() => {
                expect(component.error).toEqual(PostcodeComponent.ERROR_NO_EPCS);
            });
        }));

        it('should display error message if epc api returns an error', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;
            let mockApiService = fixture.debugElement.injector.get(PostcodeEpcService);
            mockApiService.getEpcData = () => ErrorObservable.create('error');

            // when
            component.handlePostcodeEntered();

            // then
            fixture.whenStable().then(() => {
                expect(component.error).toEqual(PostcodeComponent.ERROR_EPC_API_FAILURE);
            });
        }));
    });

    it('should set the response when a valid postcode is entered', () => {
        // given
        const postcode = 'SW1H 0ET';
        component.postcodeInput = postcode;

        // when
        component.handlePostcodeEntered();

        // then
        expect(responseData.postCode).toBe(postcode);
    });

    it('should notify of completion when a valid postcode is entered', () => {
        // given
        component.postcodeInput = 'SW1H 0ET';

        // when
        component.handlePostcodeEntered();

        // then
        expect(component.notifyOfCompletion).toHaveBeenCalled();
    });
});
