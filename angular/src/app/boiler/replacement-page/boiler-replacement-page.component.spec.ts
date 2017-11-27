import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs/Observable";

import {BoilerReplacementPageComponent} from "./boiler-replacement-page.component";
import {BoilerReplacementCardComponent} from "../boiler-replacement-card/boiler-replacement-card.component";
import {SpinnerAndErrorContainerComponent} from "../../shared/spinner-and-error-container/spinner-and-error-container.component";
import {BoilerTypeMetadataResponse} from "../boiler-types-service/boiler-type-metadata-response";
import {BoilerTypesService} from "../boiler-types-service/boiler-types.service";
import {BoilerType} from "../boiler-types-service/boiler-type";

describe('BoilerReplacementPageComponent', () => {
    let component: BoilerReplacementPageComponent;
    let fixture: ComponentFixture<BoilerReplacementPageComponent>;

    const boilerTypesResponse = require('assets/test/boiler-types-response.json');
    const boilerTypesServiceStub = {
        fetchBoilerTypes: () => Observable.of(boilerTypesResponse)
            .map((response: BoilerTypeMetadataResponse[]) => response.map(boiler => BoilerType.fromMetadata(boiler)))
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BoilerReplacementPageComponent,
                BoilerReplacementCardComponent,
                SpinnerAndErrorContainerComponent,
            ],
            imports: [
                RouterTestingModule,
            ],
            providers: [
                {provide: BoilerTypesService, useValue: boilerTypesServiceStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
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
            expect(component.boilers.length).toBe(Object.values(boilerTypes).length);
            Object.values(boilerTypes).forEach(boiler => expect(component.boilers).toContain(boiler));
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
});
