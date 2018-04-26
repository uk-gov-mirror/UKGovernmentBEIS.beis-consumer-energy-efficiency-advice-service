import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {PostcodeLookupComponent} from './postcode-lookup.component';
import {ResponseData} from '../response-data/response-data';
import {EpcParserService} from '../postcode-epc-service/epc-api-service/epc-parser.service';
import {PostcodeEpcService} from '../postcode-epc-service/postcode-epc.service';
import {PostcodeDetails} from '../postcode-epc-service/model/postcode-details';
import {PostcodeApiService} from '../postcode-epc-service/postcode-api-service/postcode-api.service';
import {PostcodeBasicDetailsResponse} from '../postcode-epc-service/model/response/postcode-basic-details-response';
import {SpinnerAndErrorContainerComponent} from "../spinner-and-error-container/spinner-and-error-container.component";

describe('PostcodeLookupComponent', () => {
    let component: PostcodeLookupComponent;
    let fixture: ComponentFixture<PostcodeLookupComponent>;
    let responseData: ResponseData;

    const VALID_POSTCODE = 'SW1H0ET';
    const INVALID_POSTCODE = 'invalid';
    const mockPostcodeValidator = (postcode: string) => postcode === VALID_POSTCODE;

    const dummyEpcsResponse = require('assets/test/dummy-epcs-response.json');

    const dummyPostcodeDetails: PostcodeDetails = {
        postcode: VALID_POSTCODE,
        allEpcsForPostcode: EpcParserService.parse(dummyEpcsResponse),
        localAuthorityCode: null
    };

    const dummyPostcodeResponse = require('assets/test/dummy-postcode-response.json');
    const dummyBasicPostcodeDetails: PostcodeBasicDetailsResponse = dummyPostcodeResponse;

    const postcodeEpcServiceStub = {
        fetchPostcodeDetails: (postcode) => {
            if (postcode === INVALID_POSTCODE) {
                return Observable.throw(PostcodeEpcService.POSTCODE_NOT_FOUND);
            }

            return Observable.of(dummyPostcodeDetails);
        }
    };

    const postcodeApiServiceStub = {
        fetchBasicPostcodeDetails: (postcode) => {
            if (postcode === INVALID_POSTCODE) {
                return Observable.throw(PostcodeApiService.postcodeNotFoundStatus);
            }

            return Observable.of(dummyBasicPostcodeDetails);
        }
    };

    beforeEach(async(() => {
        spyOn(PostcodeEpcService, 'isValidPostcode').and.callFake(mockPostcodeValidator);

        TestBed.configureTestingModule({
            declarations: [PostcodeLookupComponent, SpinnerAndErrorContainerComponent],
            providers: [{provide: PostcodeEpcService, useValue: postcodeEpcServiceStub},
                {provide: PostcodeApiService, useValue: postcodeApiServiceStub},
                ResponseData
            ],
            imports: [FormsModule, RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PostcodeLookupComponent);
        component = fixture.componentInstance;
        responseData = TestBed.get(ResponseData);
        fixture.detectChanges();
        spyOn(TestBed.get(PostcodeEpcService), 'fetchPostcodeDetails').and.callThrough();
        spyOn(TestBed.get(PostcodeApiService), 'fetchBasicPostcodeDetails').and.callThrough();
        spyOn(component.addressSelected, 'emit');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the postcode API service when a postcode is entered', () => {
        // when
        component.postcodeInput = VALID_POSTCODE;
        fixture.debugElement.query(By.css('.postcode-input-submit')).nativeElement.click();
        fixture.detectChanges();

        // then
        expect(TestBed.get(PostcodeApiService).fetchBasicPostcodeDetails).toHaveBeenCalledWith(component.postcodeInput);
    });

    it('should call the EPC API service when a postcode is entered', () => {
        // when
        component.postcodeInput = VALID_POSTCODE;
        fixture.debugElement.query(By.css('.postcode-input-submit')).nativeElement.click();
        fixture.detectChanges();

        // then
        expect(TestBed.get(PostcodeEpcService).fetchPostcodeDetails).toHaveBeenCalledWith(component.postcodeInput);
    });

    it('should display an option for each EPC returned from the API', () => {
        // when
        component.postcodeInput = VALID_POSTCODE;
        fixture.debugElement.query(By.css('.postcode-input-submit')).nativeElement.click();
        fixture.detectChanges();

        // then
        const selectOptions = fixture.debugElement.queryAll(By.css('.address-option'));
        postcodeEpcServiceStub.fetchPostcodeDetails(component.postcodeInput).toPromise().then(postcodeDetails =>
            postcodeDetails.allEpcsForPostcode.forEach(epc =>
                expect(selectOptions.some(option => option.nativeElement.innerText === epc.address)).toBeTruthy())
        );
    });

    it('should set the postcode response upon entering a valid postcode', () => {
        // given
        component.postcodeInput = VALID_POSTCODE;

        // when
        fixture.debugElement.query(By.css('.postcode-input-submit')).nativeElement.click();
        fixture.detectChanges();

        const showerTypeSelect = fixture.debugElement.query(By.css('.address-dropdown'));
        // Angular syntax for custom ngValue
        showerTypeSelect.nativeElement.value = '1: 1';
        showerTypeSelect.nativeElement.dispatchEvent(new Event('change'));

        fixture.debugElement.query(By.css('.go-button')).nativeElement.click();

        // then
        expect(responseData.postcode).toEqual(VALID_POSTCODE);
    });

    it('should display an error message upon entering an invalid postcode', () => {
        // given
        component.postcodeInput = INVALID_POSTCODE;

        // when
        fixture.debugElement.query(By.css('.postcode-input-submit')).nativeElement.click();
        fixture.detectChanges();

        // then
        const errorMessage = fixture.debugElement.query(By.css('.error'));
        expect(errorMessage).not.toBeNull();
    });

    it('should emit an event when an address is selected', () => {
        // given
        component.postcodeInput = VALID_POSTCODE;

        // when
        fixture.debugElement.query(By.css('.postcode-input-submit')).nativeElement.click();
        fixture.detectChanges();

        const showerTypeSelect = fixture.debugElement.query(By.css('.address-dropdown'));
        // Angular syntax for custom ngValue
        showerTypeSelect.nativeElement.value = '1: 1';
        showerTypeSelect.nativeElement.dispatchEvent(new Event('change'));

        fixture.debugElement.query(By.css('.go-button')).nativeElement.click();

        // then
        expect(component.addressSelected.emit).toHaveBeenCalled();
    });
});
