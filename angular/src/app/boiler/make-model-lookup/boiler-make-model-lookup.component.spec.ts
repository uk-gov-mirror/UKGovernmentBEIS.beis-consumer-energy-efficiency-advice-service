import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs/Observable";

import {BoilerMakeModelLookupComponent} from "./boiler-make-model-lookup.component";
import {GasAndOilBoilersService} from "../gas-and-oil-boilers/gas-and-oil-boilers.service";
import {GasAndOilBoiler} from "../gas-and-oil-boilers/gas-and-oil-boiler";
import {BoilerLinkButtonComponent} from "../boiler-link-button/boiler-link-button.component";

describe('BoilerMakeModelLookupComponent', () => {
    let component: BoilerMakeModelLookupComponent;
    let fixture: ComponentFixture<BoilerMakeModelLookupComponent>;

    const gasAndOilBoilersData = require('assets/boilers/gas-and-oil-boiler.json');
    const gasAndOilBoilersServiceStub = {
        getGasAndOilBoilerWithIndexNumber: (index) => Observable.of(GasAndOilBoiler.fromJson(gasAndOilBoilersData[0])),
        getGasAndOilBoilersMatching: (term) => Observable.of(gasAndOilBoilersData.map(boilerJson => GasAndOilBoiler.fromJson(boilerJson))),
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BoilerMakeModelLookupComponent,
                BoilerLinkButtonComponent,
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
        spyOn(TestBed.get(GasAndOilBoilersService), 'getGasAndOilBoilersMatching').and.callThrough();
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch the list of boilers when a search is performed', () => {
        // when
        component.searchTerm = 'search';
        fixture.debugElement.query(By.css('.boiler-input-submit')).nativeElement.click();
        fixture.detectChanges();

        // then
        expect(TestBed.get(GasAndOilBoilersService).getGasAndOilBoilersMatching).toHaveBeenCalledWith(component.searchTerm);
    });

    it('should display an option for each item returned from the search', () => {
        // when
        component.searchTerm = 'search';
        fixture.debugElement.query(By.css('.boiler-input-submit')).nativeElement.click();
        fixture.detectChanges();

        // then
        const selectOptions = fixture.debugElement.queryAll(By.css('.boiler-option'));
        gasAndOilBoilersServiceStub.getGasAndOilBoilersMatching(component.searchTerm).toPromise().then(boilers =>
            boilers.forEach(boiler => expect(selectOptions.some(option => option.nativeElement.innerText === boiler.name)).toBeTruthy())
        );
    });
});
