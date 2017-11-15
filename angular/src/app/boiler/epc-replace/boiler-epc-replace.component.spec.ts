import {async, ComponentFixture, TestBed} from "@angular/core/testing";
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

describe('BoilerEpcReplaceComponent', () => {
    let component: BoilerEpcReplaceComponent;
    let fixture: ComponentFixture<BoilerEpcReplaceComponent>;

    const dummyEpcRecommendationsResponse = require('assets/test/dummy-epc-recommendations-response.json');
    const epcApiServiceStub = {
        getRecommendationsForLmkKey: (lmkKey) => Observable.of(dummyEpcRecommendationsResponse.rows.map(rec => new EpcRecommendation(rec)))
    };

    const recommendationsResponse = require('assets/test/recommendations-response.json');
    const recommendationsServiceStub = {
        fetchRecommendationDetails: () => Observable.of(recommendationsResponse)
    };

    const boilerTypesResponse = require('assets/test/recommendations-response.json');
    const boilerTypesServiceStub = {
        fetchBoilerTypes: () => Observable.of(boilerTypesResponse)
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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
