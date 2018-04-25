import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleshootingPageComponent } from './troubleshooting-page.component';

describe('TroubleshootingPageComponent', () => {
  let component: TroubleshootingPageComponent;
  let fixture: ComponentFixture<TroubleshootingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroubleshootingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleshootingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
