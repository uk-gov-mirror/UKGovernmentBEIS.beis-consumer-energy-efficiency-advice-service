import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs/Observable";

import {BoilerResultsPageComponent} from "./boiler-results-page.component";
import {SpinnerAndErrorContainerComponent} from "../../shared/spinner-and-error-container/spinner-and-error-container.component";
import {BoilerMeasuresSectionComponent} from "../measures-section/boiler-measures-section.component";
import {BoilerOptionCardComponent} from "./boiler-option-card/boiler-option-card.component";
import {RecommendationCardComponent} from "../../shared/recommendation-card/recommendation-card.component";
import {AllBoilerTypes} from "../boiler-types-service/boiler-type";
import {BoilerTypeMetadataResponse} from "../boiler-types-service/boiler-type-metadata-response";
import {BoilerPageMeasuresService} from "../measures-section/boiler-page-measures.service";
import {BoilerTypesService} from "../boiler-types-service/boiler-types.service";
import {ResponseData} from "../../shared/response-data/response-data";
import {QuestionnaireService} from "../../questionnaire/questionnaire.service";

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
            .map((response: BoilerTypeMetadataResponse[]) => new AllBoilerTypes(response))
    };

    const questionnaireServiceStub = {
        isComplete: () => true
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BoilerResultsPageComponent,
                BoilerOptionCardComponent,
                BoilerMeasuresSectionComponent,
                RecommendationCardComponent,
                SpinnerAndErrorContainerComponent,
            ],
            imports: [
                RouterTestingModule,
            ],
            providers: [
                ResponseData,
                {provide: BoilerPageMeasuresService, useValue: boilerPageMeasuresServiceStub},
                {provide: BoilerTypesService, useValue: boilerTypesServiceStub},
                {provide: QuestionnaireService, useValue: questionnaireServiceStub},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerResultsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
