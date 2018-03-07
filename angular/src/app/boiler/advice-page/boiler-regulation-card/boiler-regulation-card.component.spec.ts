import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {BoilerRegulation, BoilerRegulationCardComponent} from './boiler-regulation-card.component';

describe('BoilerRegulationCardComponent', () => {
    let component: BoilerRegulationCardComponent;
    let fixture: ComponentFixture<BoilerRegulationCardComponent>;

    const regulation: BoilerRegulation = {
        headline: 'Headline for regulation',
        summary: 'Summary of regulation',
        efficiencyImprovement: 12.34,
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BoilerRegulationCardComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerRegulationCardComponent);
        component = fixture.componentInstance;
        component.regulation = regulation;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show the correct headline', () => {
       const headlineElement = fixture.debugElement.query(By.css('.headline')).nativeElement;
       expect(headlineElement.innerText).toEqual(regulation.headline);
    });

    it('should show the correct summary', () => {
        const summaryElement = fixture.debugElement.query(By.css('.summary')).nativeElement;
        expect(summaryElement.innerText).toEqual(regulation.summary);
    });

    it('should show the correct efficiency improvement', () => {
        const efficiencyElement = fixture.debugElement.query(By.css('.efficiency .percentage')).nativeElement;
        expect(efficiencyElement.innerText).toEqual(regulation.efficiencyImprovement.toFixed(1) + '%');
    });
});
