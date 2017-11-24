import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs/Observable";

import {BoilerMakeModelReplaceComponent} from "./boiler-make-model-replace.component";
import {SpinnerAndErrorContainerComponent} from "../../shared/spinner-and-error-container/spinner-and-error-container.component";
import {BoilerReplacementCardComponent} from "../boiler-replacement-card/boiler-replacement-card.component";
import {GasAndOilBoilersService} from "../gas-and-oil-boilers/gas-and-oil-boilers.service";
import {GasAndOilBoiler} from "../gas-and-oil-boilers/gas-and-oil-boiler";
import {BoilerTypeMetadataResponse} from "../boiler-types-service/boiler-type-metadata-response";
import {AllBoilerTypes} from "../boiler-types-service/boiler-type";
import {BoilerTypesService} from "../boiler-types-service/boiler-types.service";

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
            .map((response: BoilerTypeMetadataResponse[]) => new AllBoilerTypes(response))
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BoilerMakeModelReplaceComponent,
                SpinnerAndErrorContainerComponent,
                BoilerReplacementCardComponent,
            ],
            imports: [
                RouterTestingModule,
            ],
            providers: [
                {provide: GasAndOilBoilersService, useValue: gasAndOilBoilersServiceStub},
                {provide: BoilerTypesService, useValue: boilerTypesServiceStub},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerMakeModelReplaceComponent);
        spyOn(TestBed.get(BoilerTypesService), 'fetchBoilerTypes').and.callThrough();
        spyOn(TestBed.get(GasAndOilBoilersService), 'getGasAndOilBoilerWithIndexNumber').and.callThrough();
        component = fixture.componentInstance;
        component.productIndexNumber = "12345";
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
            expect(component.boilerTypes.length).toBe(Object.values(boilerTypes).length);
            Object.values(boilerTypes).forEach(boiler => expect(component.boilerTypes).toContain(boiler));
        });
    });

    it('should store the boiler types in order of installation cost', () => {
        for (let i = 0; i < component.boilerTypes.length - 1; i++) {
            expect(+component.boilerTypes[i].installationCostLower).toBeLessThanOrEqual(+component.boilerTypes[i + 1].installationCostLower);
        }
    });

    it('should show the right boiler name', () => {
       const nameElement = fixture.debugElement.query(By.css('.boiler-details .boiler-name')).nativeElement;
       expect(nameElement.innerText).toEqual(component.boiler.name);
    });

    it('should show the right boiler fuel type', () => {
        const fuelTypeElement = fixture.debugElement.query(By.css('.boiler-details .fuel-type')).nativeElement;
        expect(fuelTypeElement.innerText.toLowerCase()).toEqual(component.getFuelTypeName(component.boiler.fuelType).toLowerCase());
    });

    it('should show the right boiler efficiency', () => {
        const efficiencyElement = fixture.debugElement.query(By.css('.boiler-details .efficiency .percentage')).nativeElement;
        expect(efficiencyElement.innerText).toEqual(component.boiler.efficiency + '%');
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

    it('should show the no-replace section if the boiler does not need replacing', () => {
        // given
        component.boiler.efficiency = component.efficiencyThreshold + 1;

        // when
        fixture.detectChanges();

        // then
        expect(replaceElement()).toBeFalsy();
        expect(noReplaceElement()).toBeTruthy();
    });

    const noReplaceElement = () => fixture.debugElement.query(By.css('.no-replace'));
    const replaceElement = () => fixture.debugElement.query(By.css('.replace'));
});
