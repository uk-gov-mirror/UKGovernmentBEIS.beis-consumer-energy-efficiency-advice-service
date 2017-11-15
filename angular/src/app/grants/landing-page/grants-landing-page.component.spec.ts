import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {GrantsLandingPageComponent} from "./grants-landing-page.component";
import {ResponseData} from "../../shared/response-data/response-data";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {PostcodeDetails} from "../../shared/postcode-epc-service/model/postcode-details";
import {PostcodeEpcService} from "../../shared/postcode-epc-service/postcode-epc.service";
import {EpcParserService} from "../../shared/postcode-epc-service/epc-api-service/epc-parser.service";

describe('GrantsLandingPageComponent', () => {
    let component: GrantsLandingPageComponent;
    let fixture: ComponentFixture<GrantsLandingPageComponent>;

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
            declarations: [GrantsLandingPageComponent],
            providers: [
                ResponseData,
                {provide: PostcodeEpcService, useValue: postcodeEpcServiceStub}
            ],
            imports: [
                RouterTestingModule,
                FormsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GrantsLandingPageComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});