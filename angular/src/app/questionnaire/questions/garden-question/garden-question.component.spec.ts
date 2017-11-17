import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenQuestionComponent } from './garden-question.component';

describe('GardenQuestionComponent', () => {
  let component: GardenQuestionComponent;
  let fixture: ComponentFixture<GardenQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GardenQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
