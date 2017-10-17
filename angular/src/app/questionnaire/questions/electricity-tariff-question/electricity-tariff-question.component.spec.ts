import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricityTariffQuestionComponent } from './electricity-tariff-question.component';

describe('ElectricityTariffQuestionComponent', () => {
  let component: ElectricityTariffQuestionComponent;
  let fixture: ComponentFixture<ElectricityTariffQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricityTariffQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricityTariffQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
