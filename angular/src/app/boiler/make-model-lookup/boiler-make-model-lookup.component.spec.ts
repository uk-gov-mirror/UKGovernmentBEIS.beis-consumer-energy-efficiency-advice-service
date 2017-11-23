import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs/Observable";

import {BoilerMakeModelLookupComponent} from "./boiler-make-model-lookup.component";
import {GasAndOilBoilersService} from "../gas-and-oil-boilers/gas-and-oil-boilers.service";
import {GasAndOilBoiler} from "../gas-and-oil-boilers/gas-and-oil-boiler";

describe('BoilerMakeModelLookupComponent', () => {
    let component: BoilerMakeModelLookupComponent;
    let fixture: ComponentFixture<BoilerMakeModelLookupComponent>;

    const gasAndOilBoilersData = require('assets/boilers/gas-and-oil-boiler.json');
    const gasAndOilBoilersServiceStub = {
        getGasAndOilBoilers: () => Observable.of(gasAndOilBoilersData.map(boilerJson => GasAndOilBoiler.fromJson(boilerJson)))
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BoilerMakeModelLookupComponent
            ],
            imports: [
                RouterTestingModule,
                FormsModule,
            ],
            providers: [
                {provide: GasAndOilBoilersService, useValue: gasAndOilBoilersServiceStub},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerMakeModelLookupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
