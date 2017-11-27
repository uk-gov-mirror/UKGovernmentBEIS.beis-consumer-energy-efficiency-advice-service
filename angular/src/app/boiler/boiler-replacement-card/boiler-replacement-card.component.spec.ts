import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";

import {BoilerReplacementCardComponent} from "./boiler-replacement-card.component";
import {BoilerType} from "../boiler-types-service/boiler-type";

describe('BoilerReplacementCardComponent', () => {
    let component: BoilerReplacementCardComponent;
    let fixture: ComponentFixture<BoilerReplacementCardComponent>;
    const boilerType = new BoilerType(
        'Fake boiler',
        'This is not a real boiler',
        'No space requirements',
        100,
        300,
        20,
        1500,
        [],
        [],
    );

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BoilerReplacementCardComponent],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerReplacementCardComponent);
        component = fixture.componentInstance;
        component.boilerType = boilerType;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the right name', () => {
        const nameElement = fixture.debugElement.query(By.css('.heading')).nativeElement;
        expect(nameElement.innerText).toBe(boilerType.name);
    });

    it('should display the right description', () => {
        const descriptionElement = fixture.debugElement.query(By.css('.summary')).nativeElement;
        expect(descriptionElement.innerText).toBe(boilerType.description);
    });

    it('should display the correct installation costs', () => {
        const installationCostElement = fixture.debugElement.query(By.css('.installation .box-content')).nativeElement;
        expect(installationCostElement.innerText).toBe(`£${boilerType.installationCostLower}-£${boilerType.installationCostUpper}`);
    });

    it('should display the correct lifetime', () => {
        const lifetimeElement = fixture.debugElement.query(By.css('.lifetime .box-content')).nativeElement;
        expect(lifetimeElement.innerText).toBe(`${boilerType.lifetimeYears} yrs`);
    });

    it('should display the correct running cost', () => {
        const runningCostElement = fixture.debugElement.query(By.css('.running-cost .box-content')).nativeElement;
        expect(runningCostElement.innerText).toBe(`£${boilerType.runningCostPerYear}`);
    });
});
