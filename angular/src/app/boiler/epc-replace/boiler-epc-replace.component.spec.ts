import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs/Observable";

import {BoilerEpcReplaceComponent} from "./boiler-epc-replace.component";
import {BoilerMakeModelLookupComponent} from "../make-model-lookup/boiler-make-model-lookup.component";
import {BoilerReplacementCardComponent} from "./boiler-replacement-card/boiler-replacement-card.component";
import {RecommendationCardComponent} from "../../shared/recommendation-card/recommendation-card.component";
import {SpinnerAndErrorContainerComponent} from "../../shared/spinner-and-error-container/spinner-and-error-container.component";
import {EpcApiService} from "../../shared/epc-api-service/epc-api.service";
import {RecommendationService} from "../../shared/recommendation-service/recommendation.service";
import {BoilerTypesService} from "../boiler-types-service/boiler-types.service";
import {EpcRecommendation} from "../../shared/epc-api-service/model/response/epc-recommendation";
import {BoilerTypeMetadataResponse} from "../boiler-types-service/boiler-type-metadata-response";
import {BoilerType} from "../boiler-types-service/boiler-type";

describe('BoilerEpcReplaceComponent', () => {
    let component: BoilerEpcReplaceComponent;
    let fixture: ComponentFixture<BoilerEpcReplaceComponent>;
    const lmkKey = 'fake-lmk-key';

    const noReplaceRecommendation = new EpcRecommendation({
        LMK_KEY: '',
        IMPROVEMENT_ITEM: '',
        IMPROVEMENT_SUMMARY_TEXT: '',
        IMPROVEMENT_DESCR_TEXT: '',
        IMPROVEMENT_ID: '',
        IMPROVEMENT_ID_TEXT: '',
    });

    const replaceRecommendation = new EpcRecommendation({
        LMK_KEY: '',
        IMPROVEMENT_ITEM: '',
        IMPROVEMENT_SUMMARY_TEXT: '',
        IMPROVEMENT_DESCR_TEXT: '',
        IMPROVEMENT_ID: '',
        IMPROVEMENT_ID_TEXT: 'replace boiler',
    });

    const dummyEpcRecommendationsResponse = require('assets/test/dummy-epc-recommendations-response.json');
    const epcApiServiceStub = {
        getRecommendationsForLmkKey: (lmkKey) => Observable.of(dummyEpcRecommendationsResponse.rows.map(rec => new EpcRecommendation(rec)))
    };

    const recommendationsResponse = require('assets/test/recommendations-response.json');
    const recommendationsServiceStub = {
        fetchRecommendationDetails: () => Observable.of(recommendationsResponse)
    };

    const boilerTypesResponse = require('assets/test/boiler-types-response.json');
    const boilerTypesServiceStub = {
        fetchBoilerTypes: () => Observable.of(boilerTypesResponse)
            .map((response: BoilerTypeMetadataResponse[]) => response.map(metadata => BoilerType.fromMetadata(metadata)))
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BoilerEpcReplaceComponent,
                BoilerMakeModelLookupComponent,
                BoilerReplacementCardComponent,
                RecommendationCardComponent,
                SpinnerAndErrorContainerComponent,
            ],
            imports: [
                RouterTestingModule,
            ],
            providers: [
                {provide: EpcApiService, useValue: epcApiServiceStub},
                {provide: RecommendationService, useValue: recommendationsServiceStub},
                {provide: BoilerTypesService, useValue: boilerTypesServiceStub},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerEpcReplaceComponent);
        component = fixture.componentInstance;
        spyOn(TestBed.get(EpcApiService), 'getRecommendationsForLmkKey').and.callThrough();
        spyOn(TestBed.get(RecommendationService), 'fetchRecommendationDetails').and.callThrough();
        spyOn(TestBed.get(BoilerTypesService), 'fetchBoilerTypes').and.callThrough();

        component.lmkKey = lmkKey;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call EPC recommendations API service', () => {
        expect(TestBed.get(EpcApiService).getRecommendationsForLmkKey).toHaveBeenCalledWith(lmkKey);
    });

    it('should store the recommendations returned from the EPC API service', () => {
       epcApiServiceStub.getRecommendationsForLmkKey(component.lmkKey).toPromise().then(recommendations =>
           expect(component.recommendations).toEqual(recommendations)
       );
    });

    it('should call recommendations API service', () => {
        expect(TestBed.get(RecommendationService).fetchRecommendationDetails).toHaveBeenCalledWith();
    });

    it('should call boiler types API service', () => {
       expect(TestBed.get(BoilerTypesService).fetchBoilerTypes).toHaveBeenCalledWith();
    });

    it('should store the boiler types returned from the API', () => {
        boilerTypesServiceStub.fetchBoilerTypes().toPromise().then(boilerTypes => {
            expect(component.boilerTypes.length).toBe(boilerTypes.length);
            boilerTypes.forEach(boiler => expect(component.boilerTypes).toContain(boiler));
        });
    });

    it('should store the boiler types in order of installation cost', () => {
        for (let i = 0; i < component.boilerTypes.length - 1; i++) {
            expect(+component.boilerTypes[i].installationCostLower).toBeLessThanOrEqual(+component.boilerTypes[i + 1].installationCostLower);
        }
    });

    it('should show the sorry page if the EPC contains no recommendations', () => {
       // when
        component.recommendations = undefined;
        fixture.detectChanges();

        // then
        expect(sorryElement()).toBeTruthy();
        expect(noReplaceElement()).toBeFalsy();
        expect(replaceElement()).toBeFalsy();
    });

    it('should show the no-replace section if the boiler does not need replacing', () => {
        // when
        component.recommendations = [noReplaceRecommendation];
        fixture.detectChanges();

        // then
        expect(sorryElement()).toBeFalsy();
        expect(noReplaceElement()).toBeTruthy();
        expect(replaceElement()).toBeFalsy();
    });

    it('should show energy saving measures if the boiler does not need replacing', () => {
        // when
        const expectedMeasures = component.staticPartialMeasuresWithCodes.map(m => m.measure);
        component.recommendations = [noReplaceRecommendation];
        fixture.detectChanges();

        // then
        const recommendationCards = fixture.debugElement.queryAll(By.directive(RecommendationCardComponent));
        const actualMeasures = recommendationCards
            .map(el => el.componentInstance.recommendation);

        expect(actualMeasures.length).toBe(expectedMeasures.length);
        expectedMeasures.forEach(measure => expect(actualMeasures).toContain(measure));
    });

    it('should show the replace section if the boiler needs replacing', () => {
        // when
        component.recommendations = [replaceRecommendation];
        fixture.detectChanges();

        // then
        expect(sorryElement()).toBeFalsy();
        expect(noReplaceElement()).toBeFalsy();
        expect(replaceElement()).toBeTruthy();
    });

    it('should show boiler options if the boiler needs replacing', () => {
        // when
        const expectedBoilers = component.boilerTypes;
        component.recommendations = [replaceRecommendation];
        fixture.detectChanges();

        // then
        const boilerTypeCards = fixture.debugElement.queryAll(By.directive(BoilerReplacementCardComponent));
        const actualBoilers = boilerTypeCards
            .map(el => el.componentInstance.boilerType);

        expect(actualBoilers.length).toBe(expectedBoilers.length);
        expectedBoilers.forEach(measure => expect(actualBoilers).toContain(measure));
    });

    const sorryElement = () => fixture.debugElement.query(By.css('.sorry'));
    const noReplaceElement = () => fixture.debugElement.query(By.css('.no-replace'));
    const replaceElement = () => fixture.debugElement.query(By.css('.replace'));
});
