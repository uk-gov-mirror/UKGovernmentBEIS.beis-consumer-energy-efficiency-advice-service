import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Observable';
import {InlineSVGModule} from 'ng-inline-svg';

import {BoilerMakeModelReplaceComponent} from './boiler-make-model-replace.component';
import {SpinnerAndErrorContainerComponent} from '../../shared/spinner-and-error-container/spinner-and-error-container.component';
import {BoilerReplacementCardComponent} from '../boiler-replacement-card/boiler-replacement-card.component';
import {GasAndOilBoilersService} from '../gas-and-oil-boilers/gas-and-oil-boilers.service';
import {GasAndOilBoiler} from '../gas-and-oil-boilers/gas-and-oil-boiler';
import {BoilerTypeMetadataResponse} from '../boiler-types-service/boiler-type-metadata-response';
import {BoilerType} from '../boiler-types-service/boiler-type';
import {BoilerTypesService} from '../boiler-types-service/boiler-types.service';
import values from 'lodash-es/values';
import {BoilerPageMeasuresService} from '../measures-section/boiler-page-measures.service';
import {BoilerLinkButtonComponent} from '../boiler-link-button/boiler-link-button.component';
import {BoilerMeasuresSectionComponent} from '../measures-section/boiler-measures-section.component';
import {RecommendationCardComponent} from '../../shared/recommendation-card/recommendation-card.component';
import {QuestionnaireService} from '../../questionnaire/questionnaire.service';

describe('BoilerMakeModelReplaceComponent', () => {
    let component: BoilerMakeModelReplaceComponent;
    let fixture: ComponentFixture<BoilerMakeModelReplaceComponent>;

    const gasAndOilBoilersData = require('assets/boilers/gas-and-oil-boiler.json');
    const gasAndOilBoilersServiceStub = {
        getGasAndOilBoilerWithIndexNumber: (index) => Observable.of(GasAndOilBoiler.fromJson(gasAndOilBoilersData[0])),
        getGasAndOilBoilersMatching: (term) => Observable.of(gasAndOilBoilersData.map(boilerJson => GasAndOilBoiler.fromJson(boilerJson))),
    };

    const boilerTypesResponse = require('assets/test/boiler-types-response.json');
    const boilerTypesServiceStub = {
        fetchBoilerTypes: () => Observable.of(boilerTypesResponse)
            .map((response: BoilerTypeMetadataResponse[]) => response.map(boiler => BoilerType.fromMetadata(boiler)))
    };

    const boilerPageMeasures = require('assets/test/boiler-page-measures.json');
    const boilerPageMeasuresServiceStub = {
        fetchMeasuresForBoilerPages: () => Observable.of(boilerPageMeasures)
    };

    const questionnaireServiceStub = {
        isComplete: () => true
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BoilerMakeModelReplaceComponent,
                SpinnerAndErrorContainerComponent,
                BoilerReplacementCardComponent,
                BoilerLinkButtonComponent,
                BoilerMeasuresSectionComponent,
                RecommendationCardComponent,
            ],
            imports: [
                RouterTestingModule,
                InlineSVGModule,
            ],
            providers: [
                {provide: GasAndOilBoilersService, useValue: gasAndOilBoilersServiceStub},
                {provide: BoilerTypesService, useValue: boilerTypesServiceStub},
                {provide: BoilerPageMeasuresService, useValue: boilerPageMeasuresServiceStub},
                {provide: QuestionnaireService, useValue: questionnaireServiceStub},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerMakeModelReplaceComponent);
        spyOn(TestBed.get(BoilerTypesService), 'fetchBoilerTypes').and.callThrough();
        spyOn(TestBed.get(GasAndOilBoilersService), 'getGasAndOilBoilerWithIndexNumber').and.callThrough();
        component = fixture.componentInstance;
        component.productIndexNumber = '12345';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should look up the boiler with the given index number', () => {
        expect(TestBed.get(GasAndOilBoilersService).getGasAndOilBoilerWithIndexNumber).toHaveBeenCalledWith(component.productIndexNumber);
    });

    it('should store the boiler returned from the index number lookup', () => {
       gasAndOilBoilersServiceStub.getGasAndOilBoilerWithIndexNumber(component.productIndexNumber).toPromise().then(boiler =>
           expect(component.boiler).toEqual(boiler)
       );
    });

    it('should call boiler types API service', () => {
        expect(TestBed.get(BoilerTypesService).fetchBoilerTypes).toHaveBeenCalled();
    });

    it('should store the boiler types returned from the API', () => {
        boilerTypesServiceStub.fetchBoilerTypes().toPromise().then(boilerTypes => {
            expect(component.boilerTypes.length).toBe(values(boilerTypes).length);
            values(boilerTypes).forEach(boiler => expect(component.boilerTypes).toContain(boiler));
        });
    });

    it('should store the boiler types in order of installation cost', () => {
        for (let i = 0; i < component.boilerTypes.length - 1; i++) {
            expect(+component.boilerTypes[i].installationCostLower)
                .toBeLessThanOrEqual(+component.boilerTypes[i + 1].installationCostLower);
        }
    });

    it('should show the replace section if the boiler needs replacing', () => {
        // given
        component.boiler.efficiency = component.efficiencyThreshold - 1;

        // when
        fixture.detectChanges();

        // then
        expect(replaceElement()).toBeTruthy();
        expect(noReplaceElement()).toBeFalsy();
    });

    it('should show boiler options if the boiler needs replacing', () => {
        // given
        component.boiler.efficiency = component.efficiencyThreshold - 1;
        const expectedBoilers = component.boilerTypes;

        // when
        fixture.detectChanges();

        // then
        const boilerTypeCards = fixture.debugElement.queryAll(By.directive(BoilerReplacementCardComponent));
        const actualBoilers = boilerTypeCards
            .map(el => el.componentInstance.boilerType);

        expect(actualBoilers.length).toBe(expectedBoilers.length);
        expectedBoilers.forEach(measure => expect(actualBoilers).toContain(measure));
    });

    it('should show the no-replace section if the boiler does not need replacing', () => {
        // given
        component.boiler.efficiency = component.efficiencyThreshold + 1;

        // when
        fixture.detectChanges();

        // then
        expect(replaceElement()).toBeFalsy();
        expect(noReplaceElement()).toBeTruthy();
    });

    it('should show energy saving measures if the boiler does not need replacing', () => {
        // given
        component.boiler.efficiency = component.efficiencyThreshold + 1;

        // when
        fixture.detectChanges();

        // then
        const measuresSection = fixture.debugElement.query(By.directive(BoilerMeasuresSectionComponent));
        const actualMeasures = measuresSection.componentInstance.measures;

        boilerPageMeasuresServiceStub.fetchMeasuresForBoilerPages().toPromise().then(expectedMeasures => {
            expect(actualMeasures).toEqual(expectedMeasures);
        });
    });

    const noReplaceElement = () => fixture.debugElement.query(By.css('.no-replace'));
    const replaceElement = () => fixture.debugElement.query(By.css('.replace'));
});
