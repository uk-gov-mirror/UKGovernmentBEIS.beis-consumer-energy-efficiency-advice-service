import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs/Observable";

import {BoilerLandingPageComponent} from "./boiler-landing-page.component";
import {CarouselComponent} from "./carousel/carousel.component";
import {CarouselItemComponent} from "./carousel/carousel-item/carousel-item.component";
import {TimesPipe} from "../../shared/times/times.pipe";
import {PostcodeDetails} from "../../shared/postcode-epc-service/model/postcode-details";
import {PostcodeEpcService} from "../../shared/postcode-epc-service/postcode-epc.service";
import {EpcParserService} from "../../shared/postcode-epc-service/epc-api-service/epc-parser.service";

describe('BoilerLandingPageComponent', () => {
    let component: BoilerLandingPageComponent;
    let fixture: ComponentFixture<BoilerLandingPageComponent>;

    const dummyEpcsResponse = require('assets/test/dummy-epcs-response.json');

    let postcodeEpcResponse: Observable<PostcodeDetails>;

    let postcodeEpcServiceStub = {
        fetchPostcodeDetails: (postcode) => postcodeEpcResponse
    };

    beforeEach(async(() => {
        postcodeEpcResponse = Observable.of({
            allEpcsForPostcode: EpcParserService.parse(dummyEpcsResponse),
            postcode: 'SW1A1AA',
            localAuthorityCode: 'E09000033'
        });

        TestBed.configureTestingModule({
            declarations: [BoilerLandingPageComponent, CarouselComponent, CarouselItemComponent, TimesPipe],
            providers: [
                {provide: PostcodeEpcService, useValue: postcodeEpcServiceStub}
            ],
            imports: [FormsModule]
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
