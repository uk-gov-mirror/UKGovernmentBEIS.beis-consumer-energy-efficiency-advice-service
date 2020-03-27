import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Observable';
import {InlineSVGModule} from 'ng-inline-svg';
import {BoilerReplacementPageComponent} from './boiler-replacement-page.component';
import {BoilerReplacementCardComponent} from '../boiler-replacement-card/boiler-replacement-card.component';
import {SpinnerAndErrorContainerComponent} from '../../shared/spinner-and-error-container/spinner-and-error-container.component';
import {BoilerTypeMetadataResponse} from '../boiler-types-service/boiler-type-metadata-response';
import {BoilerTypesService} from '../boiler-types-service/boiler-types.service';
import {BoilerType} from '../boiler-types-service/boiler-type';
import {BoilerLinkButtonComponent} from '../boiler-link-button/boiler-link-button.component';
import {DataCardComponent} from '../../shared/data-card/data-card.component';
import {PostcodeLookupComponent} from "../../shared/postcode-lookup/postcode-lookup.component";
import {EpcLookupComponent} from "../../shared/epc-lookup/epc-lookup.component";
import {FormsModule} from '@angular/forms';
import {ResponseData} from "../../shared/response-data/response-data";
import {PostcodeApiService} from "../../shared/postcode-epc-service/postcode-api-service/postcode-api.service";
import {PostcodeEpcService} from "../../shared/postcode-epc-service/postcode-epc.service";
import {PageTitleService} from "../../shared/page-title-service/page-title.service";

describe('BoilerReplacementPageComponent', () => {
    let component: BoilerReplacementPageComponent;
    let fixture: ComponentFixture<BoilerReplacementPageComponent>;
    let responseData: ResponseData;

    const boilerTypesResponse = require('assets/test/boiler-types-response.json');
    const boilerTypesServiceStub = {
        fetchBoilerTypes: () => Observable.of(boilerTypesResponse)
            .map((response: BoilerTypeMetadataResponse[]) => response.map(boiler => BoilerType.fromMetadata(boiler)))
    };

    const postcodeEpcServiceStub = {
        fetchPostcodeDetails: (postcode) => Observable.of(null)
    };

    const postcodeApiServiceStub = {
        fetchPostcodeDetails: (postcode) => Observable.of(null)
    };

    const pageTitleStub = {
        set: () => {}
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BoilerReplacementPageComponent,
                BoilerReplacementCardComponent,
                SpinnerAndErrorContainerComponent,
                BoilerLinkButtonComponent,
                DataCardComponent,
                PostcodeLookupComponent,
                EpcLookupComponent
            ],
            imports: [
                RouterTestingModule,
                InlineSVGModule,
                FormsModule,
            ],
            providers: [
                {provide: BoilerTypesService, useValue: boilerTypesServiceStub},
                {provide: ResponseData, useClass: MockResponseData},
                {provide: PostcodeApiService, useValue: postcodeApiServiceStub},
                {provide: PostcodeEpcService, useValue: postcodeEpcServiceStub},
                {provide: PageTitleService, useValue: pageTitleStub},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        responseData = new ResponseData();
        fixture = TestBed.createComponent(BoilerReplacementPageComponent);
        spyOn(TestBed.get(BoilerTypesService), 'fetchBoilerTypes').and.callThrough();
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call boiler types API service', () => {
        expect(TestBed.get(BoilerTypesService).fetchBoilerTypes).toHaveBeenCalledWith();
    });

    it('should store the boiler types returned from the API', () => {
        boilerTypesServiceStub.fetchBoilerTypes().toPromise().then(boilerTypes => {
            expect(component.boilers.length).toBe(boilerTypes.length);
            boilerTypes.forEach(boiler => expect(component.boilers).toContain(boiler));
        });
    });

    it('should store the boiler types in order of installation cost', () => {
        for (let i = 0; i < component.boilers.length - 1; i++) {
            expect(+component.boilers[i].installationCostLower).toBeLessThanOrEqual(+component.boilers[i + 1].installationCostLower);
        }
    });

    it('should show a card for each boiler type', () => {
        const boilerTypeCards = fixture.debugElement.queryAll(By.directive(BoilerReplacementCardComponent));
        const actualBoilers = boilerTypeCards.map(el => el.componentInstance.boilerType);

        const expectedBoilers = component.boilers;
        expect(actualBoilers.length).toBe(expectedBoilers.length);
        expectedBoilers.forEach(measure => expect(actualBoilers).toContain(measure));
    });

    class MockResponseData {
        public postcode = "Test Postcode";
    }
});
