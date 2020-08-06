import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

import {ResponseData} from '../../../shared/response-data/response-data';
import {EpcParserService} from '../../../shared/postcode-epc-service/epc-api-service/epc-parser.service';
import {PostcodeEpcService} from '../../../shared/postcode-epc-service/postcode-epc.service';
import {PostcodeDetails} from '../../../shared/postcode-epc-service/model/postcode-details';
import {SpinnerAndErrorContainerComponent} from "../../../shared/spinner-and-error-container/spinner-and-error-container.component";
import {CountryPostcodeQuestionComponent} from "./country-postcode-question.component";
import {Country} from "../postcode-epc-question/country";

describe('CountryPostcodeQuestionComponent', () => {

    const INVALID_POSTCODE = 'invalid';
    const VALID_POSTCODE = 'SW1H 0ET';

    let component: CountryPostcodeQuestionComponent;
    let fixture: ComponentFixture<CountryPostcodeQuestionComponent>;

    const dummyEpcsResponse = require('assets/test/dummy-epcs-response.json');
    const expectedLocalAuthorityCode = dummyEpcsResponse.rows[1]['local-authority'];

    let postcodeEpcResponse: Observable<PostcodeDetails>;

    const postcodeEpcServiceStub = {
        fetchPostcodeDetails: () => postcodeEpcResponse
    };

    beforeEach(async(() => {
        postcodeEpcResponse = Observable.of({
            postcode: VALID_POSTCODE,
            allEpcsForPostcode: EpcParserService.parse(dummyEpcsResponse),
            localAuthorityCode: expectedLocalAuthorityCode,
            country: Country.England
        });

        spyOn(postcodeEpcServiceStub, 'fetchPostcodeDetails').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [CountryPostcodeQuestionComponent, SpinnerAndErrorContainerComponent],
            imports: [FormsModule],
            providers: [
                ResponseData,
                {provide: PostcodeEpcService, useValue: postcodeEpcServiceStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CountryPostcodeQuestionComponent);
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
                expect(validationErrorMessage).toEqual(CountryPostcodeQuestionComponent.ERROR_VALIDATION);
                expect(component.complete.emit).not.toHaveBeenCalled();
            });
        }));

        it('should set the response for the postcode details', async(() => {
            // given
            component.postcodeInput = VALID_POSTCODE;
            postcodeEpcResponse = Observable.of({
                postcode: VALID_POSTCODE,
                allEpcsForPostcode: [],
                localAuthorityCode: expectedLocalAuthorityCode,
                country: Country.Wales
            });

            // when
            fixture.debugElement.query(By.css('.icon-search')).nativeElement.click();

            // then
            fixture.whenStable().then(() => {
                expect(component.postcode).toEqual(VALID_POSTCODE);
                expect(component.localAuthorityCode).toEqual(expectedLocalAuthorityCode);
                expect(component.country).toEqual(Country.Wales);
                expect(component.complete.emit).toHaveBeenCalled();
            });
        }));
    });
});
