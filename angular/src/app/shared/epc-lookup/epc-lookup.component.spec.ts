import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {EpcLookupComponent} from './epc-lookup.component';
import {ResponseData} from '../response-data/response-data';
import {EpcParserService} from '../postcode-epc-service/epc-api-service/epc-parser.service';
import {PostcodeEpcService} from '../postcode-epc-service/postcode-epc.service';
import {PostcodeDetails} from '../postcode-epc-service/model/postcode-details';
import {SpinnerAndErrorContainerComponent} from '../spinner-and-error-container/spinner-and-error-container.component';

describe('EpcLookupComponent', () => {
    let component: EpcLookupComponent;
    let fixture: ComponentFixture<EpcLookupComponent>;
    let responseData: ResponseData;

    const VALID_POSTCODE = 'SW1H0ET';
    const ALTERNATIVE_POSTCODE = 'NN35DA';
    const INVALID_POSTCODE = 'invalid';

    const dummyEpcsResponse = require('assets/test/dummy-epcs-response.json');

    const dummyPostcodeDetails: PostcodeDetails = {
        postcode: VALID_POSTCODE,
        allEpcsForPostcode: EpcParserService.parse(dummyEpcsResponse),
        localAuthorityCode: null
    };

    const postcodeEpcServiceStub = {
        fetchPostcodeDetails: (postcode) => {
            if (postcode === INVALID_POSTCODE) {
                return Observable.throw(PostcodeEpcService.POSTCODE_NOT_FOUND);
            }

            return Observable.of(dummyPostcodeDetails);
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EpcLookupComponent, SpinnerAndErrorContainerComponent],
            providers: [
                {provide: PostcodeEpcService, useValue: postcodeEpcServiceStub},
                ResponseData
            ],
            imports: [FormsModule, RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EpcLookupComponent);
        component = fixture.componentInstance;
        responseData = TestBed.get(ResponseData);
        fixture.detectChanges();
        spyOn(TestBed.get(PostcodeEpcService), 'fetchPostcodeDetails').and.callThrough();
        spyOn(component.epcSelected, 'emit');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the EPC API service when a postcode is provided', () => {
        // when
        component.postcode = VALID_POSTCODE;
        component.ngOnChanges({});
        fixture.detectChanges();

        // then
        expect(TestBed.get(PostcodeEpcService).fetchPostcodeDetails).toHaveBeenCalledWith(component.postcode);
    });

    it('should display an option for each EPC returned from the API', () => {
        // when
        component.postcode = VALID_POSTCODE;
        component.ngOnChanges({});
        fixture.detectChanges();

        // then
        const selectOptions = fixture.debugElement.queryAll(By.css('.address-option'));
        postcodeEpcServiceStub.fetchPostcodeDetails(component.postcode).toPromise().then(postcodeDetails =>
            postcodeDetails.allEpcsForPostcode.forEach(epc =>
                expect(selectOptions.some(option => option.nativeElement.text === epc.address)).toBeTruthy())
        );
    });

    it('should emit an event when an epc is selected', () => {
        // given
        component.postcode = VALID_POSTCODE;
        component.ngOnChanges({});
        fixture.detectChanges();

        // when
        const showerTypeSelect = fixture.debugElement.query(By.css('.address-dropdown'));
        // Angular syntax for custom ngValue
        showerTypeSelect.nativeElement.value = '1: 1';
        showerTypeSelect.nativeElement.dispatchEvent(new Event('change'));

        component.selectedEpc = dummyEpcsResponse;
        fixture.debugElement.query(By.css('.go-button')).nativeElement.click();

        // then
        expect(component.epcSelected.emit).toHaveBeenCalled();
    });

    it('should update the response data postcode when a new epc is selected', () => {
        // given
        component.postcode = VALID_POSTCODE;
        responseData.postcode = ALTERNATIVE_POSTCODE;
        component.ngOnChanges({});
        fixture.detectChanges();

        // when
        const showerTypeSelect = fixture.debugElement.query(By.css('.address-dropdown'));
        // Angular syntax for custom ngValue
        showerTypeSelect.nativeElement.value = '1: 1';
        showerTypeSelect.nativeElement.dispatchEvent(new Event('change'));

        component.selectedEpc = dummyEpcsResponse;
        fixture.debugElement.query(By.css('.go-button')).nativeElement.click();

        // then
        expect(responseData.postcode).toBe(VALID_POSTCODE);
    });

    it('should emit an event when "my address is not listed" is selected', () => {
        // given
        component.postcode = VALID_POSTCODE;
        component.ngOnChanges({});
        fixture.detectChanges();

        // when
        fixture.debugElement.query(By.css('.not-listed-button')).nativeElement.click();

        // then
        expect(component.epcSelected.emit).toHaveBeenCalled();
    });

    it('should update the response data postcode when "my address is not listed" is selected', () => {
        // given
        component.postcode = VALID_POSTCODE;
        responseData.postcode = ALTERNATIVE_POSTCODE;
        component.ngOnChanges({});
        fixture.detectChanges();

        // when
        fixture.debugElement.query(By.css('.not-listed-button')).nativeElement.click();

        // then
        expect(responseData.postcode).toBe(VALID_POSTCODE);
    });
});
