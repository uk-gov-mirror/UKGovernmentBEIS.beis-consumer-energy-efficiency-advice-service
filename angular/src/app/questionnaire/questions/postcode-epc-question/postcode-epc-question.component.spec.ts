import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

import {PostcodeEpcQuestionComponent} from "./postcode-epc-question.component";
import {ResponseData} from "../../../shared/response-data/response-data";
import {Epc} from "../../../shared/postcode-epc-service/model/epc";
import {EpcParserService} from "../../../shared/postcode-epc-service/epc-api-service/epc-parser.service";
import {PostcodeEpcService} from "../../../shared/postcode-epc-service/postcode-epc.service";
import {PostcodeDetails} from "../../../shared/postcode-epc-service/model/postcode-details";

describe('PostcodeEpcQuestionComponent', () => {

    const INVALID_POSTCODE = 'invalid';
    const VALID_POSTCODE = 'SW1H 0ET';

    let component: PostcodeEpcQuestionComponent;
    let fixture: ComponentFixture<PostcodeEpcQuestionComponent>;

    const dummyEpcsResponse = require('assets/test/dummy-epcs-response.json');
    const expectedLocalAuthorityCode = dummyEpcsResponse.rows[1]['local-authority'];

    let postcodeEpcResponse: Observable<PostcodeDetails>;

    let postcodeEpcServiceStub = {
        fetchPostcodeDetails: (postcode) => postcodeEpcResponse
    };

    beforeEach(async(() => {
        postcodeEpcResponse = Observable.of({
            postcode: VALID_POSTCODE,
            allEpcsForPostcode: EpcParserService.parse(dummyEpcsResponse),
            localAuthorityCode: expectedLocalAuthorityCode
        });

        spyOn(postcodeEpcServiceStub, 'fetchPostcodeDetails').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [PostcodeEpcQuestionComponent],
            imports: [FormsModule],
            providers: [
                ResponseData,
                {provide: PostcodeEpcService, useValue: postcodeEpcServiceStub}
            ]
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

    describe('#handlePostcodeEntered', () => {
        it('should trim spaces from the postcode input', () => {
            // given
            component.postcodeInput = '  S W 1   A 1A    A    ';

            // when
            fixture.debugElement.query(By.css('.icon-search')).nativeElement.click();

            // then
            expect(component.postcodeInput).toEqual('SW1A1AA');
        });

        it('should display a validation error message if postcode is invalid or not found', async(() => {
            // given
            component.postcodeInput = INVALID_POSTCODE;
            postcodeEpcResponse = ErrorObservable.create(PostcodeEpcService.POSTCODE_NOT_FOUND);

            // when
            fixture.debugElement.query(By.css('.icon-search')).nativeElement.click();
            fixture.detectChanges();

            // then
            fixture.whenStable().then(() => {
                const validationErrorMessage = fixture.debugElement.query(By.css('.error-message')).nativeElement.innerText;
                expect(validationErrorMessage).toEqual(PostcodeEpcQuestionComponent.ERROR_VALIDATION);
            });
        }));

        it('should display an epc for each address returned', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.icon-search')).nativeElement.click();

            // then
            fixture.whenStable().then(() => {
                // matches data in dummy-epcs-response.json
                expect(component.allEpcsForPostcode.length).toEqual(4);
            });
        }));

        it('should order epcs by address', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.icon-search')).nativeElement.click();

            // then
            fixture.whenStable().then(() => {
                // matches data in dummy-epcs-response.json
                expect(component.allEpcsForPostcode[0].address1).toEqual('Apartment 1');
                expect(component.allEpcsForPostcode[1].address1).toEqual('Apartment 1');
                expect(component.allEpcsForPostcode[2].address1).toEqual('Apartment 2');
                expect(component.allEpcsForPostcode[3].address1).toEqual('Apartment 3');
            });
        }));

        it('should display epcs correctly', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.icon-search')).nativeElement.click();

            // then
            fixture.whenStable().then(() => {
                // matches data in dummy-epcs-response.json
                expect(component.allEpcsForPostcode[0].getDisplayAddress()).toEqual('Apartment 1, 1 Test Street');
            });
        }));

        it('should set the response for postcode and local authority if no epcs are returned', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;
            postcodeEpcResponse = Observable.of({
                postcode: VALID_POSTCODE,
                allEpcsForPostcode: [],
                localAuthorityCode: expectedLocalAuthorityCode
            });

            // when
            fixture.debugElement.query(By.css('.icon-search')).nativeElement.click();

            // then
            fixture.whenStable().then(() => {
                expect(component.postcode).toEqual(VALID_POSTCODE);
                expect(component.localAuthorityCode).toEqual(expectedLocalAuthorityCode);
            });
        }));

        it('should notify of completion if no epcs are returned', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;
            postcodeEpcResponse = Observable.of({
                postcode: VALID_POSTCODE,
                allEpcsForPostcode: [],
                localAuthorityCode: expectedLocalAuthorityCode
            });

            // when
            fixture.debugElement.query(By.css('.icon-search')).nativeElement.click();

            // then
            fixture.whenStable().then(() => {
                expect(component.complete.emit).toHaveBeenCalled();
            });
        }));
    });

    describe('#select-epc', () => {
        it('should set the response when an epc is selected', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;
            const expectedEpc = new Epc(dummyEpcsResponse.rows[1]);

            // when
            fixture.debugElement.query(By.css('.icon-search')).nativeElement.click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const allEpcs = fixture.debugElement.query(By.css('.list-select')).children;
                allEpcs[0].nativeElement.click();

                // then
                expect(component.postcode).toEqual(VALID_POSTCODE);
                expect(component.epc).toEqual(expectedEpc);
                expect(component.localAuthorityCode).toEqual(expectedLocalAuthorityCode);
            });
        }));

        it('should notify of completion when an epc is selected', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.icon-search')).nativeElement.click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const allEpcs = fixture.debugElement.query(By.css('.list-select')).children;
                allEpcs[0].nativeElement.click();

                // then
                expect(component.complete.emit).toHaveBeenCalled();
            });
        }));

        it('should set the response for postcode and local authority code when address-not-listed is selected', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.icon-search')).nativeElement.click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.debugElement.query(By.css('.address-not-listed')).nativeElement.click();

                // then
                expect(component.postcode).toEqual(VALID_POSTCODE);
                expect(component.epc).toBeNull();
                expect(component.localAuthorityCode).toEqual(expectedLocalAuthorityCode);
            });
        }));

        it('should notify of completion when address-not-listed is selected', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;

            // when
            fixture.debugElement.query(By.css('.icon-search')).nativeElement.click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.debugElement.query(By.css('.address-not-listed')).nativeElement.click();

                // then
                expect(component.complete.emit).toHaveBeenCalled();
            });
        }));
    });
});