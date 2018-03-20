import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Observable';
import {InlineSVGModule} from 'ng-inline-svg';

import {BoilerResultsPageComponent} from './boiler-results-page.component';
import {SpinnerAndErrorContainerComponent} from '../../shared/spinner-and-error-container/spinner-and-error-container.component';
import {BoilerMeasuresSectionComponent} from '../measures-section/boiler-measures-section.component';
import {RecommendationCardComponent} from '../../shared/recommendation-card/recommendation-card.component';
import {BoilerTypeMetadataResponse} from '../boiler-types-service/boiler-type-metadata-response';
import {BoilerPageMeasuresService} from '../measures-section/boiler-page-measures.service';
import {BoilerTypesService} from '../boiler-types-service/boiler-types.service';
import {ResponseData} from '../../shared/response-data/response-data';
import {QuestionnaireService} from '../../questionnaire/questionnaire.service';
import {BoilerType} from '../boiler-types-service/boiler-type';
import {BoilerLinkButtonComponent} from '../boiler-link-button/boiler-link-button.component';
import {BoilerReplacementCardComponent} from '../boiler-replacement-card/boiler-replacement-card.component';
import {UserStateService} from "../../shared/user-state-service/user-state-service";

describe('BoilerResultsPageComponent', () => {
    let component: BoilerResultsPageComponent;
    let fixture: ComponentFixture<BoilerResultsPageComponent>;

    const boilerPageMeasures = require('assets/test/boiler-page-measures.json');
    const boilerPageMeasuresServiceStub = {
        fetchMeasuresForBoilerPages: () => Observable.of(boilerPageMeasures)
    };

    const boilerTypesResponse = require('assets/test/boiler-types-response.json');
    const boilerTypesServiceStub = {
        fetchBoilerTypes: () => Observable.of(boilerTypesResponse)
            .map((response: BoilerTypeMetadataResponse[]) => response.map(boiler => BoilerType.fromMetadata(boiler)))
    };

    const questionnaireServiceStub = {
        isComplete: () => true
    };

    const userStateServiceStub = {
        sendState: () => {}
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BoilerResultsPageComponent,
                BoilerMeasuresSectionComponent,
                BoilerReplacementCardComponent,
                RecommendationCardComponent,
                SpinnerAndErrorContainerComponent,
                BoilerLinkButtonComponent,
            ],
            imports: [
                RouterTestingModule,
                InlineSVGModule,
            ],
            providers: [
                ResponseData,
                {provide: BoilerPageMeasuresService, useValue: boilerPageMeasuresServiceStub},
                {provide: BoilerTypesService, useValue: boilerTypesServiceStub},
                {provide: QuestionnaireService, useValue: questionnaireServiceStub},
                {provide: UserStateService, useValue: userStateServiceStub},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerResultsPageComponent);
        spyOn(TestBed.get(BoilerPageMeasuresService), 'fetchMeasuresForBoilerPages').and.callThrough();
        spyOn(TestBed.get(BoilerTypesService), 'fetchBoilerTypes').and.callThrough();
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call measures API service', () => {
        expect(TestBed.get(BoilerPageMeasuresService).fetchMeasuresForBoilerPages).toHaveBeenCalledWith();
    });

    it('should call boiler types API service', () => {
        expect(TestBed.get(BoilerTypesService).fetchBoilerTypes).toHaveBeenCalledWith();
    });

    it('should show a boiler replacement card for each applicable boiler', () => {
        // given
        component.applicableBoilerTypes = boilerTypesResponse.map(boiler => BoilerType.fromMetadata(boiler));

        // when
        fixture.detectChanges();

        // then
        const optionCards = fixture.debugElement.queryAll(By.directive(BoilerReplacementCardComponent));
        const actualBoilers = optionCards.map(el => el.componentInstance.boilerType);

        boilerTypesServiceStub.fetchBoilerTypes().toPromise().then(expectedBoilers => {
            expect(actualBoilers.length).toBe(expectedBoilers.length);
            expectedBoilers.forEach(boiler => expect(actualBoilers).toContain(boiler));
        });
    });

    it('should show energy saving measures', () => {
        const measuresSection = fixture.debugElement.query(By.directive(BoilerMeasuresSectionComponent));
        const actualMeasures = measuresSection.componentInstance.measures;

        boilerPageMeasuresServiceStub.fetchMeasuresForBoilerPages().toPromise().then(expectedMeasures => {
            expect(actualMeasures).toEqual(expectedMeasures);
        });
    });
});
