import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PotentialsComponent} from './potentials.component';
import {EnergyCalculations} from './energy-calculations';
import {By} from "@angular/platform-browser";

describe('PotentialsComponent', () => {
    let component: PotentialsComponent;
    let fixture: ComponentFixture<PotentialsComponent>;

    const energyCalculations: EnergyCalculations = {
        currentEnergyBillPoundsPerYear: 1000,
        potentialEnergyBillSavingPoundsPerYear: 100,
        currentEpcRating: 'D',
        potentialEpcRating: 'A'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PotentialsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PotentialsComponent);
        component = fixture.componentInstance;
        component.energyCalculations = energyCalculations;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the current annual energy bill', () => {
        const currentEnergyBillElement = fixture.debugElement.query(By.css('.current-bill .headline-figure')).nativeElement;
        expect(currentEnergyBillElement.innerText).toBe('£' + energyCalculations.currentEnergyBillPoundsPerYear);
    });

    it('should display the potential annual energy bill saving', () => {
        const potentialSavingsElement = fixture.debugElement.query(By.css('.potential-savings .headline-figure')).nativeElement;
        expect(potentialSavingsElement.innerText).toBe('£' + energyCalculations.potentialEnergyBillSavingPoundsPerYear);
    });

    it('should display the current EPC rating', () => {
        const currentEpcRatingElement = fixture.debugElement.query(By.css('.current-epc .epc-rating')).nativeElement;
        expect(currentEpcRatingElement.innerText).toBe(energyCalculations.currentEpcRating);
    });

    it('should display the potential EPC rating', () => {
        const currentEpcRatingElement = fixture.debugElement.query(By.css('.potential-epc .epc-rating')).nativeElement;
        expect(currentEpcRatingElement.innerText).toBe(energyCalculations.potentialEpcRating);
    });
});
