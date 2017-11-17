import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs/Observable";

import {BoilerLandingPageComponent} from "./boiler-landing-page.component";
import {CarouselComponent} from "./carousel/carousel.component";
import {CarouselItemComponent} from "./carousel/carousel-item/carousel-item.component";
import {TimesPipe} from "../../shared/times/times.pipe";
import {BoilerMakeModelLookupComponent} from "../make-model-lookup/boiler-make-model-lookup.component";
import {BoilerPostcodeLookupComponent} from "../postcode-lookup/boiler-postcode-lookup.component";
import {EpcParserService} from "../../shared/epc-api-service/epc-parser.service";
import {EpcApiService} from "../../shared/epc-api-service/epc-api.service";
import {ResponseData} from "../../shared/response-data/response-data";

describe('BoilerLandingPageComponent', () => {
    let component: BoilerLandingPageComponent;
    let fixture: ComponentFixture<BoilerLandingPageComponent>;

    const dummyEpcsResponse = require('assets/test/dummy-epcs-response.json');
    const epcApiServiceStub = {
        getEpcsForPostcode: (postcode) => Observable.of(EpcParserService.parse(dummyEpcsResponse))
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BoilerLandingPageComponent,
                CarouselComponent,
                CarouselItemComponent,
                BoilerMakeModelLookupComponent,
                BoilerPostcodeLookupComponent,
                TimesPipe
            ],
            imports: [
                FormsModule,
                RouterTestingModule,
            ],
            providers: [
                {provide: EpcApiService, useValue: epcApiServiceStub},
                ResponseData,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerLandingPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
