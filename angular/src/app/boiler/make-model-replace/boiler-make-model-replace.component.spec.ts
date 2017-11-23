import {async, ComponentFixture, TestBed} from "@angular/core/testing";
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
        getGasAndOilBoilers: () => Observable.of(gasAndOilBoilersData.map(boilerJson => GasAndOilBoiler.fromJson(boilerJson)))
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
        component = fixture.componentInstance;
        component.productIndexNumber = "690101";
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
