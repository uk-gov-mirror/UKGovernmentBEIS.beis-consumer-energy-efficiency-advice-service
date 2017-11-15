import {async, ComponentFixture, TestBed} from "@angular/core/testing";
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
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
