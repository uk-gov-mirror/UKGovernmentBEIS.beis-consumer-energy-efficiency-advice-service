import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs/Observable";

import {BoilerPostcodeLookupComponent} from "./boiler-postcode-lookup.component";
import {EpcApiService} from "../../shared/epc-api-service/epc-api.service";
import {EpcParserService} from "../../shared/epc-api-service/epc-parser.service";

describe('BoilerPostcodeLookupComponent', () => {
    let component: BoilerPostcodeLookupComponent;
    let fixture: ComponentFixture<BoilerPostcodeLookupComponent>;

    const dummyEpcsResponse = require('assets/test/dummy-epcs-response.json');
    const epcApiServiceStub = {
        getEpcsForPostcode: (postcode) => Observable.of(EpcParserService.parse(dummyEpcsResponse))
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BoilerPostcodeLookupComponent],
            providers: [{provide: EpcApiService, useValue: epcApiServiceStub}],
            imports: [FormsModule, RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerPostcodeLookupComponent);
        spyOn(TestBed.get(EpcApiService), 'getEpcsForPostcode').and.callThrough();
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the EPC API service when a postcode is entered', () => {
        // when
        component.postcodeInput = 'SW1H0ET';
        fixture.debugElement.query(By.css('.postcode-input-submit')).nativeElement.click();
        fixture.detectChanges();

        // then
        expect(TestBed.get(EpcApiService).getEpcsForPostcode).toHaveBeenCalledWith(component.postcodeInput);
    });

    it('should display an option for each EPC returned from the API', () => {
        // when
        component.postcodeInput = 'SW1H0ET';
        fixture.debugElement.query(By.css('.postcode-input-submit')).nativeElement.click();
        fixture.detectChanges();

        // then
        const selectOptions = fixture.debugElement.queryAll(By.css('.address-option'));
        epcApiServiceStub.getEpcsForPostcode(component.postcodeInput).toPromise().then(epcs =>
           epcs.forEach(epc => expect(selectOptions.some(option => option.nativeElement.innerText === epc.address)).toBeTruthy())
        );
    });
});
