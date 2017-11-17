import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";

import {GrantsLandingPageComponent} from "./grants-landing-page.component";
import {ResponseData} from "../../shared/response-data/response-data";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {PostcodeDetails} from "../../shared/postcode-epc-service/model/postcode-details";
import {PostcodeEpcService} from "../../shared/postcode-epc-service/postcode-epc.service";
import {EpcParserService} from "../../shared/postcode-epc-service/epc-api-service/epc-parser.service";
import {GrantCardComponent} from "../../shared/grant-card/grant-card.component";
import {LocalAuthorityService} from "../../shared/local-authority-service/local-authority.service";
import {GrantEligibility} from "../../shared/grants-eligibility/grant-eligibility";
import {LocalAuthority} from "../../shared/local-authority-service/local-authority";
import {LocalAuthorityGrantViewModel} from "../../shared/grant/local-authority-grant-view-model";

describe('GrantsLandingPageComponent', () => {
    let component: GrantsLandingPageComponent;
    let fixture: ComponentFixture<GrantsLandingPageComponent>;
    let responseData: ResponseData;

    const dummyEpcsResponse = require('assets/test/dummy-epcs-response.json');
    const postcode = "SW1A1AA";
    const localAuthorityCode = "E09000033";
    const localAuthorityName = "Westminster";
    const localAuthorityGrants: LocalAuthorityGrantViewModel[] = [
        {
            name: 'Grant 1',
            description: 'some grant',
            eligibility: GrantEligibility.MayBeEligible
        },
        {
            name: 'Grant 2',
            description: 'another grant',
            eligibility: GrantEligibility.MayBeEligible
        }
    ];

    let postcodeEpcResponse: Observable<PostcodeDetails>;
    let postcodeEpcServiceStub = {
        fetchPostcodeDetails: (postcode) => postcodeEpcResponse
    };

    let localAuthorityResponse: Observable<LocalAuthority>;
    let localAuthorityServiceStub = {
        fetchLocalAuthorityDetails: () => localAuthorityResponse
    };

    beforeEach(async(() => {
        postcodeEpcResponse = Observable.of({
            allEpcsForPostcode: EpcParserService.parse(dummyEpcsResponse),
            postcode: postcode,
            localAuthorityCode: localAuthorityCode
        });
        localAuthorityResponse = Observable.of({
            name: localAuthorityName,
            isEcoFlexActive: true,
            ecoFlexMoreInfoLink: 'http://www.example.com',
            grants: localAuthorityGrants
        });

        spyOn(postcodeEpcServiceStub, 'fetchPostcodeDetails').and.callThrough();
        spyOn(localAuthorityServiceStub, 'fetchLocalAuthorityDetails').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [GrantsLandingPageComponent, GrantCardComponent],
            providers: [
                ResponseData,
                {provide: PostcodeEpcService, useValue: postcodeEpcServiceStub},
                {provide: LocalAuthorityService, useValue: localAuthorityServiceStub},
            ],
            imports: [
                CommonModule,
                RouterTestingModule,
                FormsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GrantsLandingPageComponent);
        component = fixture.componentInstance;
        responseData = TestBed.get(ResponseData);
        fixture.detectChanges();
    });

    describe('#construct', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('#onPostcodeSubmit', () => {
        it('should strip spaces and lookup the postcode details', async(() => {
            // when
            submitPostcode('sw1a 1aa  ');

            // then
            fixture.whenStable().then(() => {
                expect(postcodeEpcServiceStub.fetchPostcodeDetails).toHaveBeenCalledWith('sw1a1aa');
            });
        }));

        it('should display a validation error if postcode is not found', async(() => {
            // given
            postcodeEpcResponse = ErrorObservable.create(PostcodeEpcService.POSTCODE_NOT_FOUND);

            // when
            submitPostcode(postcode);

            // then
            fixture.whenStable().then(() => {
                const validationErrorElement = fixture.debugElement.query(By.css('.validation-error'));
                expect(validationErrorElement).toBeTruthy();
            });
        }));

        it('should display a generic error if there is a network error when fetching postcode details', async(() => {
            // given
            postcodeEpcResponse = ErrorObservable.create('test network error fetching postcode details');

            // when
            submitPostcode(postcode);

            // then
            fixture.whenStable().then(() => {
                const genericErrorElement = fixture.debugElement.query(By.css('.network-error'));
                expect(genericErrorElement).toBeTruthy();
            });
        }));

        it('should save the postcode and local authority code to response data', async(() => {
            // when
            submitPostcode(postcode);

            // then
            fixture.whenStable().then(() => {
                expect(responseData.postcode).toEqual(postcode);
                expect(responseData.localAuthorityCode).toEqual(localAuthorityCode);
            });
        }));

        it('should fetch the local authority name', async(() => {
            // when
            submitPostcode(postcode);

            // then
            fixture.whenStable().then(() => {
                expect(localAuthorityServiceStub.fetchLocalAuthorityDetails).toHaveBeenCalledWith(localAuthorityCode);
            });
        }));

        it('should display the local authority name', async(() => {
            // when
            submitPostcode(postcode);

            // then
            fixture.whenStable().then(() => {
                const localAuthorityNameElement = fixture.debugElement.query(By.css('.local-grants .local-authority-name')).nativeElement;
                expect(localAuthorityNameElement.innerText).toContain(localAuthorityName);
            });
        }));

        it('should display all grants returned', async(() => {
            // when
            submitPostcode(postcode);

            // then
            fixture.whenStable().then(() => {
                const grantsCards = fixture.debugElement.queryAll(By.directive(GrantCardComponent));
                expect(grantsCards.length).toEqual(2);
            });
        }));

        it('should display a message if no grants are returned', async(() => {
            // given
            localAuthorityResponse = Observable.of({
                name: localAuthorityName,
                isEcoFlexActive: true,
                ecoFlexMoreInfoLink: 'http://www.example.com',
                grants: []
            });

            // when
            submitPostcode(postcode);

            // then
            fixture.whenStable().then(() => {
                const localAuthorityMessageElement = fixture.debugElement.query(By.css('.no-local-grants .local-authority-name')).nativeElement;
                expect(localAuthorityMessageElement.innerText).toContain(localAuthorityName);
            });
        }));

        it('should display a generic message if there is an error fetching local authority details', async(() => {
            // given
            localAuthorityResponse = ErrorObservable.create('test network error fetching local authority details');

            // when
            submitPostcode(postcode);

            // then
            fixture.whenStable().then(() => {
                const networkErrorElement = fixture.debugElement.query(By.css('.network-error'));
                expect(networkErrorElement).toBeTruthy();
            });
        }));

        function submitPostcode(postcode: string) {
            component.postcodeInput = postcode;
            const submitPostcodeButton = fixture.debugElement.query(By.css('.postcode-input-submit')).nativeElement;
            submitPostcodeButton.click();
            fixture.detectChanges();
        }
    });
});