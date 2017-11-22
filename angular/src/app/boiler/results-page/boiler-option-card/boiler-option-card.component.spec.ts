import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {BoilerOptionCardComponent} from "./boiler-option-card.component";
import {BoilerType} from "../../boiler-types-service/boiler-type";

describe('BoilerOptionCardComponent', () => {
    let component: BoilerOptionCardComponent;
    let fixture: ComponentFixture<BoilerOptionCardComponent>;

    const boiler = new BoilerType(
        'Fake Boiler',
        'Fake description',
        '/no/path',
        'No space requirement',
        100,
        200,
        15,
        1000,
    );

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BoilerOptionCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerOptionCardComponent);
        component = fixture.componentInstance;
        component.boiler = boiler;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show the correct name', () => {
        const nameElement = fixture.debugElement.query(By.css('.name-text')).nativeElement;
        expect(nameElement.innerText).toEqual(boiler.name);
    });

    it('should show the correct description', () => {
        const descriptionElement = fixture.debugElement.query(By.css('.boiler-description')).nativeElement;
        expect(descriptionElement.innerText).toEqual(boiler.description);
    });

    it('should show the correct lifetime', () => {
        const lifetimeElement = fixture.debugElement.query(By.css('.lifetime .section-content')).nativeElement;
        expect(lifetimeElement.innerText).toEqual(boiler.lifetimeYears + ' years');
    });

    it('should show the correct space requirement', () => {
        const spaceElement = fixture.debugElement.query(By.css('.space-requirement .section-content')).nativeElement;
        expect(spaceElement.innerText).toEqual(boiler.spaceRequirement);
    });

    it('should show the correct installation cost', () => {
        const installationElement = fixture.debugElement.query(By.css('.installation .section-content')).nativeElement;
        expect(installationElement.innerText).toEqual('£' + boiler.averageInstallationCost.toFixed(0));
    });

    it('should show the correct space requirement', () => {
        const runningCostElement = fixture.debugElement.query(By.css('.running .section-content')).nativeElement;
        expect(runningCostElement.innerText).toEqual('£' + boiler.runningCostPerYear.toFixed(0));
    });
});
