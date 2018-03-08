import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs/Observable";
import {InlineSVGModule} from "ng-inline-svg";

import {BoilerEpcReplaceComponent} from "./boiler-epc-replace.component";
import {BoilerMakeModelLookupComponent} from "../make-model-lookup/boiler-make-model-lookup.component";
import {BoilerReplacementCardComponent} from "../boiler-replacement-card/boiler-replacement-card.component";
import {RecommendationCardComponent} from "../../shared/recommendation-card/recommendation-card.component";
import {SpinnerAndErrorContainerComponent} from "../../shared/spinner-and-error-container/spinner-and-error-container.component";
import {BoilerTypesService} from "../boiler-types-service/boiler-types.service";
import {EpcRecommendation} from "../../shared/epc-api-service/model/response/epc-recommendation";
import {BoilerTypeMetadataResponse} from "../boiler-types-service/boiler-type-metadata-response";
import {BoilerType} from "../boiler-types-service/boiler-type";
import {EpcApiService} from "../../shared/postcode-epc-service/epc-api-service/epc-api.service";
import {BoilerPageMeasuresService} from "../measures-section/boiler-page-measures.service";
import {BoilerMeasuresSectionComponent} from "../measures-section/boiler-measures-section.component";
import {QuestionnaireService} from "../../questionnaire/questionnaire.service";
import {GasAndOilBoiler} from "../gas-and-oil-boilers/gas-and-oil-boiler";
import {GasAndOilBoilersService} from "../gas-and-oil-boilers/gas-and-oil-boilers.service";
import values from "lodash-es/values";
import {BoilerLinkButtonComponent} from "../boiler-link-button/boiler-link-button.component";

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

    const boilerPageMeasures = require('assets/test/boiler-page-measures.json');
    const boilerPageMeasuresServiceStub = {
        fetchMeasuresForBoilerPages: () => Observable.of(boilerPageMeasures)
    };

    const boilerTypesResponse = require('assets/test/boiler-types-response.json');
    const boilerTypesServiceStub = {
        fetchBoilerTypes: () => Observable.of(boilerTypesResponse)
            .map((response: BoilerTypeMetadataResponse[]) => response.map(boiler => BoilerType.fromMetadata(boiler)))
    };

    const gasAndOilBoilersServiceStub = {};

    const questionnaireServiceStub = {
        isComplete: () => true
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BoilerEpcReplaceComponent,
                BoilerMakeModelLookupComponent,
                BoilerReplacementCardComponent,
                BoilerMeasuresSectionComponent,
                RecommendationCardComponent,
                SpinnerAndErrorContainerComponent,
                BoilerLinkButtonComponent,
            ],
            imports: [
                RouterTestingModule,
                FormsModule,
                InlineSVGModule,
            ],
            providers: [
                {provide: EpcApiService, useValue: epcApiServiceStub},
                {provide: BoilerPageMeasuresService, useValue: boilerPageMeasuresServiceStub},
                {provide: BoilerTypesService, useValue: boilerTypesServiceStub},
                {provide: QuestionnaireService, useValue: questionnaireServiceStub},
                {provide: GasAndOilBoilersService, useValue: gasAndOilBoilersServiceStub},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerEpcReplaceComponent);
        component = fixture.componentInstance;
        spyOn(TestBed.get(EpcApiService), 'getRecommendationsForLmkKey').and.callThrough();
        spyOn(TestBed.get(BoilerPageMeasuresService), 'fetchMeasuresForBoilerPages').and.callThrough();
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
        expect(TestBed.get(BoilerPageMeasuresService).fetchMeasuresForBoilerPages).toHaveBeenCalledWith();
    });

    it('should call boiler types API service', () => {
       expect(TestBed.get(BoilerTypesService).fetchBoilerTypes).toHaveBeenCalledWith();
    });

    it('should store the boiler types returned from the API', () => {
        boilerTypesServiceStub.fetchBoilerTypes().toPromise().then(boilerTypes => {
            expect(component.boilerTypes.length).toBe(values(boilerTypes).length);
            values(boilerTypes).forEach(boiler => expect(component.boilerTypes).toContain(boiler));
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
        component.recommendations = [noReplaceRecommendation];
        fixture.detectChanges();

        // then
        const measuresSection = fixture.debugElement.query(By.directive(BoilerMeasuresSectionComponent));
        const actualMeasures = measuresSection.componentInstance.measures;

        boilerPageMeasuresServiceStub.fetchMeasuresForBoilerPages().toPromise().then(expectedMeasures => {
            expect(actualMeasures).toEqual(expectedMeasures);
        });
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
