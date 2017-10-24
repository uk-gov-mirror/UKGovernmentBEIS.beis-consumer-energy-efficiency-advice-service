import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialsComponent } from './potentials.component';
import {EnergyCalculations} from './energy-calculations';

describe('PotentialsComponent', () => {
  let component: PotentialsComponent;
  let fixture: ComponentFixture<PotentialsComponent>;

  const energyCalculations: EnergyCalculations = {
    currentEnergyBillPoundsPerYear: 1000,
    potentialEnergyBillSavingPoundsPerYear: 100,
    currentEpcRating: 'A',
    potentialEpcRating: 'A'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotentialsComponent ]
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
});
